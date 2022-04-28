const userReceivedCartItemInApp = (
  username: string,
  quantity: number,
  mealkitName: string
) =>
  `${username} has received and confirmed ${quantity} ${mealkitName}${
    quantity > 1 ? "s" : ""
  }. You will received the payment soon`;

export default userReceivedCartItemInApp;
