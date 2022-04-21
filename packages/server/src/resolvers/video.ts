/* eslint-disable class-methods-use-this */
import { Arg, Int, Query, Resolver } from "type-graphql";
import { Video } from "../entities";

// from frontend

@Resolver()
export class VideoResolver {
  @Query(() => Video)
  video(@Arg("postId", () => Int) postId: number): Promise<Video | undefined> {
    return Video.findOne({ where: { postId } });
  }
}
