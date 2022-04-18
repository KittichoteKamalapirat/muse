import { CartItem } from "../entities";
import { CartItemsByCreatorFormat, CartItemsByOrderFormat } from "./ObjectType";

// format = array of creator,avatar cartItems

// this page is for mainly for users! not creators

// format
// [
//     {order1: {
//         creator1: {}

// }
//         creator2: {}
//     }},
//     {order2}.
//     {order3}
// ]

export const reformatByOrder = (
  item: CartItem,
  byCreator: CartItemsByCreatorFormat,
  grossOrder: number
): CartItemsByOrderFormat => {
  const byOrder = {
    orderId: item.orderId,
    grossOrder,
    byCreator: [byCreator],
    paymentId: item.order.paymentId,
    trackingId: item.trackingId,
  };

  return byOrder;
};

export const reformatByCreator = (item: CartItem): CartItemsByCreatorFormat => {
  const cartItemByOrder = {
    orderId: item.orderId,
    creatorId: item.mealkit?.creatorId,
    creatorName: item.mealkit?.creator?.username,
    avatar: item.mealkit?.creator?.avatar,
    deliveryFee: item.mealkit?.deliveryFee,
    totalByCreator: item.total(),
    cartItems: [item],
    trackingId: item.trackingId,
  };

  return cartItemByOrder;
};

export const toUserOrdersMap = (cartItems: CartItem[]) => {
  const mappedArray: CartItemsByOrderFormat[] = [];

  cartItems.forEach((item) => {
    //   check whether it's the same orderId
    if (mappedArray.length > 0) {
      const repeatedOrderIndex = mappedArray
        .map((obj) => obj.orderId)
        .indexOf(item.orderId);

      if (repeatedOrderIndex !== -1) {
        // same orderId and same creator

        const currentGross = mappedArray[repeatedOrderIndex].grossOrder;

        const byCreatorArray = mappedArray[repeatedOrderIndex].byCreator;
        const repeatedCreatorIndex = byCreatorArray
          .map((byCreator) => byCreator.creatorId)
          .indexOf(item.mealkit.creatorId);

        // same cartItem from a same creator (same order)
        if (repeatedCreatorIndex !== -1) {
          mappedArray[repeatedOrderIndex].byCreator[
            repeatedCreatorIndex
          ].cartItems.push(item);

          const currentDeliveryFee =
            mappedArray[repeatedOrderIndex].byCreator[repeatedCreatorIndex]
              .deliveryFee;

          const newDeliveryFee = item.mealkit?.deliveryFee!;

          // get the delivery fee from the mealkit with the highest delivery fee
          if (currentDeliveryFee < newDeliveryFee) {
            mappedArray[repeatedOrderIndex].byCreator[
              repeatedCreatorIndex
            ].deliveryFee = newDeliveryFee;

            // update gross order
            mappedArray[repeatedOrderIndex].grossOrder =
              currentGross +
              item.total() +
              Math.abs(currentDeliveryFee - newDeliveryFee);
          } else {
            // update gross order
            mappedArray[repeatedOrderIndex].grossOrder =
              currentGross + item.total();
          }
          const currentMealkitFee =
            mappedArray[repeatedOrderIndex].byCreator[repeatedCreatorIndex]
              .totalByCreator;
          console.log({ currentMealkitFee });

          mappedArray[repeatedOrderIndex].byCreator[
            repeatedCreatorIndex
          ].totalByCreator = currentMealkitFee + item.total();
        } else {
          // same orderId but different creator
          mappedArray[repeatedOrderIndex].byCreator.push(
            reformatByCreator(item)
          );

          mappedArray[repeatedOrderIndex].grossOrder =
            currentGross + item.total() + item.mealkit.deliveryFee;
        }
      } else {
        // different orderId
        const firstGrossOrder = item.total() + item.mealkit.deliveryFee;
        const byCreator = reformatByCreator(item);
        const byOrder = reformatByOrder(item, byCreator, firstGrossOrder);

        mappedArray.push(byOrder);
      }
    } else {
      // first item
      const firstGrossOrder = item.total() + item.mealkit.deliveryFee;
      const byCreator = reformatByCreator(item);
      const byOrder = reformatByOrder(item, byCreator, firstGrossOrder);

      mappedArray.push(byOrder);
    }
  });

  return mappedArray;
};
