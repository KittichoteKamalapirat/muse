import { AllCartItemsQuery } from "../../generated/graphql";

export const adminData = (
  loading: boolean,
  cartItems: AllCartItemsQuery | undefined
) => {
  if (loading) {
    return [];
  }
  return cartItems?.allCartItems.map((cartItem) => {
    return {
      cartItemId: cartItem.id,
      status: cartItem.status,
      bankCode: cartItem.mealkit.creator.paymentInfo?.bankCode,
      bankAccount: cartItem.mealkit.creator.paymentInfo?.bankAccount,
      amount: cartItem.total + cartItem.mealkit.deliveryFee,
    };
  });
};
