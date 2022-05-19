const userReceivedCartItemInApp = (
  username: string,
  quantity: number,
  mealkitName: string
) =>
  `${username} has received and confirmed ${quantity} ${mealkitName}${
    quantity > 1 ? "s" : ""
  }.<strong> You will receive the payment soon.</strong>`;

export default userReceivedCartItemInApp;
