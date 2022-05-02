import { createConnection, getConnectionOptions } from "typeorm";

export const createTypeORMConn = async (nodeEnv?: string) => {
  // can't access process.env.NODE_ENV somehow, but .DATABASE_URL is fine

  const connectionOptions = nodeEnv
    ? await getConnectionOptions(nodeEnv)
    : await getConnectionOptions("development"); // refer to 1.ormconfig.json whether dev or test option 2.NODE_ENV=xxx in package.json

  return createConnection({
    ...connectionOptions,
    url: process.env.DATABASE_URL, // this can't be set in ormconfig due to dynamic value
    name: "default",
  } as any);
};
