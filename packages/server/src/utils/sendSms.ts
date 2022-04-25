import { Twilio } from "twilio";

export const sendSMS = async () => {
  const client = new Twilio(
    process.env.TWILIO_ACCOUNT_SID as string,
    process.env.TWILIO_AUTH_TOKEN as string
  );

  const x = "variable x";

  client.messages
    .create({
      body: `🎶I am _not_ ~pushing~ throwing away my *shot*! http://www.cookknow.com/ ${x} `,
      from: process.env.TWILIO_TEST_PHONE_NUMBER,
      to: "+66961489046",
      // to: "+66917261499",
    })
    .then((message) => console.log(message.sid));
};
