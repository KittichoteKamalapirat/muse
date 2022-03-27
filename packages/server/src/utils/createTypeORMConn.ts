import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from "typeorm";

export const createTypeORMConn = async () => {
  console.log("about to connect");
  console.log(process.env.NODE_ENV);
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV); //refer to 1.ormconfig.json whether dev or test option 2.NODE_ENV=xxx in package.json
  console.log("got the option");
  console.log({ connectionOptions });
  return createConnection({
    ...connectionOptions,
    url: process.env.DATABASE_URL, //this can't be set in ormconfig due to dynamic value
    name: "default",
  } as any);
};
