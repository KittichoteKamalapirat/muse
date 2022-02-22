import { EditCartItemAmountButton } from "../components/EditCartItemAmount";
import { CartItem, Tracking } from "../generated/graphql";

//format = array of creator,avatar cartItems
//this page is for mainly for users! not creators
export type mappedCartItemsByCreatorResult = {
  creatorId: string;
  creatorName: string;
  avatar: string;
  deliveryFee: number;
  totalByCreator: number;
  cartItems: CartItem[];
  tracking: Tracking;
};

const reformat = (item: CartItem): mappedCartItemsByCreatorResult => {
  const cartItemByOrder = {
    creatorId: item.mealkit?.creatorId,
    creatorName: item.mealkit?.creator?.username,
    avatar: item.mealkit?.creator?.avatar,
    deliveryFee: item.mealkit?.deliveryFee,
    totalByCreator: item.fieldTotal,
    cartItems: [item],
    tracking: item.tracking!,
  };

  return cartItemByOrder;
};

export const toCartItemsByCreatorMap = (cartItems: CartItem[]) => {
  const mappedArray: mappedCartItemsByCreatorResult[] = [];

  cartItems.map((item, index) => {
    if (mappedArray.length > 0) {
      const repeatedIndex = mappedArray
        .map((obj) => obj.creatorName)
        .indexOf(item.mealkit?.creator?.username as string);

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
          currentMealkitFee + item.fieldTotal;
      } else {
        // no repeated one

        const sellerItem = reformat(item);

        mappedArray.push(sellerItem);
      }
    } else {
      const sellerItem = reformat(item);
      mappedArray.push(sellerItem);
    }
  });

  return mappedArray;
};
