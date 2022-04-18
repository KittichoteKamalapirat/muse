import { InputType, Field } from "type-graphql";

@InputType()
class UserInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  phonenumber: string;

  @Field()
  about?: string;
}

export default UserInput;
