import { ObjectType, Field } from "type-graphql";

@ObjectType()
class SignedS3 {
  @Field()
  signedRequest: string;

  @Field()
  url: string;
}

export default SignedS3;
