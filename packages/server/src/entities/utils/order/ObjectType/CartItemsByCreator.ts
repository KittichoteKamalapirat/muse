import { ObjectType, Field } from "type-graphql";

@ObjectType()
class CartItemsByCreator {
  @Field()
  creatorId: string;

  @Field()
  deliveryFee: number;

  @Field()
  mealkitsFee: number;
}

export default CartItemsByCreator;
