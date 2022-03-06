import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from "typeorm";

export const createTypeORMConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV); //refer to 1.ormconfig.json whether dev or test option 2.NODE_ENV=xxx in package.json

  let db_url = "";
  switch (process.env.NODE_ENV) {
    case "test":
      db_url = "postgresql://postgres:chain123@localhost:5432/cookknowdb_test";
      break;

    case "development":
      db_url = process.env.DATABASE_URL; //from .env
      break;

    case "production":
      db_url = process.env.DATABASE_URL; //from dokku
      break;
    default:
      db_url = process.env.DATABASE_URL;
  }
  return createConnection({
    ...connectionOptions,
    url: db_url || process.env.DATABASE_URL,
    name: "default",
  } as any);
};
