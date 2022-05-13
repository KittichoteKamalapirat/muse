/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Ingredient, Post, User } from "../../entities";

export default class CreatePosts implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const user = await User.findOne();
    const ingredients = await factory(Ingredient)().makeMany(3);
    console.log(ingredients);
    await factory(Post)()
      .map(async (post) => {
        post.creator = user as User;
        post.ingredients = ingredients;
        return post;
      })
      .createMany(30);
  }
}
