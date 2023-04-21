import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { neo4jDriver } from '@ps/server/neo4j';

// This api pulls organization critical items from server and filters based on active search results as needed
// called from the critical items page in the PS application
// on success returns an array of critical items for the organization
// if the organization has no critical items uploaded, returns 1 ; in case of a search with no results returns 0
const critItemsRouter = createRouter<NextApiRequest, NextApiResponse>();

critItemsRouter.get(async (req, res) => {
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

    const sortStatement = desc === 'desc' ? `${sortField} DESC` : sortField;

    const searchTermIncl = '*' + searchTerm + '*';

    // if search is active and there's search terms, the db is searched and returned by score initially, and then by sort if the user clicks on the sortable columns
    // if search active is false, the regular full results for the organization are returned
    if (searchActive && searchTerm.length > 0) {
      const searchNodes = await neosession.executeRead((tx) => {
        const query = `
              CALL db.index.fulltext.queryNodes('productsFullText', $searchTerm)
              YIELD node, score WHERE EXISTS (()-[:IN_CRIT_LIST]->(node))
              MATCH (po:Organization)-[:IN_CRIT_LIST]->(node)
              MATCH (o:Organization {oid: $oid})-[:IN_PRODUCT_CATALOG]->(node)
              OPTIONAL MATCH (node)-[:MADE_BY]->(makerOrg)
              RETURN node AS p, COUNT (DISTINCT po) AS prevalence, score, makerOrg
              ORDER BY ${sortStatement}
            `;
        return tx.run(query, {
          oid,
          sortStatement,
          searchTerm: searchTermIncl,
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
        const { manufacturer, manNumber, id, itemType, description } =
          record.get('p').properties;
        const prevalence = (record.get('prevalence') / totalOrgs) * 100;
        const makerOrg = record.get('makerOrg')
          ? record.get('makerOrg').properties.oid
          : '';

        return {
          manufacturer,
          manNumber,
          description: description ? description : 'Unknown',
          id,
          backOrdStat: 'Unknown',
          itemType: itemType ? itemType : 'Unknown',
          prevalence,
          makerOrg,
        };
      });

      return res.status(200).json({
        critItems: searchResults,
        total,
      });
    } else {
      const orgCritItems = await neosession.executeRead((tx) => {
        const query = `
              MATCH (o:Organization {oid: $oid})-[:IN_PRODUCT_CATALOG]->(p:Product)<-[:IN_CRIT_LIST]-(po:Organization)
              OPTIONAL MATCH (p)-[:MADE_BY]->(makerOrg)
              RETURN p, COUNT (DISTINCT po) AS prevalence, makerOrg
              ORDER BY ${sortStatement}
              `;
        return tx.run(query, {
          oid,
          sortStatement,
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

      // returning 1 here instead of 0 so we can catch when an org has no critical items
      if (orgCritItems.records.length === 0) {
        return res.status(200).json(1);
      }

      // total number of search results
      const total = orgCritItems.records.length;

      // slice the original results array based on our skip and limit numbers: if end > end of array, slice just returns full length of array
      const sliceCritItems = orgCritItems.records.slice(skip, skip + limit);

      // for the individual org list of critical items descprition should come from the IN_CRIT_LIST edge
      const critItems = sliceCritItems.map((record) => {
        const { manufacturer, manNumber, id, itemType, description } =
          record.get('p').properties;
        const prevalence = (record.get('prevalence') / totalOrgs) * 100;
        const makerOrg = record.get('makerOrg')
          ? record.get('makerOrg').properties.oid
          : '';

        return {
          manufacturer,
          manNumber,
          id,
          description: description ? description : 'Unknown',
          itemType: itemType ? itemType : 'Unknown',
          backOrdStat: 'Unknown',
          prevalence,
          makerOrg,
        };
      });

      return res.status(200).json({ critItems, total });
    }
  } catch (error) {
    console.error(error);
  }
});

export default critItemsRouter;
