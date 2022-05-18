const receivedOrderEmail = (username: string) => {
  const message = `Hi ${username}, <br> Thank you for registering with us. Start ordering meal kits and cooking at <a href=${process.env.CORS_ORIGIN}>Cookknow.</a>. `;
  return message;
};

export default receivedOrderEmail;
