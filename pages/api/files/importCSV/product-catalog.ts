import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { verifyStorageInstance } from '@ps/server/cloud-storage/storage';
import { neo4jDriver } from '@ps/server/neo4j';

// This page allows for dynamic pulling of the product catalog data, which is then pushed into the neo4j database.

const productCatalogRouter = createRouter<NextApiRequest, NextApiResponse>();

productCatalogRouter.put(async (req, res) => {
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

    //checking to make sure currently logged in user is a GlobalAdmin
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
    const bucketName = `product-catalog-normalized${process.env.GCP_BUCKET_SUFFIX}`;

    const storage = verifyStorageInstance();

    const url = await storage
      .bucket(bucketName)
      .file(fileName)
      .getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + 6000 * 1000,
      });

    // This removes any currently existing product catalog relationships for the org since we are importing an updated list
    const removeExistingRelationships = await neosession.executeWrite((tx) => {
      const query = `
        MATCH (o:Organization {oid: $oid})
        MATCH (o)-[r:IN_PRODUCT_CATALOG]->()
        DELETE r
      `;
      return tx.run(query, { oid });
    });

    // The description on the product node should always be the most recently uploaded description from the manufacturer
    const parseProductCatalog = await neosession.run(
      `
        LOAD CSV WITH HEADERS from '${url}' AS line 
        CALL {
        WITH line
        MERGE (o:Organization {oid: $oid})
        MERGE (p:Product {manufacturer: line.Manufacturer_Name, manNumber: line.Item_Number})
          ON MATCH
            SET p.description = line.Item_Description
          ON CREATE
            SET p.createdOn = timestamp(),
                p.id = randomUUID(),
                p.description = line.Item_Description,
                p.GTIN = line.GTIN
        CREATE (o)-[r:IN_PRODUCT_CATALOG]->(p)
          SET r.unit = line.Unit_of_Measure,
              r.boxQuant = line.Box_Qty,
              r.suppItemType = line.Item_Type
        } IN TRANSACTIONS
      `,
      { oid }
    );

    // deletes any product nodes that have no relationships (any orphaned nodes)
    await neosession.run(`
        MATCH (p:Product)
        WHERE NOT EXISTS {
          MATCH ()-[r]->(p)
        }
        CALL {
          WITH p
          DELETE p
        } IN TRANSACTIONS
      `);

    await neosession.close();

    return res.status(200).json({
      removeExistingRelationships,
      parseProductCatalog,
    });
  } catch (error) {
    console.error(error);
  }
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1gb',
    },
  },
};

export default productCatalogRouter;
