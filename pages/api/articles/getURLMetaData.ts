import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';

const getArticleRouter = createRouter<NextApiRequest, NextApiResponse>();

getArticleRouter.get(async (req, res) => {

  // pull scraper URL from env variable
  const scraperUrl = process.env.SCRAPER_URL;
  const url = req.query.url ? (req.query.url as string) : '';
  // pulls auth token from env variables
  const bearerToken = process.env.SCRAPER_SECRET;

  try {
    if (scraperUrl) {
      const response = await fetch(`${scraperUrl}?url=${url}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      const data = await response.json();

      const { title, ogImage, siteName } = data;

      return res.status(200).json({ title, ogImage, siteName });
    } else {
      return res
        .status(500)
        .json('Environment not recognized, cannot perform web scrape action.');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });

  }
});

export default getArticleRouter;
