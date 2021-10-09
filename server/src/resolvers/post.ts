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
import { Upvote } from "../entities/Upvote";
import { User } from "../entities/User";
import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  s3Bucket,
  AWS_REGION,
} from "../constants";
import aws from "aws-sdk";

export const s3 = new aws.S3({
  signatureVersion: "v4",
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

export const s3Params = (key: string, contentType: string) => {
  return {
    Bucket: s3Bucket,
    Key: key,
    Expires: 60, //how to we have to send the request after we create the url (seconds)
    ContentType: contentType,
    // ACL: "public-read", //this thing cause error somehow !!!!!
  };
};

@InputType()
export class signS3Params {
  @Field()
  name: string;
  @Field()
  type: string;
}

@InputType()
export class IngredientInput {
  @Field()
  ingredient: string;
  @Field()
  amount: string;
  @Field()
  unit: string;
}

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  text: string;
  @Field(() => [String])
  instruction: string[];
  @Field()
  cooktime: string;
  @Field()
  portion: number;
  @Field(() => [String])
  advice: string[];
  @Field()
  videoUrl: string;
  @Field()
  thumbnailUrl: string;
  @Field(() => [IngredientInput])
  ingredients: IngredientInput[];
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];
  @Field()
  hasMore: boolean;
}

@ObjectType()
class PostSignedS3 {
  @Field()
  videoSignedRequest: string;
  @Field()
  thumbnailSignedRequest: string;
  @Field()
  videoUrl: string;
  @Field()
  thumbnailUrl: string;
}

@ObjectType()
class SignedS3 {
  @Field()
  signedRequest: string;
  @Field()
  url: string;
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

    return upvote ? upvote.value : null;
  }

  @Query(() => PaginatedPosts)
  @UseMiddleware(isAuth)
  async votedPosts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;
    const replacements: any[] = [realLimitPlusOne];
    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }
    const upvoted = await Upvote.find({
      where: { userId: req.session.userId },
    });

    const upvotedPostIds: number[] = [];

    upvoted.forEach((upvoted) => {
      upvotedPostIds.push(upvoted.postId);
    });
    const posts = await getConnection().query(
      `
      select p.*
      from post p
      ${
        cursor
          ? `where (p."createdAt" < $2) AND (p.id IN (${upvotedPostIds}))`
          : ""
      }

      order by p."createdAt" DESC 
      limit $1
      `,
      replacements
    );
    const slicedPosts = posts.slice(0, realLimit);
    return {
      posts: slicedPosts,
      hasMore: posts.length === realLimitPlusOne,
    };
  }

  // to provide the return type.
  // Since the method is async, the reflection metadata system shows the return type as a Promise,
  // so we have to add the decorator's parameter as returns => [Recipe] to declare it resolves to an array of Recipe object types.
  @Mutation(() => Boolean) //return Boolean -> vote returns boolean vote is an argument for Mutation()?
  @UseMiddleware(isAuth) //to protect the routh
  async vote(
    @Arg("postId", () => Int) postId: number,
    @Arg("value", () => Int) value: number,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session; //userId = req.session.userId
    const isUpvote = value !== 0; //happen to pass in value = 12 -> make it 1 or -1, -12 will be 1 anyway
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
          [realValue, postId]
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
          [userId, postId, 1]
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
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null //when we sset something nullable, we also has to set the type String excplicitly
  ): Promise<PaginatedPosts> {
    // return await Post.find(); //will use query builder instead when complex query
    const realLimit = Math.min(50, limit); //if no limit specified, default is 50
    const realLimitPlusOne = realLimit + 1;
    const replacements: any[] = [realLimitPlusOne];

    let cursorIndex = 3;
    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
      // cursorIndex = replacements.length;
    }

    const posts = await getConnection().query(
      `
      select p.*
      from post p
      ${cursor ? `where p."createdAt" < $2` : ""}
      order by p."createdAt" DESC
      limit $1
      `,
      replacements
    );
    console.log(posts);

    const slicedPosts = posts.slice(0, realLimit);

    return {
      posts: slicedPosts,
      hasMore: posts.length === realLimitPlusOne,
      // hasMore: true
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
    @Arg("input") input: PostInput,
    @Arg("id", () => Int) id: number,
    // @Arg("title") title: string,
    // @Arg("text") text: string,
    // @Arg("videoUrl") videoUrl: string,
    // @Arg("ingredients", () => [IngredientInput]) ingredients: IngredientInput[],
    @Ctx() { req }: MyContext
  ): Promise<Post | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Post)
      .set(input)
      .where('id = :id and "creatorId" = :creatorId', {
        id: id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();
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

  @Mutation(() => PostSignedS3)
  async signS3(
    @Arg("videoname") videoname: string,
    @Arg("thumbnailname") thumbnailname: string,
    @Arg("videoFiletype") videoFiletype: string,
    @Arg("thumbnailFiletype") thumbnailFiletype: string
  ): Promise<PostSignedS3> {
    const s3VideoParams = s3Params(videoname, videoFiletype);
    const s3ThumbnailParams = s3Params(thumbnailname, thumbnailFiletype);

    const videoSignedRequest = await s3.getSignedUrl(
      "putObject",
      s3VideoParams
    );
    const thumbnailSignedRequest = await s3.getSignedUrl(
      "putObject",
      s3ThumbnailParams
    );

    const videoUrl = `https://${s3Bucket}.s3.amazonaws.com/${videoname}`;
    const thumbnailUrl = `https://${s3Bucket}.s3.amazonaws.com/${thumbnailname}`;
    return {
      videoSignedRequest,
      thumbnailSignedRequest,
      videoUrl,
      thumbnailUrl,
    };
  }

  @Mutation(() => SignedS3)
  async signAvatarS3(
    @Arg("name") name: string,
    @Arg("filetype") filetype: string
  ): Promise<SignedS3> {
    const s3AvatarParams = s3Params(name, filetype);
    const signedRequest = await s3.getSignedUrl("putObject", s3AvatarParams);

    const url = `https://${s3Bucket}.s3.amazonaws.com/${name}`;
    return {
      signedRequest,
      url,
    };
  }
}
