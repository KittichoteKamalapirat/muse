import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Post, Video } from "../../entities";

/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

// for some reasons, have to use factories, can't use like Video.create
export default class CreateVideos implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const allPosts = await Post.find();
    for (let i = 0; i < allPosts.length; i += 1) {
      await factory(Video)()
        .map(async (video) => {
          video.post = allPosts[i];
          return video;
        })
        .create();
    }
  }
}
