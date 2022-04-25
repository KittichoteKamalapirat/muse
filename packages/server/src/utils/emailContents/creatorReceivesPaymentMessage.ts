const creatorReceivesPaymentMessage = (
  quantity: number,
  mealkitName: string,
  username: string
) =>
  `Hi, <br> ${username} has completed a payment for <a href=${
    process.env.CORS_ORIGIN
  }/myshop/order?status=ToDeliver>${quantity} ${mealkitName}${
    quantity > 1 ? "s" : ""
  }</a>. Please deliver to ${username} as soon as possible`;

export default creatorReceivesPaymentMessage;
