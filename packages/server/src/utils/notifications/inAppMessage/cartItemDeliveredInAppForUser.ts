const cartItemDeliveredInAppForUser = (
  courierName: string,
  quantity: number,
  mealkitName: string
) =>
  `${courierName} has successfully delivered ${quantity} ${mealkitName}${
    quantity > 1 ? "s" : ""
  } to your address. <strong>Please confirm that you have recieved them.</strong>`;

export default cartItemDeliveredInAppForUser;
