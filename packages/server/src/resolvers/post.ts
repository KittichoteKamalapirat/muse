/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { rollbar } from "../config/initializers/rollbar";
import { Post, Upvote, User } from "../entities";
import { PaginatedPosts } from "../entities/utils";
import { PostInput } from "../entities/utils/post/InputType/PostInput";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";
import getPosts from "../utils/getPosts";

@Resolver(Post)
export class PostResolver {
  // @FieldResolver(() => String)
  // textSnippet(@Root() root: Post) {
  //   return root.text.slice(0, 60);
  // }
  // @FieldResolver(() => User)
  // creator(@Root() post: Post, @Ctx() { userLoader }: MyContext) {
  //   return userLoader.load(post.creatorId);
  // }
  // @FieldResolver(() => Int, { nullable: true })
  // async voteStatus(
  //   @Root() post: Post,
  //   @Ctx() { upvoteLoader, req }: MyContext
  // ) {
  //   if (!req.session.userId) {
  //     return null;
  //   }
  //   // workflow
  //   // upvoteLoader calls createUpvoteLoader -> good
  //   // createUpvoteLoader returns the array in order -> good
  //   // upvoteLoader get the returns from creatUpvoteLoader -> bad
  //   const upvote = await upvoteLoader.load({
  //     postId: post.id,
  //     userId: req.session.userId,
  //   });
  //   return upvote ? upvote.value : null;
  // }
  // @Query(() => PaginatedPosts)
  // @UseMiddleware(isAuth)
  // async votedPosts(
  //   @Arg("limit", () => Int) limit: number,
  //   @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
  //   @Ctx() { req }: MyContext
  // ): Promise<PaginatedPosts> {
  //   const realLimit = Math.min(50, limit);
  //   const realLimitPlusOne = realLimit + 1;
  //   const upvotes = await Upvote.find({
  //     where: { userId: req.session.userId, value: 1 },
  //   });
  //   const upvotedPostIds: number[] = upvotes.map((u) => u.postId);
  //   const posts = await getPosts(cursor, realLimitPlusOne, upvotedPostIds);
  //   const slicedPosts = posts.slice(0, realLimit);
  //   return {
  //     posts: slicedPosts,
  //     hasMore: posts.length === realLimitPlusOne,
  //   };
  // }
  // @Mutation(() => Boolean)
  // @UseMiddleware(isAuth)
  // async vote(
  //   @Arg("postId", () => Int) postId: number,
  //   @Arg("value", () => Int) value: number,
  //   @Ctx() { req }: MyContext
  // ) {
  //   const { userId } = req.session;
  //   const isUpvote = value !== 0;
  //   const realValue = isUpvote ? 1 : -1;
  //   const upvoted = await Upvote.findOne({ where: { postId, userId } });
  //   // the user has voted before and want to change the vote
  //   if (upvoted && upvoted.value !== realValue) {
  //     await getConnection().transaction(async (tm) => {
  //       await tm.query(
  //         `
  //       update upvote
  //       set value = $1
  //       where "postId" = $2 and "userId" = $3
  //       `,
  //         [realValue, postId, userId]
  //       );
  //       await tm.query(
  //         `
  //       update post
  //       set points = points + $1
  //       where id = $2;
  //       `,
  //         [realValue, postId]
  //       ); // different 2 points, if upvoted, then points will be 1, downvoted, points will be -1
  //     });
  //   } else if (!upvoted) {
  //     // has never voted before
  //     await getConnection().transaction(async (tm) => {
  //       await tm.query(
  //         `
  //     insert into upvote ("userId","postId","value")
  //     values ($1,$2,$3);
  //     `,
  //         [userId, postId, 1]
  //       );
  //       await tm.query(
  //         `
  //     update post
  //     set points = points + $1
  //     where id = $2;
  //     `,
  //         [realValue, postId]
  //       );
  //     });
  //   }
  //   return true;
  // }
  // @Query(() => PaginatedPosts)
  // async posts(
  //   @Arg("limit", () => Int) limit: number,
  //   @Arg("cursor", () => String, { nullable: true }) cursor: string | null // when we set something nullable, we also has to set the type String excplicitly
  // ): Promise<PaginatedPosts> {
  //   const realLimit = Math.min(50, limit); // if no limit specified, default is 50
  //   const realLimitPlusOne = realLimit + 1;
  //   const posts = await getPosts(cursor, realLimitPlusOne, null);
  //   const slicedPosts = await posts.slice(0, realLimit);
  //   return {
  //     posts: slicedPosts,
  //     hasMore: posts.length === realLimitPlusOne,
  //     // hasMore: true
  //   };
  // }
  // @Query(() => [Post])
  // async postsByCreator(
  //   @Arg("userId") userId: string
  // ): Promise<Post[] | undefined> {
  //   const posts = await Post.find({
  //     where: { creatorId: userId },
  //     relations: ["mealkits", "mealkits.mealkitFiles", "video", "image"],
  //   });
  //   return posts;
  // }
  // @Query(() => Post, { nullable: true })
  // // the id after immediately after arg is for when we query in graphql
  // // the id: number is for findOne(id)
  // async post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
  //   const post = await Post.findOne({
  //     where: { id },
  //     relations: ["video", "image", "mealkits"], // for some reasons, no need to spicify creator
  //   });
  //   return post;
  // }
  // // craete a post
  // @Mutation(() => Post)
  // @UseMiddleware(isAuth)
  // async createPost(
  //   @Arg("input") input: PostInput,
  //   @Arg("videoId", () => Int) videoId: number,
  //   @Arg("imageId", () => Int) imageId: number,
  //   @Ctx() { req }: MyContext
  // ): Promise<Post | Error> {
  //   try {
  //     const post = await Post.create({
  //       ...input,
  //       creatorId: req.session.userId,
  //     }).save();
  //     return post;
  //   } catch (error) {
  //     rollbar.log(error);
  //     throw new Error("cannot create a post");
  //   }
  // }
  // // update a post
  // @Mutation(() => Post, { nullable: true })
  // @UseMiddleware(isAuth) // have to log in to update a post
  // async updatePost(
  //   @Arg("input") input: PostInput,
  //   @Arg("id", () => Int) id: number,
  //   @Ctx() { req }: MyContext
  // ): Promise<Post | Error | undefined> {
  //   try {
  //     await Post.update({ id, creatorId: req.session.userId }, { ...input });
  //     const post = await Post.findOne(id);
  //     return post;
  //   } catch (error) {
  //     rollbar.error("no post found");
  //     return new Error("no post");
  //   }
  // }
  // //   delete post
  // @Mutation(() => Boolean)
  // @UseMiddleware(isAuth) // firstly, only auth user
  // async deletePost(
  //   @Arg("id", () => Int) id: number,
  //   @Ctx() { req }: MyContext
  // ): Promise<boolean> {
  //   await Post.delete({ id, creatorId: req.session.userId });
  //   return true;
  // }
  // @UseMiddleware(isAuth)
  // @Mutation(() => Boolean)
  // async toggleIsPublished(
  //   @Arg("id", () => Int) id: number,
  //   @Arg("isPublished") isPublished: boolean
  // ) {
  //   await Post.update(
  //     { id },
  //     {
  //       isPublished,
  //     }
  //   );
  //   return true;
  // }
}
