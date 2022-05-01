import { ObjectType, Field, Int, Float } from "type-graphql";

@ObjectType()
class UserReview {
  @Field(() => Float)
  reviewScore: number;

  @Field(() => Int)
  reviewCounter: number;
}

export default UserReview;
