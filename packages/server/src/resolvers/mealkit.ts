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
import { rollbar } from "../config/initializers/rollbar";
import { s3Bucket } from "../constants";
import { Image, Mealkit, MealkitFile, Post } from "../entities";
import {
  MealkitFileInput,
  MealkitInput,
  SignedS3Result,
  SignS3Params,
} from "../entities/utils";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";
import { s3, s3Params } from "../utils/s3";

@Resolver(Mealkit)
export class MealkitResolver {
  @FieldResolver(() => Float)
  reviewAvg(@Root() mealkit: Mealkit): number {
    if (mealkit.reviewsCounter === 0 || mealkit.reviewsSum === 0) {
      return 0;
    }
    return mealkit.reviewsSum / mealkit.reviewsCounter;
  }

  @FieldResolver(() => MealkitFile)
  thumbnail(@Root() mealkit: Mealkit): MealkitFile {
    return mealkit.mealkitFiles.find((file) =>
      file.fileType.includes("image")
    ) as MealkitFile;
  }

  @Query(() => [Mealkit], { nullable: true })
  async mealkits(
    @Arg("postId", () => Int) postId: number
  ): Promise<Mealkit[] | undefined> {
    return Mealkit.find({
      where: { postId },
      relations: ["creator", "mealkitFiles"],
    });
  }

  @Query(() => Mealkit, { nullable: true })
  async mealkit(
    @Arg("id", () => Int) id: number
  ): Promise<Mealkit | Error | undefined> {
    try {
      return Mealkit.findOne({
        where: { id },
        relations: ["creator", "mealkitFiles"],
      });
    } catch (error) {
      rollbar.log(error);
      return new Error(error);
    }
  }

  @Mutation(() => Mealkit)
  @UseMiddleware(isAuth)
  async createMealkit(
    @Arg("input") input: MealkitInput,
    @Arg("postId", () => Int) postId: number,
    @Arg("mealkitFiles", () => [MealkitFileInput])
    mealkitFiles: MealkitFileInput[],
    @Ctx() { req }: MyContext
  ): Promise<Mealkit> {
    const mealkit = await Mealkit.create({
      ...input,
      postId,
      creatorId: req.session.userId,
    }).save();

    if (
      // has images files -> update MealkitFile (both video and image)
      mealkitFiles.filter((file) => file.fileType.includes("image")).length > 0
    ) {
      mealkitFiles.forEach(async (file) =>
        MealkitFile.update({ id: file.postId }, { mealkitId: mealkit.id })
      );
    } else {
      // if no images (no files at all OR only video files)
      // use post thumbnail instead
      const image = await Image.findOne({ postId });
      MealkitFile.create({
        name: image?.name,
        fileType: image?.fileType,
        url: image?.url,
        mealkitId: mealkit.id,
      }).save();
    }

    return mealkit;
  }

  @Mutation(() => Mealkit, { nullable: true })
  @UseMiddleware(isAuth) // have to log in to update a Mealkit
  async updateMealkit(
    @Arg("input") input: MealkitInput,
    @Arg("fileIds", () => [Int]) fileIds: number[],
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Mealkit | null | undefined> {
    await Mealkit.update({ id, creatorId: req.session.userId }, { ...input });

    // update all Mealkit.fileIds to have mealkitId
    fileIds.forEach(async (fileId) =>
      MealkitFile.update({ id: fileId }, { mealkitId: id })
    );

    // remove existing files which are ont in fileIds

    const allFiles = await MealkitFile.find({ where: { mealkitId: id } });
    const filesToRemove = allFiles.filter((file) => !fileIds.includes(file.id));
    filesToRemove.forEach((file) => MealkitFile.delete(file.id));

    const mealkit = await Mealkit.findOne(id);

    return mealkit;
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
  // TODO remove this? since nobody uses this resolver
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
