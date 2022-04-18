import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
class UserReview {
  @Field(() => Int)
  reviewScore: number;

  @Field(() => Int)
  reviewCounter: number;
}

export default UserReview;
