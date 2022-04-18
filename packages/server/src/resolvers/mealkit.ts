/* eslint-disable class-methods-use-this */
import {
  Arg,
  Ctx,
  FieldResolver,
  Float,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { s3Bucket } from "../constants";
import { Mealkit } from "../entities";
import { MealkitInput, SignedS3Result, SignS3Params } from "../entities/utils";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";
import { s3, s3Params } from "../utils/s3";

@Resolver(Mealkit)
export class MealkitResolver {
  // @Query(() => [Mealkit], { nullable: true })
  // async mealkits(): Promise<Mealkit[] | undefined> {
  //   const mealkits = await Mealkit.find();
  //   return mealkits;
  // }

  @FieldResolver(() => Float)
  reviewAvg(@Root() mealkit: Mealkit): number {
    if (mealkit.reviewsCounter === 0 || mealkit.reviewsSum === 0) {
      return 0;
    }
    return mealkit.reviewsSum / mealkit.reviewsCounter;
  }

  @Query(() => [Mealkit], { nullable: true })
  async mealkits(
    @Arg("postId", () => Int) postId: number
  ): Promise<Mealkit[] | undefined> {
    // const mealkit = await Mealkit.find({ postId });

    const mealkit = await Mealkit.find({
      where: { postId },
      relations: ["creator"],
    });

    return mealkit;
  }

  @Query(() => Mealkit, { nullable: true })
  async mealkit(
    @Arg("id", () => Int) id: number
  ): Promise<Mealkit | Error | undefined> {
    try {
      return Mealkit.findOne({ where: { id }, relations: ["creator"] });
    } catch (error) {
      console.log(error);
      return new Error(error);
    }
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
      postId,
      creatorId: req.session.userId,
    }).save();
    return mealkit;
  }

  @Mutation(() => Mealkit, { nullable: true })
  @UseMiddleware(isAuth) // have to log in to update a Mealkit
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
        id,
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
  @Mutation(() => [SignedS3Result])
  async signMealkitS3(
    @Arg("input", () => [SignS3Params]) input: SignS3Params[]
  ): Promise<SignedS3Result[]> {
    const results: SignedS3Result[] = [];
    input.forEach(async (file) => {
      const s3MealkitParams = s3Params(file.name, file.type);
      const signedRequest = await s3.getSignedUrl("putObject", s3MealkitParams);

      const url = `https://${s3Bucket}.s3.amazonaws.com/${file.name}`;

      results.push({ signedRequest, url });
    });
    return results;
  }
}
