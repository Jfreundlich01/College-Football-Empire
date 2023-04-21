import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import { neo4jDriver } from '@ps/server/neo4j';

const SupplierViewCritItemsRouter = createRouter<
  NextApiRequest,
  NextApiResponse
>();

SupplierViewCritItemsRouter.post(async (req, res) => {
  try {
    //check auth token before running process
    const token = req.headers.authorization?.split(' ')[1];

    if (token !== process.env.SUPP_BENCHMARK_API_SECRET) {
      return res.status(401).json({ message: 'Unauthorized', token });
    }

    // opening the neo4j session
    const neosession = neo4jDriver.session();

    const getAllOrgsWithProductCat = await neosession.executeRead((tx) => {
      const query = `
        MATCH (o:Organization)-[r:CSV_UPLOADED]->(n:ProductCat)
        RETURN collect(DISTINCT o.oid) AS orgsArr
      `;
      return tx.run(query);
    });

    await neosession.close();

    // assigns array of org oids with product catalogs to allOrgsArray variable
    const allOrgsArray = getAllOrgsWithProductCat.records[0].get('orgsArr');

    if (allOrgsArray.length === 0) {
      return res
        .status(200)
        .json('No organizations with supplier benchmarks at this time.');
    }

    const results = allOrgsArray.map(async (org: string) => {
      const neosession = neo4jDriver.session();
      ///////////////////////////////////////////////////
      /////////   Item Insights    /////////////////////
      //////////////////////////////////////////////////

      // Get the total number of unique products per org that appear on critical items lists.
      const supplierItemsOnCritList = await neosession.executeRead((tx) => {
        const query = `
          MATCH (o:Organization{oid:$org})-[:IN_PRODUCT_CATALOG]->(p:Product)
          MATCH ()-[r:IN_CRIT_LIST]->(p)
          RETURN count(DISTINCT p) as countSupplierItemsOnCritList
        `;
        return tx.run(query, { org });
      });

      // The total items each supplier has on their critical items list
      const totalCritItemProducts = supplierItemsOnCritList.records[0].get(
        'countSupplierItemsOnCritList'
      );

      // Set critProductCount property to productCat node (used by Item Insights)
      const setItemInsight = await neosession.executeWrite((tx) => {
        const query = `
          MATCH(o:Organization{oid:$org})-[:CSV_UPLOADED]->(p:ProductCat)
          SET p.critProductCount = ${totalCritItemProducts},
              p.cronRan = timestamp()
          RETURN o, p
        `;
        return tx.run(query, { org });
      });

      ////////////////////////////////////////
      //////////  Commonality  ///////////////
      ////////////////////////////////////////

      //Get the total number of distinct products per org
      const supplierCatalogProductTotal = await neosession.executeRead((tx) => {
        const query = `
          MATCH (n:Supplier{oid:$org})-[:IN_PRODUCT_CATALOG]->(p:Product)
          RETURN count(DISTINCT p) as total
        `;
        return tx.run(query, { org });
      });

      // The total amount of products on each suppliers catalog
      const productTotal = supplierCatalogProductTotal.records[0].get('total');

      // calculate the percentage of items that are on the provider's critical item list
      const productOnCritListAvg = (
        totalCritItemProducts / productTotal
      ).toFixed(2);
      // Set commonality property to productCat node
      const setCommonality = await neosession.executeWrite((tx) => {
        const query = `
          MATCH(o:Organization{oid:$org})-[:CSV_UPLOADED]-(p:ProductCat)
          SET p.commonality = $productOnCritListAvg
          RETURN p.commonality AS commonality
        `;
        return tx.run(query, { org, productOnCritListAvg });
      });

      ////////////////////////////////////////
      ///////// Provider Prevalence /////////
      ////////////////////////////////////////

      //Get the number of unique providers this organizations supports
      const uniqueProviders = await neosession.executeRead((tx) => {
        const query = `
          MATCH (s:Supplier{oid:$org})-[:IN_PRODUCT_CATALOG]->(p:Product)
          MATCH (o:Provider)-[:IN_CRIT_LIST]->(p)
          RETURN count(DISTINCT o) as providers
        `;
        return tx.run(query, { org });
      });

      // The nuber of unique providers each supplier supports.
      const totalSuppliers = uniqueProviders.records[0].get('providers');

      //Set commonality property to productCat node
      const setSupplierPrevalence = await neosession.executeWrite((tx) => {
        const query = `
          MATCH(o:Organization{oid:$org})-[:CSV_UPLOADED]-(p:ProductCat)
          SET p.uniqueProviders = ${totalSuppliers}
          RETURN p.uniqueProviders AS prevalence
        `;
        return tx.run(query, { org });
      });

      await neosession.close();

      return {
        org: setItemInsight.records[0].get('o').properties.orgName,
        cronRan: setItemInsight.records[0].get('p').properties.cronRan,
        data: {
          commonality: setCommonality.records[0].get('commonality'),
          prevalence: setSupplierPrevalence.records[0].get('prevalence'),
        },
      };
    });

    const resultsArray = await Promise.all(results);
    return res.status(200).json({ results: resultsArray });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

export default SupplierViewCritItemsRouter;
