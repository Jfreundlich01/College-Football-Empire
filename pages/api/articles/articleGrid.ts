import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { neo4jDriver } from '@ps/server/neo4j';

// This api pulls Articles from server and filters based on active search results as needed
// called from the Article Table component in the global Admin page and returns both published and archived articles
// on success returns an array of articles
// if there are no articles in the database, returns 1;
// in case of a search with no results returns 0

const articlesGridRouter = createRouter<NextApiRequest, NextApiResponse>();

articlesGridRouter.get(async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(403).json('Unauthorized');
    }

    const { sort, desc } = req.query;

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
      sort === 'topic'
        ? 'topic'
        : sort === 'title'
        ? 'title'
        : sort === 'clicks'
        ? 'clicks'
        : 'createdOn';

    const sortOrder = desc === 'desc' ? 'DESC' : 'ASC';
    const searchTermIncl = '*' + searchTerm + '*';

    const neo4j = require('neo4j-driver');

    // if search is active and there are search terms, the db is searched and results sorted by score initially, altered to another sort type if user clicks sortable columns
    // if search active is false, the regular full results are returned
    if (searchActive && searchTerm.length > 0) {
      const searchNodes = await neosession.executeRead((tx) => {
        const query = `
          CALL db.index.fulltext.queryNodes("articles", $searchTerm) 
          YIELD node, score
          WHERE node:Article
          WITH node, score, size((node)<-[:CLICKED]-()) AS clicks
          MATCH (o:Organization)-[:PUBLISHED]->(node)
          RETURN node AS a, score, clicks, o,
          ORDER BY ${
            sortField === 'clicks' ? 'clicks' : `a['${sortField}']`
          } ${sortOrder}    
        `;
        return tx.run(query, {
          searchTerm: searchTermIncl,
        });
      });

      if (searchNodes.records.length === 0) return res.status(200).json(0);

      // total number of search results
      const total = searchNodes.records.length;

      // slice the original results array based on our skip and limit numbers: if end > end of array, slice just returns full length of array
      const sliceSearch = searchNodes.records.slice(skip, skip + limit);
      const searchResults = sliceSearch.map((record) => {
        const { articleUrl, id, imgUrl, status, title, topic, siteName } =
          record.get('a').properties;
        const clicks = record.get('clicks');
        const oid = record.get('o').properties.oid;

        return {
          articleUrl,
          clicks,
          id,
          imgUrl,
          status,
          title,
          topic,
          siteName,
          oid,
        };
      });

      return res.status(200).json({ allArticles: searchResults, total });
    } else {
      const articles = await neosession.executeRead((tx) => {
        const query = `
          MATCH (a:Article)
          OPTIONAL MATCH (a)<-[r:CLICKED]-()
          MATCH (o:Organization)-[:PUBLISHED]->(a)
          WITH a, count(r) AS clicks, o
          RETURN a, clicks, o
          ORDER BY ${
            sortField === 'clicks' ? 'clicks' : `a['${sortField}']`
          } ${sortOrder}       
          SKIP $skip
          LIMIT $limit
      `;
        return tx.run(query, {
          limit: neo4j.int(limit),
          skip: neo4j.int(skip),
        });
      });

      if (articles.records.length === 0) {
        return res.status(200).json(1);
      }

      // pulling total number of all articles in the database
      const totalArticles = await neosession.executeRead((tx) => {
        const query = `
          MATCH (n:Article)
          RETURN COUNT (n) as totalArticles
        `;
        return tx.run(query);
      });

      const articleCount = parseInt(
        totalArticles.records[0].get('totalArticles'),
        10
      );

      await neosession.close();

      const allArticles = articles.records.map((record) => {
        const { articleUrl, id, imgUrl, status, title, topic, siteName } =
          record.get('a').properties;
        const clicks = record.get('clicks');
        const oid = record.get('o').properties.oid;

        return {
          articleUrl,
          clicks,
          id,
          imgUrl,
          status,
          title,
          topic,
          siteName,
          oid,
        };
      });

      res.status(200).json({ allArticles, total: articleCount });
    }
  } catch (error) {
    console.error(error);
  }
});

export default articlesGridRouter;
