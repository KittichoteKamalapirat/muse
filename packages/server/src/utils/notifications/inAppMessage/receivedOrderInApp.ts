const receivedOrderInApp = (
  quantity: number,
  mealkitName: string,
  username: string
) =>
  `You have received an order for ${quantity} ${mealkitName}${
    quantity > 1 ? "s" : ""
  } from ${username}. Please wait for ${username} to complete the payment.`;

export default receivedOrderInApp;
