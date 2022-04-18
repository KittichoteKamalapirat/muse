import { ObjectType, Field, Int } from "type-graphql";
import { CartItem } from "../../entities";

@ObjectType()
class CartItemsByCreatorFormat {
  @Field()
  creatorId: string;

  @Field()
  creatorName: string;

  @Field()
  avatar: string;

  @Field(() => Int)
  deliveryFee: number;

  @Field()
  totalByCreator: number;

  @Field(() => [CartItem])
  cartItems: CartItem[];

  // @Field(() => Tracking, { nullable: true })
  // trackingId: Tracking;
}

export default CartItemsByCreatorFormat;
