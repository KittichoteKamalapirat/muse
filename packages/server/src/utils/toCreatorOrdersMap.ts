import { Field, Int, ObjectType } from "type-graphql";
import { Address, CartItem, Tracking } from "../entities";

//format = array by orderId
//format = array of creator,avatar cartItems
//this page is for users! not creators

// export type MappedCreatorOrders = {
//   orderId: number;
//   username: string;
//   avatar: string;
//   cartItems: CartItem[];
//   address: Address;
//   deliveryFee: number;
//   tracking: Tracking;
// };

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

const reformat = (item: CartItem): MappedCreatorOrders => {
  const cartItemByOrder = {
    orderId: item.orderId,

    username: item.user?.username!,
    avatar: item.user?.avatar!,

    cartItems: [item]!,

    address: item.user?.address!,
    deliveryFee: item.mealkit?.deliveryFee!,
    tracking: item.tracking!,
  };
  return cartItemByOrder;
};

export const toCreatorOrdersMap = (cartItems: CartItem[]) => {
  const mappedArray: MappedCreatorOrders[] = [];

  cartItems.map((item, index) => {
    if (mappedArray.length > 0) {
      const repeatedIndex = mappedArray
        .map((obj) => obj.orderId)
        .indexOf(item.orderId);

      if (repeatedIndex > -1) {
        //same orderId
        mappedArray[repeatedIndex].cartItems.push(item);

        //deadling with delivery Fee

        const currentDeliveryFee = mappedArray[repeatedIndex].deliveryFee;
        const newDeliveryFee = item.mealkit?.deliveryFee!;
        //get the delivery fee from the mealkit with the highest delivery fee
        if (currentDeliveryFee < newDeliveryFee) {
          mappedArray[repeatedIndex].deliveryFee = newDeliveryFee;
        }
      } else {
        // different orderId
        const cartItemByOrder: MappedCreatorOrders = reformat(item);
        mappedArray.push(cartItemByOrder);
      }
    } else {
      const cartItemByOrder: MappedCreatorOrders = reformat(item);
      mappedArray.push(cartItemByOrder);
    }
  });

  return mappedArray;
};
