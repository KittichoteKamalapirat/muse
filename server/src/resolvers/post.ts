import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entities/Post";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    //   @Ctx() ctx: MyContext
    return await Post.find();
  }

  //   @Query(() => Post)
  //   post(@Arg("id", () => Int) id: number) {}

  @Query(() => Post, { nullable: true })
  //   the id after immediately after arg is for when we query in graphql
  // the id: number is for findOne(id)
  async post(@Arg("id") id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  // craete a post
  @Mutation(() => Post)
  //   the id after immediately after arg is for when we query in graphql
  // the id: number is for findOne(id)
  async createPost(
    @Arg("title") title: string,
    @Arg("body", { nullable: true }) body: string,
    @Arg("videoUrl") videoUrl: string
  ): Promise<Post | undefined> {
    // 2 sql queries one to insert and one to select
    return Post.create({ title, body, videoUrl }).save();
  }

  // update a post
  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", { nullable: true }) title: string,
    @Arg("body", { nullable: true }) body: string,
    @Arg("videoUrl", { nullable: true }) videoUrl: string
  ): Promise<Post | null | undefined> {
    const post = await Post.findOne(id);
    if (!post) {
      return null;
    }

    if (
      typeof title !== "undefined" ||
      typeof body !== "undefined" ||
      typeof videoUrl !== "undefined"
    ) {
      post.title = title || post.title;
      post.body = body || post.body;
      post.videoUrl = videoUrl || post.videoUrl;
      await Post.update({ id }, post);
    }

    const newPost = await Post.findOne(id);
    return newPost;
  }

  //   delete post

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number): Promise<boolean> {
    await Post.delete(id);
    return true;
  }
}
