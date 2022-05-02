import { Field, InputType } from "type-graphql";

// For argument

@InputType({ description: "Argument for register user" })
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  phonenumber: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  isCreator?: boolean;
}

export default UsernamePasswordInput;
