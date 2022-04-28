const cartItemDeliveredMessageForCreator = (
  creatorName: string,
  courierName: string,
  quantity: number,
  mealkitName: string,
  username: string
) =>
  `Hi ${creatorName}, <br> ${courierName} has successfully delivered <a href=${
    process.env.CORS_ORIGIN
  }/myshop/order?status=Delivered> ${quantity} ${mealkitName}${
    quantity > 1 ? "s" : ""
  }</a>. Please wait for ${username} to confirm.`;

export default cartItemDeliveredMessageForCreator;
