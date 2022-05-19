/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Ingredient, Mealkit, MealkitFile, Post, User } from "../../entities";

export default class CreatePosts implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const user = await User.findOne();
    const ingredients = await factory(Ingredient)().makeMany(3);

    await factory(Post)()
      .map(async (post) => {
        const mealkit = await factory(Mealkit)().make();
        const mealkitFiles = await factory(MealkitFile)().makeMany(3);

        mealkit.creator = user as User;
        mealkit.mealkitFiles = mealkitFiles;

        post.creator = user as User;

        post.ingredients = ingredients;
        post.mealkits = [];
        post.mealkits.push(mealkit);
        return post;
      })
      .createMany(30);
  }
}
