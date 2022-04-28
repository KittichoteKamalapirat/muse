const receivedOrderEmail = (
  quantity: number,
  mealkitName: string,
  username: string
) =>
  `Hi, <br> You have received an <a href=${
    process.env.CORS_ORIGIN
  }/myshop/order?status=PaymentPending>order</a> for ${quantity} ${mealkitName}${
    quantity > 1 ? "s" : ""
  } from ${username}.  <br> Please wait for ${username} to complete the payment.`;

export default receivedOrderEmail;
