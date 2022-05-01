/* eslint-disable class-methods-use-this */
import { Arg, Int, Query, Resolver } from "type-graphql";
import { Image } from "../entities";

@Resolver()
export class ImageResolver {
  @Query(() => Image)
  video(@Arg("postId", () => Int) postId: number): Promise<Image | undefined> {
    return Image.findOne({ where: { postId } });
  }
}
