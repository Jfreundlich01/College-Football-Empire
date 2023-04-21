import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import { neo4jDriver } from '@ps/server/neo4j';
import sgMail from '@sendgrid/mail';

const instantCommentArticleNotifyRouter = createRouter<
  NextApiRequest,
  NextApiResponse
>();

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

instantCommentArticleNotifyRouter.post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // check auth token before continuing
      const token = req.headers.authorization?.split(' ')[1];

      if (token !== process.env.NOTIFICATION_API_SECRET) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const parsedBody = JSON.parse(req.body);
      const topicId = parsedBody.topicId;
      const topicName = parsedBody.topicName;
      const commentAuthor = parsedBody.commentAuthor;
      const commentAuthorId = parsedBody.commentAuthorId;
      const commentBody = parsedBody.commentBody;

      const neosession = neo4jDriver.session();

      const subscriberListQuery = await neosession.executeRead((tx) => {
        const query = `
        MATCH (n:Notification:ArticleNotify:Instant)
        MATCH (t:ArticleTopic {id: $topicId})
        MATCH (u:User)-[:SUBSCRIBED]->(n)
          WHERE (u)-[:COMMENTED_ON]->(t) OR (u)-[:FOLLOWING]->(t)
        RETURN DISTINCT u
      `;
        return tx.run(query, { topicId });
      });

      await neosession.close();

      if (subscriberListQuery.records.length === 0) {
        return res.status(200).json({
          msg: 'No users following this topic, or have commented on this topic previously.',
        });
      }

      const subscriberList: {
        firstName: string;
        email: string;
        uid: string;
      }[] = subscriberListQuery.records.map((record) => {
        const { firstName, email, uid } = record.get('u').properties;
        return { firstName, email, uid };
      });

      const mailResponse = subscriberList.map(
        async (subscriber: {
          firstName: string;
          email: string;
          uid: string;
        }) => {
          // skip emailing the user who posted the comment
          if (commentAuthorId === subscriber.uid) {
            return null;
          }
          const commentNotifyTemplate = {
            to: subscriber.email,
            from: 'community@peersupply.co',
            templateId: 'd-dbc861944f4247fd8d0a1b1b19c0004a',
            dynamicTemplateData: {
              User_Firstname: subscriber.firstName,
              Content_Author: commentAuthor,
              Topic_Name: topicName,
              Comment_Contents: commentBody.replace(/\\n/g, '\n'),
              URL: `${process.env.PS_BASE_URL}/authorized/topicCoverage/${topicId}`,
              User_Account_URL: `${process.env.PS_BASE_URL}/authorized/accountSettings`,
            },
          };

          sgMail
            .send(commentNotifyTemplate)
            .then((res) => {
              return { res };
            })
            .catch((error) => {
              console.error(error);
              return error;
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
      return res.status(500).json({ error: JSON.stringify(error) });
    }
  }
);

export default instantCommentArticleNotifyRouter;
