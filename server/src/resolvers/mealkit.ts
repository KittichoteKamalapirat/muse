import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { s3Bucket } from "../constants";
import { Mealkit } from "../entities/Mealkit";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";
import { s3, s3Params } from "./post";

@InputType()
class MealkitInput {
  @Field()
  name: string;
  @Field(() => [String])
  items: string[];
  @Field(() => [String])
  images: string[];
  @Field()
  price: number;
  @Field()
  portion: number;
}

@InputType()
export class signS3Params {
  @Field()
  name: string;
  @Field()
  type: string;
}

@ObjectType()
class signedS3Result {
  @Field()
  signedRequest: string;
  @Field()
  url: string;
}

@Resolver()
export class MealkitResolver {
  // @Query(() => [Mealkit], { nullable: true })
  // async mealkits(): Promise<Mealkit[] | undefined> {
  //   const mealkits = await Mealkit.find();
  //   return mealkits;
  // }

  @Query(() => [Mealkit], { nullable: true })
  async mealkits(
    @Arg("postId", () => Int) postId: number
  ): Promise<Mealkit[] | undefined> {
    const mealkit = await Mealkit.find({ postId });
    return mealkit;
  }

  //   @Query(() => Mealkit, { nullable: true })
  //   async myMealkit(
  //     @Arg("id", () => Int) id: number
  //   ): Promise<Mealkit | undefined> {
  //     const mealkit = await Mealkit.findOne(id);
  //     return mealkit;
  //   }

  @Mutation(() => Mealkit)
  @UseMiddleware(isAuth)
  async createMealkit(
    @Arg("input") input: MealkitInput,
    @Arg("postId", () => Int) postId: number,
    @Ctx() { req }: MyContext
  ): Promise<Mealkit> {
    console.log(input);
    const mealkit = await Mealkit.create({
      ...input,
      postId: postId,
      creatorId: req.session.userId,
    }).save();
    return mealkit;
  }

  @Mutation(() => Mealkit, { nullable: true })
  @UseMiddleware(isAuth) //have to log in to update a Mealkit
  async updateMealkit(
    @Arg("input") input: MealkitInput,
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Mealkit | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Mealkit)
      .set(input)
      .where('id = :id and "creatorId" = :creatorId', {
        id: id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();
    console.log({ result });
    return result.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteMealkit(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await Mealkit.delete({ id, creatorId: req.session.userId });
    return true;
  }

  // images for mealkit
  // in Amazon S3 -> save by multiple names and multiple file -> Frontend -> S3  (Loop axios "PUT" through each signed request and name)
  // in my database -> just need the string of URLs -> GraphQL (No need to loop)
  // SignMealkit -> need multiple,front end gives me [{"name": "xxx", "type"" video/mp4"},{"name": "xxx", "type"" video/mp4"},{"name": "xxx", "type"" video/mp4"}]
  // give back ["signedRequest": "xxx", "url": "yyy","signedRequest": "xxx", "url": "yyy","signedRequest": "xxx", "url": "yyy"]
  @Mutation(() => [signedS3Result])
  async signMealkitS3(
    @Arg("input", () => [signS3Params]) input: signS3Params[]
  ): Promise<signedS3Result[]> {
    let results: signedS3Result[] = [];
    input.forEach(async (file) => {
      const s3MealkitParams = s3Params(file.name, file.type);
      const signedRequest = await s3.getSignedUrl("putObject", s3MealkitParams);

      const url = `https://${s3Bucket}.s3.amazonaws.com/${file.name}`;

      results.push({ signedRequest, url });
    });
    return results;
  }
}
