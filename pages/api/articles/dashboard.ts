import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { neo4jDriver } from '@ps/server/neo4j';
interface Article {
  identity: number;
  labels: string[];
  title: string;
  siteName: string;
  properties: {
    imgUrl: string;
    topic: string;
    clicks: number;
    siteName: string;
    id: string;
    title: string;
    articleUrl: string;
    createdOn: number;
    status: string;
  };
  elementId: string;
}

interface ArticleTopic {
  identity: number;
  name: string;
  labels: string[];
  properties: { name: string; createdOn: number };
  elementId: string;
}

interface ArticleTopicWithArticles {
  topic: ArticleTopic;
  totalClicks: number;
  articles: Article[];
  trending: undefined | boolean;
}

const articlesDashboardRouter = createRouter<NextApiRequest, NextApiResponse>();

articlesDashboardRouter.get(async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    // If there is no session, return a 403 error with the message "Unauthorized"
    if (!session) {
      return res.status(403).json('Unauthorized');
    }

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
    const searchActive = req.query.searchActive === 'false' ? false : true;
    const searchTermIncl = '*' + searchTerm + '*';

    // opening the neo4j session
    const neosession = neo4jDriver.session();

    if (searchActive && searchTerm.length > 0) {
      const searchNodes = await neosession.executeRead((tx) => {
        const query = `
          CALL db.index.fulltext.queryNodes("articles", $searchTerm) 
          YIELD node, score
          WHERE node.status = 'published'
          MATCH (node)-[:TOPIC_AREA]->(t:ArticleTopic)
          RETURN node AS a, t, score
          SKIP ${skip}
          LIMIT ${limit}
        `;
        return tx.run(query, {
          searchTerm: searchTermIncl,
        });
      });

      if (searchNodes.records.length === 0) return res.status(200).json(0);

      const searchResults = searchNodes.records.map((record) => {
        const { articleUrl, id, imgUrl, status, title, siteName, createdOn } =
          record.get('a').properties;

        const topic = record.get('t').properties;

        return {
          articleUrl,
          id,
          imgUrl,
          status,
          title,
          siteName,
          createdOn,
          topic,
        };
      });

      return res.status(200).json([
        [
          {
            articles: searchResults,
          },
        ],
      ]);
    } else {
      // Run a query to get articles grouped by topic and sorted by most recent.
      // Return a collection of topics with articles, and the totalClicks of each article per topic
      const articles = await neosession.executeRead((tx) => {
        const query = `
                MATCH (article:Article)-[:TOPIC_AREA]->(topic:ArticleTopic)
                WHERE article.status = 'published'
                WITH topic, article
                ORDER BY article.createdOn DESC
                WITH topic, collect(article) as articles, (sum(size((article)<-[:CLICKED]-())) +  sum(size((topic)<-[:CLICKED]-()))) as totalClicks
                SKIP ${skip}
                LIMIT ${limit}
                RETURN collect({topic: topic, articles: articles, totalClicks: totalClicks}) as topics
              `;
        return tx.run(query);
      });

      // Transform the results of the query into an array of topic groups with articles and metadata
      const articleGroups = articles.records.map((group) => {
        let topicAndArticles = group
          .get('topics')
          .map((topicGroup: ArticleTopicWithArticles) => {
            const topic = topicGroup.topic.properties;
            const articles = topicGroup.articles.map((article) => {
              return article.properties;
            });

            // Sort the articles by createdOn in descending order
            const sortedArticles = articles.sort((a, b) => {
              return b.createdOn - a.createdOn;
            });

            return {
              topic,
              articles: sortedArticles,
              totalClicks: topicGroup.totalClicks,
            };
          });

        // Sort the topicAndArticles by the totalClicks in descending order
        topicAndArticles.sort(
          (a: { totalClicks: number }, b: { totalClicks: number }) => {
            return b.totalClicks - a.totalClicks;
          }
        );

        if (skip === 0) {
          topicAndArticles
            .slice(0, 3)
            .forEach((topicGroup: ArticleTopicWithArticles, index: number) => {
              if (index < limit) {
                topicGroup.trending = true;
              } else {
                topicGroup.trending = false;
              }
            });
        }

        // Sort the topicAndArticles by the createdOn value of the most recent article
        topicAndArticles.sort(
          (a: { articles: any[] }, b: { articles: any[] }) => {
            const aRecentArticle = a.articles[0];
            const bRecentArticle = b.articles[0];
            return bRecentArticle.createdOn - aRecentArticle.createdOn;
          }
        );

        return topicAndArticles;
      });
      return res.status(200).json(articleGroups);
    }
  } catch (error) {
    console.error(error);
  }
});

export default articlesDashboardRouter;
