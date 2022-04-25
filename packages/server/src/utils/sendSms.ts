import { Twilio } from "twilio";

export const sendSMS = async () => {
  const client = new Twilio(
    process.env.TWILIO_ACCOUNT_SID as string,
    process.env.TWILIO_AUTH_TOKEN as string
  );

  console.log(process.env.TWILIO_ACCOUNT_SID);
  console.log(process.env.TWILIO_AUTH_TOKEN);
  console.log(process.env.TWILIO_TEST_PHONE_NUMBER);

  console.log("sened sms");
  client.messages
    .create({
      body: "Hi there from Twilio",
      from: process.env.TWILIO_TEST_PHONE_NUMBER,
      to: "+66961489046",
    })
    .then((message) => console.log(message.sid));
};
