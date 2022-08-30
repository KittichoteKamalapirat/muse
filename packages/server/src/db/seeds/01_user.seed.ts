/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { User } from "../../entities";

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // create user for shane
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("chain123", salt);
    const uuid = v4();

    const userData = {
      username: "kittishane",
      email: "kittichoteshane@gmail.com",
      phoneNumber: "0961489046",
      isCreator: true,
      avatar: `https://avatars.dicebear.com/api/open-peeps/${uuid}.svg`,
      password: hash,
    };

    User.create(userData).save();

    await factory(User)().createMany(2);
  }
}
