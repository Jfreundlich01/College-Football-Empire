import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import { neo4jDriver } from '@ps/server/neo4j';
import sgMail from '@sendgrid/mail';

const instantArticleNotifyRouter = createRouter<
  NextApiRequest,
  NextApiResponse
>();

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

instantArticleNotifyRouter.post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // check auth token before continuing
      const token = req.headers.authorization?.split(' ')[1];

      if (token !== process.env.NOTIFICATION_API_SECRET) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const parsedBody = JSON.parse(req.body);
      const topicId = parsedBody.topicId;
      const organization = parsedBody.organization;
      const topicName = parsedBody.topicName;
      const articleName = parsedBody.articleName;

      const neosession = neo4jDriver.session();

      const subscriberListQuery = await neosession.executeRead((tx) => {
        const query = `
        MATCH (n:Notification:ArticleNotify:Instant)
        MATCH (n)<-[:SUBSCRIBED]-(u:User)-[:FOLLOWING]->(t:ArticleTopic)
        WHERE t.id = $topicId
        RETURN u
      `;
        return tx.run(query, { topicId });
      });

      await neosession.close();

      if (subscriberListQuery.records.length === 0) {
        return res.status(200).json({
          msg: 'No users following this topic and subscribed to instant article notifications.',
        });
      }

      const subscriberList = subscriberListQuery.records.map((record) => {
        const { firstName, email } = record.get('u').properties;
        return { firstName, email };
      });

      const mailResponse = subscriberList.map(
        async (subscriber: { firstName: string; email: string }) => {
          const articleNotifyTemplate = {
            to: subscriber.email,
            from: 'community@peersupply.co',
            templateId: 'd-9061e9c0e9e34db584dc177534fc5f1a',
            dynamicTemplateData: {
              User_Firstname: subscriber.firstName,
              Article_Organization: organization,
              Topic_Name: topicName,
              Article_Title: articleName,
              URL: `${process.env.PS_BASE_URL}/authorized/topicCoverage/${topicId}`,
              User_Account_URL: `${process.env.PS_BASE_URL}/authorized/accountSettings`,
            },
          };

          sgMail
            .send(articleNotifyTemplate)
            .then((res) => {
              return { res };
            })
            .catch((error) => {
              return error;
            });
        }
      );

      const responsePayload = await Promise.all(mailResponse);

      console.info(
        `response payload from instant article notification SendGrid calls: ${JSON.stringify(
          [...responsePayload]
        )}`
      );

      return res.status(200).json(responsePayload);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
);

export default instantArticleNotifyRouter;
