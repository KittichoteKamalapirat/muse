import { EditCartItemAmountButton } from "../components/EditCartItemAmount";
import { CartItem } from "../generated/graphql";

export type mappedResult = {
  creatorId: string;
  creatorName: string;
  avatar: string;
  deliveryFee: number;
  totalByCreator: number;
  cartItems: CartItem[];
};

export const toCartItemsByCreatorMap = (cartItems: CartItem[]) => {
  const mappedArray: mappedResult[] = [];

  cartItems.map((item, index) => {
    if (mappedArray.length > 0) {
      const repeatedIndex = mappedArray
        .map((obj) => obj.creatorName)
        .indexOf(item.mealkit?.creator?.username as string);
      console.log({ repeatedIndex });

      if (repeatedIndex > -1) {
        //same mealkit from a creator

        mappedArray[repeatedIndex].cartItems.push(item);
        const currentDeliveryFee = mappedArray[repeatedIndex].deliveryFee;
        const newDeliveryFee = item.mealkit?.deliveryFee!;
        //get the delivery fee from the mealkit with the highest delivery fee
        if (currentDeliveryFee < newDeliveryFee) {
          mappedArray[repeatedIndex].deliveryFee = newDeliveryFee;
        }

        const currentMealkitFee = mappedArray[repeatedIndex].totalByCreator;
        mappedArray[repeatedIndex].totalByCreator =
          currentMealkitFee + item.total;
      } else {
        // no repeated one
        console.log("hi");
        const sellerItem: mappedResult = {
          creatorId: item.mealkit?.creatorId as string,
          avatar: item.mealkit?.creator?.avatar as string,
          creatorName: item.mealkit?.creator?.username as string,
          deliveryFee: item.mealkit?.deliveryFee!,
          totalByCreator: item.total,
          cartItems: [item],
        };
        mappedArray.push(sellerItem);
      }
    } else {
      console.log("hi2");
      const sellerItem: mappedResult = {
        creatorId: item.mealkit?.creatorId as string,
        avatar: item.mealkit?.creator?.avatar as string,
        creatorName: item.mealkit?.creator?.username as string,
        deliveryFee: item.mealkit?.deliveryFee!,
        totalByCreator: item.total,
        cartItems: [item],
      };
      mappedArray.push(sellerItem);
    }
  });

  return mappedArray;
};
