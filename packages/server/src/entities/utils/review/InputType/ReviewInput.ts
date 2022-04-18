import { InputType, Field, Int } from "type-graphql";

@InputType()
class ReviewInput {
  @Field(() => Int)
  score: number;

  @Field()
  title: string;

  @Field()
  text: string;
}

export default ReviewInput;
