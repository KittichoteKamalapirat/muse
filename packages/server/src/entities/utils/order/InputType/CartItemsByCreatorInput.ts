import { InputType, Field } from "type-graphql";

@InputType()
class CartItemsByCreatorInput {
  @Field()
  creatorId: string;

  @Field()
  deliveryFee: number;

  @Field()
  mealkitsFee: number;
}

export default CartItemsByCreatorInput;
