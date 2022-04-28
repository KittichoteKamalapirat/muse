const creatorCreatedTrackingInApp = (
  quantity: number,
  mealkitName: string,
  courierName: string
) =>
  `${courierName} is delivering ${quantity} ${mealkitName}${
    quantity > 1 ? "s" : ""
  } to you. Track your product.`;

export default creatorCreatedTrackingInApp;
