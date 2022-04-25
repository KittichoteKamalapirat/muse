const createTrackingMessage = (
  id: number,
  quantity: number,
  mealkitName: string,
  username: string,
  courierName: string
) =>
  `Hi ${username}, <br>${courierName} is delivering ${quantity} ${mealkitName}${
    quantity > 1 ? "s" : ""
  } to you. Track your product <a href=${
    process.env.CORS_ORIGIN
  }/order/tracking/${id}>
    here </a>. `;

export default createTrackingMessage;
