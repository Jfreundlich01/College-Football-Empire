import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import { neo4jDriver } from '@ps/server/neo4j';
import sgMail from '@sendgrid/mail';

const instantTopicNotifyRouter = createRouter<
  NextApiRequest,
  NextApiResponse
>();

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

instantTopicNotifyRouter.post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // check auth token before continuing
      const token = req.headers.authorization?.split(' ')[1];

      if (token !== process.env.NOTIFICATION_API_SECRET) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const parsedBody = JSON.parse(req.body);
      const organization = parsedBody.organization;
      const topicName = parsedBody.topicName;
      const topicId = parsedBody.topicId;
      const neosession = neo4jDriver.session();

      const subscriberListQuery = await neosession.executeRead((tx) => {
        const query = `
        MATCH (n:Notification:ArticleNotify:Instant)
        MATCH (n)<-[:SUBSCRIBED]-(u:User)
        RETURN u
      `;
        return tx.run(query);
      });

      await neosession.close();

      if (subscriberListQuery.records.length === 0) {
        return res.status(200).json({
          msg: 'No users subscribed to this instant article notifications',
        });
      }

      const subscriberList = subscriberListQuery.records.map((record) => {
        const { firstName, email } = record.get('u').properties;
        return { firstName, email };
      });

      const mailResponse = subscriberList.map(
        async (subscriber: { firstName: string; email: string }) => {
          const topicNotifyTemplate = {
            to: subscriber.email,
            from: 'community@peersupply.co',
            templateId: 'd-b0d8c3a41b8e41709f05b15ff3eeb9b5',
            dynamicTemplateData: {
              User_Firstname: subscriber.firstName,
              Topic_Organization: organization,
              Topic_Name: topicName,
              URL: `${process.env.PS_BASE_URL}/authorized/topicCoverage/${topicId}`,
              User_Account_URL: `${process.env.PS_BASE_URL}/authorized/accountSettings`,
            },
          };

          sgMail
            .send(topicNotifyTemplate)
            .then((res) => {
              return { res };
            })
            .catch((error) => {
              return {
                subscriber: subscriber.email,
                msg: 'Mail unsuccessful',
                error,
              };
            });
        }
      );

      const responsePayload = await Promise.all(mailResponse);

      console.info(
        `response payload from instant comment notification SendGrid calls: ${JSON.stringify(
          responsePayload
        )}`
      );

      return res.status(200).json(responsePayload);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
);

export default instantTopicNotifyRouter;
