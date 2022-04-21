/* eslint-disable class-methods-use-this */
import { Arg, Mutation, Resolver } from "type-graphql";
import { s3Bucket } from "../../constants";
import { SingleFileSignedS3 } from "../../entities/utils";
import { s3, s3Params } from "../s3";

export const signSingleFileS3 = async (name: string, type: string) => {
  const params = s3Params(name, type);
  const signedRequest = await s3.getSignedUrl("putObject", params);

  const fileUrl = `https://${s3Bucket}.s3.amazonaws.com/${name}`;
  return {
    signedRequest,
    fileUrl,
  };
};

@Resolver()
export class S3Resolver {
  @Mutation(() => SingleFileSignedS3)
  async signSingleFileS3(
    @Arg("filename") filename: string,
    @Arg("filetype") filetype: string
  ): Promise<SingleFileSignedS3> {
    return signSingleFileS3(filename, filetype);
  }
}
