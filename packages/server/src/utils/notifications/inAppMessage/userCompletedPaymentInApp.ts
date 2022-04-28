const userCompletedPaymentInApp = (quantity: number, mealkitName: string) =>
  `You have completed the payment for ${quantity} ${mealkitName}${
    quantity > 1 ? "s" : ""
  }. We will let you know when the seller has delivered your order`;

export default userCompletedPaymentInApp;
