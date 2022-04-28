const creatorReceivedPaymentInApp = (
  quantity: number,
  mealkitName: string,
  username: string
) =>
  `${username} has completed a payment for ${quantity} ${mealkitName}${
    quantity > 1 ? "s" : ""
  }. Please deliver to ${username} as soon as possible`;

export default creatorReceivedPaymentInApp;
