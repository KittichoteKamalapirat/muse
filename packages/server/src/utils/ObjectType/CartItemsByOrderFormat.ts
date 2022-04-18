import { Field, ObjectType } from "type-graphql";
import { CartItemsByCreatorFormat } from ".";

@ObjectType()
class CartItemsByOrderFormat {
  @Field()
  orderId: number;

  @Field()
  grossOrder: number;

  @Field()
  paymentId: number;

  @Field({ nullable: true })
  trackingId: number;

  @Field(() => [CartItemsByCreatorFormat])
  byCreator: CartItemsByCreatorFormat[];
}

export default CartItemsByOrderFormat;
