import moment from "moment";
import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { s3Bucket } from "../../constants";
import { s3Params, s3 } from "../s3";

@ObjectType()
class SingleFileSignedS3 {
  @Field()
  signedRequest: string;
  @Field()
  fileUrl: string;
}

@Resolver()
export class S3Resolver {
  @Mutation(() => SingleFileSignedS3)
  async signSingleFileS3(
    @Arg("filename") filename: string,
    @Arg("filetype") filetype: string
  ): Promise<SingleFileSignedS3> {
    const params = s3Params(filename, filetype);

    const signedRequest = await s3.getSignedUrl("putObject", params);

    const fileUrl = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;
    return {
      signedRequest,
      fileUrl,
    };
  }
}
