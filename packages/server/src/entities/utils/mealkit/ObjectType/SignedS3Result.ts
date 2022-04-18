import { ObjectType, Field } from "type-graphql";

@ObjectType()
class SignedS3Result {
  @Field()
  signedRequest: string;

  @Field()
  url: string;
}

export default SignedS3Result;
