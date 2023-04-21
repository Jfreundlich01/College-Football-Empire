import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { neo4jDriver } from '@ps/server/neo4j';

// This api pulls Articles posted by the organization's members from server and filters based on active search results as needed
// on success returns an array of articles
// if there are no articles in the database, returns 1;
// in case of a search with no results returns 0

const myOrgArticles = createRouter<NextApiRequest, NextApiResponse>();

myOrgArticles.get(async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(403).json('Unauthorized');
    }

    const { oid } = req.query;

    const searchActive = req.query.searchActive === 'false' ? false : true;

    const skip = !req.query.skip
      ? 0
      : Array.isArray(req.query.skip)
      ? parseInt(req.query.skip[0], 10)
      : parseInt(req.query.skip, 10);

    const limit = !req.query.limit
      ? 6
      : Array.isArray(req.query.limit)
      ? parseInt(req.query.limit[0], 10)
      : parseInt(req.query.limit, 10);

    const searchTerm = req.query.searchTerm ? req.query.searchTerm : '';

    // opening the neo4j session
    const neosession = neo4jDriver.session();

    const searchTermIncl = '*' + searchTerm + '*';

    const neo4j = require('neo4j-driver');

    // if search is active and there are search terms, the db is searched and results sorted by score initially
    // if search active is false, the regular full results are returned
    if (searchActive && searchTerm.length > 0) {
      const searchNodes = await neosession.executeRead((tx) => {
        const query = `
            CALL db.index.fulltext.queryNodes("articles", $searchTerm) YIELD node, score
            WHERE node:Article AND (node)<-[:PUBLISHED]-({oid: $oid})
            WITH node, score
            RETURN node AS a, score
        `;
        return tx.run(query, {
          searchTerm: searchTermIncl,
          oid,
        });
      });

      if (searchNodes.records.length === 0) return res.status(200).json(0);

      // total number of search results
      const total = searchNodes.records.length;

      // slice the original results array based on our skip and limit numbers: if end > end of array, slice just returns full length of array
      const sliceSearch = searchNodes.records.slice(skip, skip + limit);
      const searchResults = sliceSearch.map((record) => {
        const {
          articleUrl,
          id,
          imgUrl,
          status,
          title,
          topic,
          siteName,
          createdOn,
        } = record.get('a').properties;

        return {
          articleUrl,
          id,
          imgUrl,
          status,
          title,
          topic,
          siteName,
          createdOn,
        };
      });

      return res.status(200).json({ allArticles: searchResults, total });
    } else {
      const articles = await neosession.executeRead((tx) => {
        const query = `
          MATCH (o:Organization {oid:$oid})-[r:PUBLISHED]->(a:Article)
          MATCH (u:User)-[:PUBLISHED]->(a)
          RETURN a , u
          ORDER BY a.createdOn DESC
          SKIP $skip
          LIMIT $limit
      `;
        return tx.run(query, {
          limit: neo4j.int(limit),
          skip: neo4j.int(skip),
          oid,
        });
      });

      if (articles.records.length === 0) {
        return res.status(200).json(1);
      }

      await neosession.close();

      const allArticles = articles.records.map((record) => {
        const {
          articleUrl,
          id,
          imgUrl,
          status,
          title,
          topic,
          siteName,
          createdOn,
        } = record.get('a').properties;

        const uid = record.get('u').properties.uid;

        return {
          articleUrl,
          id,
          imgUrl,
          status,
          title,
          topic,
          siteName,
          createdOn,
          uid,
        };
      });

      res.status(200).json({ allArticles });
    }
  } catch (error) {
    console.error(error);
  }
});

export default myOrgArticles;
