import { ObjectType, Field } from "type-graphql";

@ObjectType()
class SingleFileSignedS3 {
  @Field()
  signedRequest: string;

  @Field()
  fileUrl: string;
}

export default SingleFileSignedS3;
