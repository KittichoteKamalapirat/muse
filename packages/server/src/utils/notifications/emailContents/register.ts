const thanksForRegister = (username: string) => {
  const message = `Hi ${username}, <br> Thank you for registering with us. Start exploring recipes and ordering meal kits at <a href=${process.env.CORS_ORIGIN}>Cookknow</a>.`;
  return message;
};

export default thanksForRegister;
