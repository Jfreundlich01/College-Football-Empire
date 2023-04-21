import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import { neo4jDriver } from '@ps/server/neo4j';

const CommonalityCritItemsRouter = createRouter<
  NextApiRequest,
  NextApiResponse
>();

CommonalityCritItemsRouter.post(async (req, res) => {
  try {
    //check auth token before running process
    const token = req.headers.authorization?.split(' ')[1];

    if (token !== process.env.PROV_BENCHMARK_API_SECRET) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // opening the neo4j session
    const neosession = neo4jDriver.session();

    const getAllOrgsWithCritItems = await neosession.executeRead((tx) => {
      const query = `
        MATCH (o:Organization)-[r:IN_CRIT_LIST]->()
        RETURN collect(DISTINCT o.oid) AS orgsArr
      `;
      return tx.run(query);
    });
    await neosession.close();

    await neosession.close();

    // sets a variable equal to the array with organizations that have critical items relationships
    const allOrgsArray = getAllOrgsWithCritItems.records[0].get('orgsArr');

    if (allOrgsArray.length === 0) {
      return res
        .status(200)
        .json('No organizations with critical items benchmarks at this time.');
    }

    const results = allOrgsArray.map(async (org: string) => {
      const neosession = neo4jDriver.session();
      ///////////////////////////////////////////////////
      /////////   Item Insights    /////////////////////
      //////////////////////////////////////////////////

      // Get the total number of items on critical items list for the organization
      const orgsTotalItemsQuery = await neosession.executeRead((tx) => {
        const query = `
            MATCH (o:Organization{oid:$org})-[:IN_CRIT_LIST]->(p:Product)
            RETURN count(p) AS count
          `;
        return tx.run(query, { org });
      });

      ////////////////////////////////////////
      //////////  Commonality  ///////////////
      ////////////////////////////////////////

      // Find the count of products that are on the org's crit list and at least 1 other organizations list
      const orgsSharedItemCountQuery = await neosession.executeRead((tx) => {
        const query = `
            MATCH (o:Organization{oid:$org})-[:IN_CRIT_LIST]->(p:Product)
            MATCH ()-[r:IN_CRIT_LIST]->(p)
            WITH p, o, COUNT (r) AS relationship
            WHERE relationship > 1
            RETURN count(p) AS items;
          `;
        return tx.run(query, { org });
      });

      const orgsTotalItems = orgsTotalItemsQuery.records[0].get('count');
      const orgsSharedItems = orgsSharedItemCountQuery.records[0].get('items');
      const OrgCommonality = parseFloat(
        (Number(orgsSharedItems) / Number(orgsTotalItems)).toFixed(2)
      );

      // Updates the commonality property on the CritItems CSV featured doc node
      const updateCommonality = await neosession.executeWrite((tx) => {
        const query = `
              MATCH (o:Organization{oid:$org})-[:CSV_UPLOADED]->(c:CritItems)
              SET c.commonality = ${OrgCommonality},
                  c.cronRan = timestamp()       
              RETURN *
            `;

        return tx.run(query, { org });
      });

      await neosession.close();

      await neosession.close();

      return {
        org: updateCommonality.records[0].get('o').properties.orgName,
        cronRan: updateCommonality.records[0].get('c').properties.cronRan,
        commonality:
          updateCommonality.records[0].get('c').properties.commonality,
      };
    });

    // Supplier prevalence does not need to be handled as part of the chron job
    // This is the count of the number of unique manufacturers on the crit items list
    // It will always be updated for each organization when they upload a new crit items list

    const resultsArray = await Promise.all(results);

    return res.status(200).json({ results: resultsArray });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

export default CommonalityCritItemsRouter;
