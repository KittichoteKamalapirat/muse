const receivedOrderEmail = (
  id: number,
  quantity: number,
  mealkitName: string,
  username: string
) => {
  const message = `Hi, <br> You have received <a href=${
    process.env.CORS_ORIGIN
  }/myshop/order/cartItem/${id}>an order for ${quantity} ${mealkitName}${
    quantity > 1 ? "s" : ""
  } </strong> </a> from ${username}. Please wait for ${username} to complete the payment.`;
  return message;
};

export default receivedOrderEmail;
