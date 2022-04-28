const userCreatedReviewInApp = (
  quantity: number,
  mealkitName: string,
  username: string
) => `${username} gave a review for ${mealkitName}${quantity > 1 ? "s" : ""}.`;

export default userCreatedReviewInApp;
