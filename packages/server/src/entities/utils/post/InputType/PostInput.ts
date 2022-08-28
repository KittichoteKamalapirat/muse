import { InputType, Field } from "type-graphql";

@InputType()
export class PostInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  text: string;

  @Field(() => [String], { nullable: true })
  instruction: string[];

  @Field({ nullable: true })
  portion: number;

  @Field(() => [String], { nullable: true })
  advice: string[];
}

export default PostInput;
