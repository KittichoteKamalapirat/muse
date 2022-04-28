const cartItemDeliveredInAppForCreator = (
  courierName: string,
  quantity: number,
  mealkitName: string,
  username: string
) =>
  `${courierName} has successfully delivered ${quantity} ${mealkitName}${
    quantity > 1 ? "s" : ""
  }. Please wait for ${username} to confirm.`;

export default cartItemDeliveredInAppForCreator;
