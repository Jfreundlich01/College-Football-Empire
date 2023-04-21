import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { verifyStorageInstance } from '@ps/server/cloud-storage/storage';
import { neo4jDriver } from '@ps/server/neo4j';

// This page allows for dynamic pulling of the item master list, which is then pushed into the neo4j database.

const itemMasterRouter = createRouter<NextApiRequest, NextApiResponse>();

itemMasterRouter.put(async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    const uid = req.body.uid;
    const oid = req.body.oid;
    const fileName = req.body.fileName;

    if (!session) {
      return res.status(403).json('Unauthorized');
    }

    // opening the neo4j session
    const neosession = neo4jDriver.session();

    // checking to make sure currently logged in user is a GlobalAdmin
    const globalAdmin = await neosession.executeRead((tx) => {
      const query = `
        MATCH (u:User {uid:$uid})-[r:ROLE]->(:GlobalAdmin)
        RETURN r
      `;
      return tx.run(query, { uid });
    });

    if (globalAdmin.records.length === 0) {
      return res.status(403).json('Unauthorized');
    }

    // NOTE: This is a hard coded bucket name item master transfers are using for now
    const bucketName = `item-master-normalized${process.env.GCP_BUCKET_SUFFIX}`;

    const storage = verifyStorageInstance();

    const url = await storage
      .bucket(bucketName)
      .file(fileName)
      .getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + 6000 * 1000,
      });

    // This removes any currently existing item master relationships for the org since we are importing an updated list
    const removeExistingRelationships = await neosession.executeWrite((tx) => {
      const query = `
        MATCH (o:Organization {oid: $oid})
        MATCH (o)-[r:IN_ITEM_MASTER_LIST]->()
        DELETE r
      `;
      return tx.run(query, { oid });
    });

    // currently storing description on both the product node AND the edge
    // eventually edge will contain description from organization's crit items list and continue to be set here
    // eventually product node should contain description from manufacturer and not be set here
    const parseItemMaster = await neosession.executeWrite((tx) => {
      const query = `
        LOAD CSV WITH HEADERS FROM '${url}' AS line
          WITH line
          MERGE (o:Organization {oid: $oid})
          MERGE (p:Product {manufacturer: line.Manufacturer_Name, manNumber: line.Item_Number})
            ON CREATE 
              SET p.createdOn = timestamp(),
                  p.id = randomUUID(),
                  p.itemType = line.GMDN,
                  p.description = line.Item_Description
            CREATE (o)-[r:IN_ITEM_MASTER_LIST]->(p)
              SET r.description = line.Item_Description
      `;
      return tx.run(query, { oid });
    });

    // deletes any product nodes that have no relationships (any orphaned nodes)
    await neosession.executeWrite((tx) => {
      const query = `
        MATCH (p:Product)
        WHERE NOT EXISTS {
          MATCH ()-[r]->(p)
        }
        DELETE p
      `;
      return tx.run(query);
    });

    await neosession.close();

    return res.status(200).json({
      removedRelationships: removeExistingRelationships,
      itemsAdded: parseItemMaster,
    });
  } catch (error) {
    console.error(error);
  }
});

export default itemMasterRouter;
