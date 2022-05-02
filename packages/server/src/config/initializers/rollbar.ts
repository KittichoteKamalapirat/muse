import Rollbar from "rollbar";
import dotenv from "dotenv-safe";

// if not production -> do nothing
// if no this condition -> failed on circle ci for some reasons
if (process.env.NODE_ENV === "production") {
  dotenv.config({
    allowEmptyValues: true,
  });
}

export const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});
