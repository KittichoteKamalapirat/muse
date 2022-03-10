import { Server } from "http";
import { Connection } from "typeorm";
import { v4 } from "uuid";

import { User } from "../entities/User";
import { startServer } from "../startSever";
import { createTypeORMConn } from "../utils/createTypeORMConn";

let expressServer: Server;
let postgresDb: Connection;

beforeAll(async () => {
  // const conn = await createTypeORMConn(); //drop a schema, config in ormconfig for test
  const serverAndDb = await startServer();
  expressServer = serverAndDb.server;
  postgresDb = serverAndDb.connection;
});

afterAll(async () => {
  await postgresDb.close; //error -> Jest did not exit one second after the test run has completed
  await expressServer.close(); //close express ? close postgres
});

describe("db tests", () => {
  it("create user", async () => {
    const uuid = v4();
    const data = {
      username: "User1",
      email: "user1@gmail.com",
      phonenumber: "0900000000",
      password: "123",
      isCreator: false,
      avatar: `https://avatars.dicebear.com/api/open-peeps/${uuid}.svg`,
    };

    const user = User.create(data);
    console.log(user);

    return user.save();
  });
});
