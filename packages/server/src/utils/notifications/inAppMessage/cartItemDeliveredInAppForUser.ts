const cartItemDeliveredInAppForUser = (
  courierName: string,
  quantity: number,
  mealkitName: string
) =>
  `${courierName} has successfully delivered ${quantity} ${mealkitName}${
    quantity > 1 ? "s" : ""
  }to your address. Please confirm that you have recieved them.`;

export default cartItemDeliveredInAppForUser;
