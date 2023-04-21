import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

/**
 * A random key used as a placeholder to ensure the build doesn't fail
 * when the Admin key is not present in production builds.
 * For security reasons, the production admin key only lives on the server.
 */
const placeholderRandomKey =
  "-----BEGIN PRIVATE KEY-----\nMIIBOAIBAAJAb6SCGCg9YJbGxqQuZVgiTfwhcInjpyNwGd4CiZ9mQhIXqznJIn0n\n3WFqmmSUyp/8FbuQJ5P/9c31uEBMHemHrwIDAQABAkAZhur8LQ9Dq5YNy3KUV5+Y\nZ0MaIV09VTwHnhzEbP8LshvjLTxtkew8hxiYH8vs16YDq+VBUOQcdUOYwrckJGlB\nAiEAs/EUfRcuaMQD8qd0sKVeZCg3DWT4E32WaNxzmP57I2ECIQCe1P/OEmiQNqzW\naxj1rfwZZmu9l8/RHNABMtGjefuVDwIgVifhCn/V7b2kskNxgL69MjF7IoOssBBa\nuvyKsL9wECECIE5igefaL95UDVI4QnYkqhCC+lLz0+y4UnL0+H68GYvDAiAX3dYR\nwXynTwFUZ352Usl8+/Bmc7OFuucLzb7pSAiskA==\n-----END PRIVATE KEY-----\n";

const privateKey =
  process.env.FIREBASE_ADMIN_PRIVATE_KEY ?? placeholderRandomKey;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const projectId = process.env.FIREBASE_PROJECT_ID;

const initializeAdmin = () => {
  initializeApp({
    credential: cert({
      privateKey: privateKey.replace(/\\n/g, "\n"),
      clientEmail,
      projectId,
    }),
  });
};

const apps = getApps();
if (!apps.length) {
  initializeAdmin();
}

const authCounterDB = getFirestore();
export { getApp, getAuth, authCounterDB };
