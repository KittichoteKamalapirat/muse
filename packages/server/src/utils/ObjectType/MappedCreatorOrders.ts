import { ObjectType, Field, Int } from "type-graphql";
import { CartItem, Address, Tracking } from "../../entities";

@ObjectType()
export class MappedCreatorOrders {
  @Field({ nullable: true })
  orderId: number;

  @Field()
  username: string;

  @Field()
  avatar: string;

  @Field(() => [CartItem])
  cartItems: CartItem[];

  @Field(() => Address)
  address: Address;

  @Field(() => Int)
  deliveryFee: number;

  @Field(() => Tracking, { nullable: true })
  tracking: Tracking;
}

export default MappedCreatorOrders;
