import { InputType, Field } from "type-graphql";

@InputType()
class SignS3Params {
  @Field()
  name: string;

  @Field()
  type: string;
}
export default SignS3Params;
