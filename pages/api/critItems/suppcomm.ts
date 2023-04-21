import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { neo4jDriver } from '@ps/server/neo4j';

// This api pulls community critical items from server and filters based on active search results as needed
// called from the critical items page in the PS application
// on success returns an array of critical items for the Peer Supply community and boolean for whether current org has product catalog relationship to that crit item
// if there are no critical items in the database, returns 1; in case of a search with no results returns 0

const suppCommCritItemsRouter = createRouter<NextApiRequest, NextApiResponse>();

suppCommCritItemsRouter.get(async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(403).json('Unauthorized');
    }

    const { oid, sort, desc } = req.query;

    const searchActive = req.query.searchActive === 'false' ? false : true;

    const skip = !req.query.skip
      ? 0
      : Array.isArray(req.query.skip)
      ? parseInt(req.query.skip[0], 10)
      : parseInt(req.query.skip, 10);

    const limit = !req.query.limit
      ? 10
      : Array.isArray(req.query.limit)
      ? parseInt(req.query.limit[0], 10)
      : parseInt(req.query.limit, 10);

    const searchTerm = req.query.searchTerm ? req.query.searchTerm : '';

    // opening the neo4j session
    const neosession = neo4jDriver.session();

    const sortField =
      sort === 'prevalence'
        ? 'prevalence'
        : sort === 'score'
        ? 'score'
        : `p.${sort}`;

    const sortStatement =
      desc === 'desc' ? `${sortField} DESC` : `${sortField}`;

    const searchTermIncl = '*' + searchTerm + '*';

    const neo4j = require('neo4j-driver');

    // if search is active and there's search terms, the db is searched and returned by score initially, and then by sort if the user clicks on the sortable columns
    // if search active is false, the regular full results for the organization are returned
    if (searchActive && searchTerm.length > 0) {
      const searchNodes = await neosession.executeRead((tx) => {
        const query = `
          CALL db.index.fulltext.queryNodes('productsFullText', $searchTerm)
          YIELD node, score WHERE EXISTS (()-[:IN_CRIT_LIST]->(node))
          MATCH (o:Organization)-[r:IN_CRIT_LIST]->(node)
          OPTIONAL MATCH (b:Organization {oid: $oid})-[pc:IN_PRODUCT_CATALOG]->(node)
          OPTIONAL MATCH (node)-[:MADE_BY]->(makerOrg) 
          RETURN node AS p, COUNT (DISTINCT o) AS prevalence, score, pc, makerOrg
          ORDER BY ${sortStatement}
        `;
        return tx.run(query, {
          sortStatement,
          searchTerm: searchTermIncl,
          oid,
        });
      });

      // creates count of total organizations with critical items lists
      const totalOrgsQuery = await neosession.executeRead((tx) => {
        const query = `
          MATCH (o:Organization)-[:IN_CRIT_LIST]->(:Product)
          RETURN COUNT (DISTINCT o) AS totalOrgs
        `;
        return tx.run(query);
      });

      await neosession.close();

      const totalOrgs = totalOrgsQuery.records[0].get('totalOrgs');

      if (searchNodes.records.length === 0) return res.status(200).json(0);

      // total number of search results
      const total = searchNodes.records.length;

      // slice the original results array based on our skip and limit numbers: if end > end of array, slice just returns full length of array
      const sliceSearch = searchNodes.records.slice(skip, skip + limit);

      const searchResults = sliceSearch.map((record) => {
        const { manufacturer, manNumber, description, id, itemType } =
          record.get('p').properties;
        const prevalence = (record.get('prevalence') / totalOrgs) * 100;
        const bold = record.get('pc') ? true : false;
        const makerOrg = record.get('makerOrg')
          ? record.get('makerOrg').properties.oid
          : '';

        return {
          manufacturer,
          manNumber,
          description: description ? description : 'Unknown',
          id,
          prevalence,
          itemType: itemType ? itemType : 'Unknown',
          substitutes: 'Coming soon',
          bold,
          makerOrg,
        };
      });

      return res.status(200).json({ allCritItems: searchResults, total });
    } else {
      const commCritItems = await neosession.executeRead((tx) => {
        const query = `
          MATCH (o:Organization)-[r:IN_CRIT_LIST]->(p:Product)
          WHERE NOT p.manufacturer = '#N/A' AND NOT p.manufacturer = 'Unknown'
          WITH p, COUNT (DISTINCT o) AS prevalence
          OPTIONAL MATCH (b:Organization {oid: $oid})-[pc:IN_PRODUCT_CATALOG]->(p)
          OPTIONAL MATCH (p)-[:MADE_BY]->(makerOrg)
          RETURN p, prevalence, pc, makerOrg
          ORDER BY ${sortStatement}
          SKIP $skip
          LIMIT $limit
      `;
        return tx.run(query, {
          sortStatement,
          limit: neo4j.int(limit),
          skip: neo4j.int(skip),
          oid,
        });
      });

      if (commCritItems.records.length === 0) {
        return res.status(200).json(1);
      }

      // pulling total number of all critical items flagged products in the database
      const totalItems = await neosession.executeRead((tx) => {
        const query = `
          MATCH ()-[r:IN_CRIT_LIST]->(p:Product)
          RETURN COUNT (DISTINCT p) AS totalItems
        `;
        return tx.run(query);
      });

      const productCount = parseInt(
        totalItems.records[0].get('totalItems'),
        10
      );

      // creates count of total organizations with critical items lists
      const totalOrgsQuery = await neosession.executeRead((tx) => {
        const query = `
          MATCH (o:Organization)-[:IN_CRIT_LIST]->(:Product)
          RETURN COUNT (DISTINCT o) AS totalOrgs
        `;
        return tx.run(query);
      });

      await neosession.close();

      const totalOrgs = totalOrgsQuery.records[0].get('totalOrgs');

      // for the community critical items list the item description should come from the product node
      const allCritItems = commCritItems.records.map((record) => {
        const { manufacturer, manNumber, id, description, itemType } =
          record.get('p').properties;
        const prevalence = (record.get('prevalence') / totalOrgs) * 100;
        const bold = record.get('pc') ? true : false;
        const makerOrg = record.get('makerOrg')
          ? record.get('makerOrg').properties.oid
          : '';

        return {
          manufacturer,
          manNumber,
          id,
          description: description ? description : 'Unknown',
          itemType: itemType ? itemType : 'Unknown',
          prevalence,
          substitutes: 'Coming soon',
          bold,
          makerOrg,
        };
      });

      res.status(200).json({ allCritItems, total: productCount });
    }
  } catch (error) {
    console.error(error);
  }
});

export default suppCommCritItemsRouter;
