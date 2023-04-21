const handleEnv = () => {
  const { DB_PASSWORD, DB_URI, DB_USERNAME } = process.env;
  if (DB_URI && DB_USERNAME && DB_PASSWORD) {
    const dbProperties = {
      username: DB_USERNAME,
      password: DB_PASSWORD,
      uri: DB_URI,
    };
    return dbProperties;
  } else {
    throw Error(
      "Seems theres a problem with your env. Reach out to a teammate."
    );
  }
};

const validDbParams = handleEnv();

export const databaseConfig = {
  db: validDbParams,
};
