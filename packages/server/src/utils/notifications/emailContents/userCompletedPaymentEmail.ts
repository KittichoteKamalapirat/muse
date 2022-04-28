const userCompletedPaymentEmail = (
  quantity: number,
  mealkitName: string,
  username: string
) =>
  `Hi ${username}, <br>Thank you for completing the payment for <a href=${
    process.env.CORS_ORIGIN
  }/myshop/order?status=ToDeliver>${quantity} ${mealkitName}${
    quantity > 1 ? "s" : ""
  }</a>. We will let you know when the seller has delivered your order`;

export default userCompletedPaymentEmail;
