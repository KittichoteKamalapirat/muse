import { createConnection, getConnectionOptions } from "typeorm";

export const createTypeORMConn = async () => {
  const connectionOptions = process.env.NODE_ENV
    ? await getConnectionOptions(process.env.NODE_ENV)
    : await getConnectionOptions("development"); // refer to 1.ormconfig.json whether dev or test option 2.NODE_ENV=xxx in package.json

  return createConnection({
    ...connectionOptions,
    url: process.env.DATABASE_URL, // this can't be set in ormconfig due to dynamic value
    name: "default",
  } as any);
};
