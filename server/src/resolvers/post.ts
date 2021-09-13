import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Post } from "../entities/Post";
import { getConnection } from "typeorm";
import { rootCertificates } from "tls";
import { Upvote } from "../entities/Upvote";
import { tmpdir } from "os";
import { User } from "../entities/User";
import { error } from "console";

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  text: string;
  @Field()
  videoUrl: string;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];
  @Field()
  hasMore: boolean;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() root: Post) {
    return root.text.slice(0, 50);
  }

  @FieldResolver(() => User)
  creator(@Root() post: Post, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(post.creatorId);
  }

  @FieldResolver(() => Int, { nullable: true })
  async voteStatus(
    @Root() post: Post,
    @Ctx() { upvoteLoader, req }: MyContext
  ) {
    if (!req.session.userId) {
      return null;
    }

    // workflow
    // upvoteLoader calls createUpvoteLoader -> good
    // createUpvoteLoader returns the array in order -> good
    // upvoteLoader get the returns from creatUpvoteLoader -> bad

    const upvote = await upvoteLoader.load({
      postId: post.id,
      userId: req.session.userId,
    });

    console.log(`post.id: ${post.id}`);
    console.log(`userId: ${req.session.userId}`);
    console.log(`upvoteValue: ${upvote}`);

    return upvote ? upvote.value : null;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth) //to protect the routh
  async vote(
    @Arg("postId", () => Int) postId: number,
    @Arg("value", () => Int) value: number,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session; //userId = req.session.userId
    const isUpvote = value !== -1; //happen to pass in valua = 12 -> make it 1 or -1, -12 will be 1 anyway
    const realValue = isUpvote ? 1 : -1;

    const upvoted = await Upvote.findOne({ where: { postId, userId } });

    // the user has voted before and want to change the vote
    if (upvoted && upvoted.value !== realValue) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
        update upvote 
        set value = $1
        where "postId" = $2 and "userId" = $3
        `,
          [realValue, postId, userId]
        );

        await tm.query(
          `
        update post
        set points = points + $1
        where id = $2;
        `,
          [2 * realValue, postId]
        ); //different 2 points, if upvoted, then points will be 1, downvoted, points will be -1
      });
    } else if (!upvoted) {
      // has never voted before
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
      insert into upvote ("userId","postId","value")
      values ($1,$2,$3);
      `,
          [userId, postId, realValue]
        );
        await tm.query(
          `
      update post
      set points = points + $1
      where id = $2;

      `,
          [realValue, postId]
        );
      });
    }

    return true;
  }

  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int) limit: number, //be defalt number -> Float in graphql
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null, //when we sset something nullable, we also has to set the type String excplicitly
    @Ctx() { req }: MyContext
  ): Promise<PaginatedPosts> {
    // return await Post.find(); //will use query builder instead when complex query
    const realLimit = Math.min(50, limit); //if no limit specified, default is 50
    const realLimitPlusOne = realLimit + 1;

    // console.log(`user is ${req.session.userId}`);

    const replacements: any[] = [realLimitPlusOne];
    // console.log(`1 repalcements length:${replacements.length}`);

    // console.log(`2 repalcements length:${replacements.length}`);

    // if there is cursor -> cursorIndex =
    // if there is NO cursor -> cursorIndex = 3

    if (req.session.userId) {
      replacements.push(req.session.userId);
    }

    let cursorIndex = 3;
    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
      cursorIndex = replacements.length;
    }

    // console.log(`cursurIndex: ${cursorIndex}`);
    // const posts = await getConnection().query(
    //   `
    // select p.*
    // from post p
    // ${cursor ? `where p."createdAt" < $2` : ""}
    // order by p."createdAt" DESC
    // limit $1
    // `,
    //   replacements
    // );

    // json_build_object(
    //   'id', u.id,
    //   'username', u.username,
    //   'email', u.email,
    //   'createdAt', u."createdAt",
    //   'updatedAt', u."updatedAt",
    // ) creator,

    // inner join public.user u on u.id = p."creatorId"

    const posts = await getConnection().query(
      `
      select p.*,
      ${
        req.session.userId
          ? '(select value from upvote where "userId" = $2 and "postId" = p.id) "voteStatus"'
          : 'null as "voteStatus"'
      }
      from post p
    
      ${cursor ? `where p."createdAt" < $${cursorIndex}` : ""}
      order by p."createdAt" DESC
      limit $1
      `,
      replacements
    );

    //   `
    // select p.*,
    // ${
    //   req.session.userId
    //     ? '(select value from upvote where "userId" = $2 and "postId" = p.id) "voteStatus"'
    //     : 'null as "voteStatus"'
    // }
    // from post p

    // ${cursor ? `where p."createdAt" < $${cursorIndex}` : ""}
    // order by p."createdAt" DESC
    // limit $1
    // `,
    //   replacements
    // );

    // const qb = getConnection()
    //   .getRepository(Post)
    //   .createQueryBuilder("post") //alias
    //   .orderBy('"createdAt"', "DESC") //two quotes because typeorm auto convert to createat which is not what we want
    //   .take(realLimitPlusOne);

    // if (cursor) {
    //   // have to turn to 1) turn a string to an int 2) make ita date
    //   qb.where('"createdAt" < :cursor', { cursor: new Date(parseInt(cursor)) });

    //   // basically we're saying get the most recent {number} posts which are older than createdAt
    // }

    // const posts = await qb.getMany();
    const slicedPosts = posts.slice(0, realLimit);

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
    };
  }

  //   @Query(() => Post)
  //   post(@Arg("id", () => Int) id: number) {}

  @Query(() => Post, { nullable: true })
  //   the id after immediately after arg is for when we query in graphql
  // the id: number is for findOne(id)
  async post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
    //be default id: number -> Float for graphql, we want int
    return Post.findOne(id); //urql will write the join for us (thanks to what we define in Schema, many to one thingy)
  }

  // craete a post
  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  //   the id after immediately after arg is for when we query in graphql
  // the id: number is for findOne(id)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: MyContext
  ): // @Arg("title") title: string,
  // @Arg("body", { nullable: true }) body: string,
  // @Arg("videoUrl") videoUrl: string
  Promise<Post> {
    // 2 sql queries one to insert and one to select
    return Post.create({ ...input, creatorId: req.session.userId }).save();
  }

  // update a post
  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(isAuth) //have to log in to update a post
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("title") title: string,
    @Arg("text") text: string,
    @Arg("videoUrl") videoUrl: string,
    @Ctx() { req }: MyContext
  ): Promise<Post | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Post)
      .set({ title, text, videoUrl })
      .where('id = :id and "creatorId" = :creatorId', {
        id: id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();
    // console.log(result);
    // console.log("result", result.raw[0]);
    return result.raw[0];
  }

  //   delete post

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth) //firstly, only auth user
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    //only the owner can delete her post

    // Not casecade way
    // const post = await Post.findOne(id)
    // if(!post){
    //   return false
    // }

    // if(post.creatorId !== req.session.userId ){
    //   throw new Error('not authorized')
    // }
    // await Upvote.delete({postId: id})
    // await Post.delete({id: id})

    await Post.delete({ id: id, creatorId: req.session.userId });
    return true;
  }
}
