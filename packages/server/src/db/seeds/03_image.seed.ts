/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Image, Post } from "../../entities";

export default class CreateImages implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const allPosts = await Post.find();

    for (let i = 0; i < allPosts.length; i += 1) {
      await factory(Image)()
        .map(async (image) => {
          image.post = allPosts[i];
          return image;
        })
        .create();
    }
  }
}
