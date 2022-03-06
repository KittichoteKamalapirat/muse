import { v4 } from "uuid";
import { User } from "../entities/User";
import { createTypeORMConn } from "../utils/createTypeORMConn";

describe("db tests", () => {
  beforeAll(async () => {
    await createTypeORMConn(); //drop a schema, config in ormconfig for test
  });
  it("create user", async () => {
    const uuid = v4();
    const data = {
      username: "User2",
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
