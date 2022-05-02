import Rollbar from "rollbar";
import dotenv from "dotenv-safe";

dotenv.config({
  allowEmptyValues: true,
});

export const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});
