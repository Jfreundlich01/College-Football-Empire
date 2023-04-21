import neo4j from "neo4j-driver";
import { databaseConfig } from "./config";

export const initDriver = (uri: string, username: string, password: string) => {
  const driver = neo4j.driver(uri, neo4j.auth.basic(username, password), {
    disableLosslessIntegers: true,
  });
  return driver;
};

export const neo4jDriver = initDriver(
  databaseConfig.db.uri,
  databaseConfig.db.username,
  databaseConfig.db.password
);
