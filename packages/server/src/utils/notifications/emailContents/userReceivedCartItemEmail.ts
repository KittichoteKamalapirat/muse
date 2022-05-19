const userReceivedCartItemEmail = (
  creatorName: string,
  username: string,
  quantity: number,
  mealkitName: string
  //   amount: number
) =>
  `Hi ${creatorName}, <br> ${username} has received and confirmed <a href=${
    process.env.CORS_ORIGIN
  }/myshop/order?status=Received>${quantity} ${mealkitName}${
    quantity > 1 ? "s" : ""
  }</a>. <br> You will receive the payment soon`;

export default userReceivedCartItemEmail;
