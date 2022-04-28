const userCreatedReviewEmail = (
  creatorName: string,
  quantity: number,
  mealkitName: string,
  username: string
) =>
  `Hi ${creatorName}, <br>${username} gave a review for the <a href=${
    process.env.CORS_ORIGIN
  }/myshop/order?status=Reviewed> for ${quantity} ${mealkitName}${
    quantity > 1 ? "s" : ""
  }</a>.`;

export default userCreatedReviewEmail;
