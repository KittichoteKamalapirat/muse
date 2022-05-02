import { NextPage } from "next";
import Error from "next/error";
import getConfig from "next/config";
import Rollbar from "rollbar";

const { serverRuntimeConfig } = getConfig();

interface Props {
  statusCode: number;
}

const ErrorPage: NextPage<Props> = ({ statusCode }) => (
  <Error statusCode={statusCode} />
);

ErrorPage.getInitialProps = ({ req, res, err }) => {
  let statusCode;
  if (res) statusCode = res.statusCode;
  if (err?.statusCode) statusCode = err.statusCode;
  else statusCode = 404;

  // only report error if we're on the server
  if (!process.browser && err) {
    console.log("Reporting error to Rollbar...");
    const rollbar = new Rollbar(serverRuntimeConfig.rollbarServerToken);
    rollbar.error(err, req, (rollbarError) => {
      if (rollbarError) {
        console.error("Rollbar error reporting failed:");
        console.error(rollbarError);
        return;
      }
      console.log("Reported error to Rollbar");
    });
  }

  return { statusCode };
};

export default ErrorPage;
