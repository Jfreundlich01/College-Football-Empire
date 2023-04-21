import type { NextApiRequest, NextApiResponse } from 'next';
import createRouter from 'next-connect';
import {
  userAllowed,
  setUserAttemptCount,
  resetUserAttemptCount,
} from '@ps/server/firebase/firestore';

// This api is used to manage the lockout provisions of our auth system

const lockoutRouter = createRouter<NextApiRequest, NextApiResponse>();

// Get route currently only used to check if user's log in attempt can proceed
// True === user can attempt log in
// False === user is currently locked out and cannot attempt login
lockoutRouter.get(async (req, res) => {
  try {
    let { email } = req.query;

    if (typeof email !== 'string') {
      Array.isArray(email) ? (email = email[0]) : (email = '');
    }

    const data = await userAllowed(email);

    // desired behavior is that there is a warning before 4th login attempt about imminent lockout
    // set as count === 2 below so it displays after 3rd failed attempt, before 4th attempt
    // the message will be called with a stale count on 3rd attempt and only appear if attempt fails
    return data.boolean === false
      ? res.status(200).json({ allowed: false, warn: false })
      : data.count === 2
      ? res.status(200).json({ allowed: true, warn: true })
      : res.status(200).json({ allowed: true, warn: false });
  } catch (error) {
    console.error(error);
  }
});

lockoutRouter.put(async (req, res) => {
  try {
    let { email, action } = req.query;

    if (typeof email !== 'string') {
      Array.isArray(email) ? (email = email[0]) : (email = '');
    }

    if (typeof action !== 'string') {
      Array.isArray(action) ? (action = action[0]) : (action = '');
    }

    if (action === 'setCount') {
      setUserAttemptCount(email).then((data) => {
        return res.status(200).json(data);
      });
    }

    if (action === 'resetCount') {
      resetUserAttemptCount(email).then((data) => {
        return res.status(200).json(data);
      });
    }
  } catch (error) {
    console.error(error);
  }
});

export default lockoutRouter;
