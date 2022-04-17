import { InputType, Field, Int } from "type-graphql";

@InputType()
class TrackingInput {
  @Field(() => [Int])
  cartItemIds: number[];

  @Field()
  trackingNo: string;

  @Field()
  courier: string;
}

export default TrackingInput;
