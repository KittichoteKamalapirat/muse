import { createConnection } from "typeorm";
import { User } from "../entities/User";

describe("db tests", () => {
  it("create user", async () => {
    const connection = await createConnection({
      type: "postgres",
      host: "localhost",
      url: process.env.DATABASE_URL,
      port: 5432,
      entities: [User],
    });
    const user = new User();
    user.username = "User1";
    user.email = "user1@gmail.com";
    await connection.manager.save(user);
  });
});
