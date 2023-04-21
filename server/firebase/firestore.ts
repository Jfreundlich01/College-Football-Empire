import { authCounterDB } from "./config";

// lockout period translated into miliseconds; currently 30 minutes
const lockoutPeriod = 30 * 60 * 1000;
// maximum number of passwords attempts allowed before lockout
const maxAttempts = 5;

// returns a boolean value for whether the user is allowed to attempt authorization
// this will need to run before passwords are sent to Firebase for auth purposes
// returns true if the user is not currently locked out of the application
// returns false if user has 10 or more failed password attempts and is within 30 min lockout window
export const userAllowed = async (email: string) => {
  const userRecord = await authCounterDB
    .collection("authCounters")
    .doc(`${email}`)
    .get();

  const userData = userRecord.data();

  // if there is no user data, it means the user hasn't passed failed credentials before, so can't be locked out of the app yet
  if (!userData) {
    return { boolean: true, count: 0 };
  }

  // if count < maximum number of attempts allowed, user can attempt log-in; return true
  if (userData.count < maxAttempts) {
    return { boolean: true, count: userData.count };
  }

  const lastAttempt = parseInt(userData.lastAttempt, 10);

  // if failed attempt count is greater than or equal to the max attempts, user should be locked out for 30 minutes from last attempt
  // check current time against stored lastAttempt time to determine whether user can log in
  if (lastAttempt + lockoutPeriod < Date.now()) {
    return { boolean: true, count: userData.count };
  }

  return { boolean: false, count: userData.count };
};

// increments/initiates count for email address attempting to log in
export const setUserAttemptCount = async (email: string) => {
  const recordPath = authCounterDB.collection("authCounters").doc(`${email}`);

  const userRecord = await recordPath.get();

  const userData = userRecord.data();

  if (!userData) {
    recordPath.set({
      email: `${email}`,
      count: 1,
      lastAttempt: Date.now(),
    });
    return;
  }

  const currentCount = parseInt(userData.count, 10);
  const newCount = currentCount + 1;

  recordPath
    .set({
      email: `${email}`,
      count: newCount,
      lastAttempt: Date.now(),
    })
    .then((data) => {
      return data;
    })
    .catch((error) => console.error(error));
};

// resets the failed attempt counter to 0; called on successful login
export const resetUserAttemptCount = async (email: string) => {
  const recordPath = authCounterDB.collection("authCounters").doc(`${email}`);

  const userRecord = await recordPath.get();

  const userData = userRecord.data();

  if (!userData) {
    // if there have never been any failed attempts and the person has logged in successfully again, we don't need to add anything to this db
    return;
  }

  // reset the record to count 0
  // not including a timestamp since we do not need this for determining lockout period
  recordPath
    .set({
      email: `${email}`,
      count: 0,
    })
    .then((data) => {
      return data;
    })
    .catch((error) => console.error(error));
};
