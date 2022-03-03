import { Twilio } from "twilio";
import {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_TEST_PHONE_NUMBER,
} from "../constants";

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
const accountSid = TWILIO_ACCOUNT_SID;
const authToken = TWILIO_AUTH_TOKEN;

const client = new Twilio(accountSid, authToken);

export async function sendSMS() {
  client.messages
    .create({
      body: "Hi there from Twilio",
      from: TWILIO_TEST_PHONE_NUMBER,
      to: "+66961489046",
    })
    .then((message) => console.log(message.sid));
}
