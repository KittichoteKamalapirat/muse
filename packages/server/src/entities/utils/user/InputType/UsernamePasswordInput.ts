import { Field, InputType } from "type-graphql";

// For argument

@InputType({ description: "Argument for register user" })
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  email: string;

  // @Field()
  // phoneNumber: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  isMusician?: boolean;
}

export default UsernamePasswordInput;
