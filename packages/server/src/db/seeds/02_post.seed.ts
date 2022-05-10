/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Post, User } from "../../entities";

export default class CreatePosts implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const user = await User.findOne();
    await factory(Post)()
      .map(async (post) => {
        post.creator = user as User;
        return post;
      })
      .createMany(30);
  }
}
