import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Follow } from "../entities/Follow";
import { User } from "../entities/User";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";

@Resolver(Follow)
export class FollowResolver {
  @UseMiddleware(isAuth)
  @Query(() => [Follow])
  async followers(@Arg("userId") userId: string) {
    const followers = await Follow.find({
      where: { userId: userId },
      relations: ["user", "follower"],
    });
    return followers;
  }

  @Query(() => [Follow])
  async following(@Arg("userId") userId: string) {
    const followers = await Follow.find({ where: { followerId: userId } });
    return followers;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async toggleFollow(
    @Ctx() { req }: MyContext,
    @Arg("targetUserId") targetUserId: string
  ) {
    const isFollowing = await Follow.findOne({
      where: { userId: targetUserId, followerId: req.session.userId },
    });
    const user = await User.findOne(targetUserId);

    // if not already follow -> follow
    if (!isFollowing) {
      await Follow.create({
        userId: targetUserId,
        followerId: req.session.userId,
      }).save();

      if (user) {
        await User.update(
          { id: targetUserId },
          {
            followerNum: user?.followerNum + 1,
          }
        );
      }

      return true;
    } else {
      Follow.delete({ userId: targetUserId, followerId: req.session.userId });
      if (user) {
        await User.update(
          { id: targetUserId },
          {
            followerNum: user?.followerNum - 1,
          }
        );
      }
      return true;
    }
  }
}
