import { createConnection, getConnectionOptions } from "typeorm";

export const createTypeORMConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV); //refer to 1.ormconfig.json whether dev or test option 2.NODE_ENV=xxx in package.json
  return createConnection({ ...connectionOptions, name: "default" });
};
