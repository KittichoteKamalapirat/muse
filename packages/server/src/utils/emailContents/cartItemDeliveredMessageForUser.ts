const cartItemDeliveredMessageForUser = (
  courierName: string,
  quantity: number,
  mealkitName: string,
  username: string
) =>
  `Hi ${username}, <br> ${courierName} has successfully delivery <a href=${
    process.env.CORS_ORIGIN
  }/order?status=Delivered> ${quantity} ${mealkitName}${
    quantity > 1 ? "s" : ""
  }</a> to you. Please confirm that you have recieved them  <a href=${
    process.env.CORS_ORIGIN
  }/order?status=Delivered> here </a>`;

export default cartItemDeliveredMessageForUser;
