import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import { neo4jDriver } from '@ps/server/neo4j';

const ArticleLinkCheckRouter = createRouter<NextApiRequest, NextApiResponse>();

ArticleLinkCheckRouter.post(async (req, res) => {
  // contains any articles archived during cron job
  let archivedArticles: {
    articleId: string;
    urlStatus: number;
    imgStatus: number;
  }[] = [];

  try {
    // check auth token
    const token = req.headers.authorization?.split(' ')[1];

    if (token !== process.env.LINK_CHECKER_API_SECRET) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // open neo4j session
    const neosession = neo4jDriver.session();

    // pull arrays of all active articles
    const getArticles = await neosession.executeRead((tx) => {
      const query = `
        MATCH (a:Article)
        WHERE a.status = 'published'
        RETURN a
      `;
      return tx.run(query);
    });

    if (getArticles.records.length === 0) {
      await neosession.close();
      return res.status(200).json({ msg: 'No published articles' });
    }

    await neosession.close();

    // perform checks to ensure links are still valid/working as expected
    // attempt fetch request on url--if res.status[0] !== 2 then link is broken
    const results = getArticles.records.map(async (article) => {
      const { articleUrl, imgUrl, id } = article.get('a').properties;

      const checkUrl = await fetch(articleUrl);
      const checkImgUrl = await fetch(imgUrl);

      // check to see if http response status is outside the range of success responses (200's) or informational responses (100's)
      if (checkImgUrl.status > 299 || checkUrl.status > 299) {
        try {
          const neosession = neo4jDriver.session();

          // if a link is no longer working, archive the article
          const archived = await neosession.executeWrite((tx) => {
            const query = `
              MATCH(a:Article {id: $id})
              SET a.status = 'archived'
              RETURN a
            `;
            return tx.run(query, { id });
          });

          await neosession.close();

          archivedArticles.push({
            articleId: id,
            urlStatus: checkUrl.status,
            imgStatus: checkImgUrl.status,
          });

          return archived.records[0].get('a').properties;
        } catch (error) {
          console.error(error);
          return error;
        }
      }

      return article.get('a').properties;
    });

    const resultsArray = await Promise.all(results);

    return res.status(201).json({ archivedArticles, resultsArray });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

export default ArticleLinkCheckRouter;
