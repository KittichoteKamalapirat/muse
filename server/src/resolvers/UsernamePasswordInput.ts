import { Field, InputType } from "type-graphql";

// For argument

@InputType({ description: "Argument for register user" })
export class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  phonenumber: string;

  @Field({ nullable: true })
  password: string;
}
