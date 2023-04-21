import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import { neo4jDriver } from '@ps/server/neo4j';
import sgMail from '@sendgrid/mail';

const dailyDigestArticleNotifyRouter = createRouter<
  NextApiRequest,
  NextApiResponse
>();

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

dailyDigestArticleNotifyRouter.post(async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json('Authorization required.');
    }

    if (token !== process.env.NOTIFICATION_API_SECRET) {
      return res.status(403).json('Unauthorized');
    }

    const neosession = neo4jDriver.session();

    // pull list of all users subscribed to industry intel daily digest
    const subscriberListQuery = await neosession.executeRead((tx) => {
      const query = `
        MATCH (n:ArticleNotify:Notification:DailyDigest)<-[:SUBSCRIBED]-(u:User)
        RETURN u
      `;
      return tx.run(query);
    });

    // returns all topic nodes created within last 24 hours ordered newest to oldest
    const newTopicsQuery = await neosession.executeRead((tx) => {
      const query = `
        MATCH (t:ArticleTopic)
          WHERE timestamp() - t.createdOn <= 86400000
        RETURN t
        ORDER BY t.createdOn        
      `;
      return tx.run(query);
    });

    await neosession.close();

    // if there are no daily digest subscribers for industry intel notifications, return early
    if (subscriberListQuery.records.length === 0) {
      return res.status(200).json({
        msg: 'No users subscribed to industry intel daily digest notifications.',
      });
    }

    const newTopicCount = newTopicsQuery.records.length;

    // slice the top 3 results (most recent topics added)
    // slice will return less if there are fewer than 3 items in the original array

    const newTopics =
      newTopicCount === 0
        ? null
        : newTopicsQuery.records.slice(0, 3).map((record) => {
            const topicName = record.get('t').properties.name;
            const topicId = record.get('t').properties.id;
            return {
              topicName,
              topicUrl: `${process.env.PS_BASE_URL}/authorized/topicCoverage/${topicId}`,
            };
          });

    const topicsHeadline =
      newTopicCount === 0
        ? null
        : newTopicCount === 1
        ? `There was ${newTopicCount} new article topic added.`
        : `There were ${newTopicCount} article topics added.`;

    // creates subscriber list from user records with industry intel daily digest subscriptions
    const subscriberList = subscriberListQuery.records.map((record) => {
      const { uid, firstName, email } = record.get('u').properties;
      return { uid, firstName, email };
    });

    // maps through the subscriber list to create individualized content
    // if content exists for daily digest, sends subscriber email containing personalized updates
    // if there is no content for user, does premature return and does not send user daily digest email
    const responsePayload = subscriberList.map(
      async (subscriber: { uid: string; firstName: string; email: string }) => {
        const neosession = neo4jDriver.session();

        // get new articles in followed topics
        // pulls articles added to topics followed by subscriber that were added in the last 24 hours
        const newArticlesQuery = await neosession.executeRead((tx) => {
          const query = `
            MATCH (u:User {uid: $uid})
            MATCH (u)-[:FOLLOWING]->(t:ArticleTopic)
            MATCH (t)<-[:TOPIC_AREA]-(a:Article)
              WHERE timestamp() - a.createdOn <= 86400000
            RETURN a, t
            ORDER BY a.createdOn DESC
          `;
          return tx.run(query, { uid: subscriber.uid });
        });

        const articleCount = newArticlesQuery.records.length;

        // create an array of article objects
        const newArticles =
          newArticlesQuery.records.length === 0
            ? null
            : newArticlesQuery.records.slice(0, 3).map((record) => {
                const topicName = record.get('t').properties.name;
                const topicId = record.get('t').properties.id;
                const articleTitle = record.get('a').properties.title;
                return {
                  topicName,
                  topicUrl: `${process.env.PS_BASE_URL}/authorized/topicCoverage/${topicId}`,
                  articleTitle,
                };
              });

        // create email headline for new articles
        const articlesHeadline =
          articleCount === 0
            ? null
            : articleCount === 1
            ? `There was ${articleCount} new article added to topics you follow.`
            : `There were ${articleCount} new articles added to topics you follow.`;

        // get new comments added within last 24 hours that
        // 1. were placed on a topic that the subscriber follows, OR
        // 2. were placed on a topic that the subscriber also commented on
        // we also want to avoid returning comments by the user who is receiving the digest update
        const newCommentsQuery = await neosession.executeRead((tx) => {
          const query = `
            MATCH (u:User {uid: $uid})
            MATCH (t:ArticleTopic)
              WHERE (u)-[:FOLLOWING]->(t) OR (u)-[:COMMENTED_ON]->(t)
            MATCH (t)<-[c:COMMENTED_ON]-(ca:User)
              WHERE timestamp() - c.timestamp <= 86400000 AND NOT (ca.uid = $uid)
            RETURN c, ca, t
            ORDER BY c.timestamp DESC
          `;
          return tx.run(query, { uid: subscriber.uid });
        });

        const commentCount = newCommentsQuery.records.length;

        const newComments =
          commentCount === 0
            ? null
            : newCommentsQuery.records.slice(0, 3).map((record) => {
                const { firstName, lastName } = record.get('ca').properties;
                const { commentBody } = record.get('c').properties;
                const topicName = record.get('t').properties.name;
                const topicId = record.get('t').properties.id;

                return {
                  author: `${firstName} ${lastName}`,
                  commentBody,
                  topicUrl: `${process.env.PS_BASE_URL}/authorized/topicCoverage/${topicId}`,
                  topicName,
                };
              });

        // create email headline for new comments
        const commentsHeadline =
          commentCount === 0
            ? null
            : commentCount === 1
            ? `There was ${commentCount} new comment added to a topic you follow or have commented on.`
            : `There were ${commentCount} new comments added to a topic you follow or have commented on.`;

        await neosession.close();

        // user has no updates to report in daily digest--return before hitting sendgrid email api
        if (!newComments && !newArticles && !newTopics) {
          return {
            statusCode: 0,
            updates: false,
            emailApiHit: false,
          };
        }

        let dynamicBody = {};

        if (newTopics) {
          dynamicBody = { ...dynamicBody, newTopics, topicsHeadline };
        }

        if (newArticles) {
          dynamicBody = { ...dynamicBody, newArticles, articlesHeadline };
        }

        if (newComments) {
          dynamicBody = { ...dynamicBody, newComments, commentsHeadline };
        }

        // creates template data for targeted user
        const dailyDigestTemplate = {
          to: subscriber.email,
          from: 'community@peersupply.co',
          templateId: 'd-f447542f119044898ebbfa7a72da0172',
          dynamicTemplateData: {
            URL: `${process.env.PS_BASE_URL}/authorized/dashboard`,
            ...dynamicBody,
            User_Firstname: subscriber.firstName,
            User_Account_URL: `${process.env.PS_BASE_URL}/authorized/accountSettings`,
          },
        };

        // send daily digest email with any updates to user currently targetedd by subscriber array map
        sgMail
          .send(dailyDigestTemplate)
          .then((res) => {
            return {
              updates: true,
              statusCode: res,
              emailApiHit: true,
            };
          })
          .catch((error) => {
            console.error(error);
            console.error(error.body.errors);
            return { error };
          });
      }
    );
    const finalResponse = await Promise.all(responsePayload);
    return res.status(200).json(finalResponse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

export default dailyDigestArticleNotifyRouter;
