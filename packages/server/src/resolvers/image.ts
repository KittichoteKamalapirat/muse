/* eslint-disable class-methods-use-this */
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Image } from "../entities";

@Resolver()
export class ImageResolver {
  @Query(() => Image)
  video(
    @Arg("postId", () => Int) postId: number
    // @Ctx() { req }: MyContext
  ): Promise<Image | undefined> {
    return Image.findOne({ where: { postId } });
  }

  //   @Mutation(() => Image)
}
