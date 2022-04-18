import aws from "aws-sdk";
import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
  s3Bucket,
} from "../constants";

export const s3 = new aws.S3({
  signatureVersion: "v4",
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

export const s3Params = (
  key: string,
  contentType: string
  // ContentEncoding?: string
) => ({
  Bucket: s3Bucket,
  Key: key,
  Expires: 60, // how to we have to send the request after we create the url (seconds)
  ContentType: contentType,
  // ContentEncoding: "base64",
  // ACL: "public-read", //this thing cause error somehow !!!!!
});
