export const __prod__ = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "qidRedis";
export const FORGET_PASSWORD_PREFIX = "forget-password:";

// S3
export const s3Bucket = "cookknow";

export const AWS_ACCESS_KEY_ID = "AKIA3ZS7NFDQDURWUKFZ";
export const AWS_SECRET_ACCESS_KEY = "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";
export const AWS_REGION = "ap-southeast-1";

//Twilio

export const TWILIO_ACCOUNT_SID = "AC7100776fdba2dd365fc5b54b6a344585";
export const TWILIO_AUTH_TOKEN = "a948e28bec1dfb222936838ccb1ca600";
export const TWILIO_TEST_PHONE_NUMBER = "+12183573995";

//SCB
export const SCB_API_KEY = "l7c8620ca31fc846768d57c2bc2fe01e1f";
export const SCB_API_SECRET = "4fb2ce52351b4c22a0a08c9a820c0e78";
export const BILLER_ID = "097741489371038";

//Testing SCB according to DOCS
export const GENERATE_SCB_ACCESS_TOKEN_URL_DOCS =
  "https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token";
export const REQUEST_CREATE_SCB_QR30_URL_DOCS =
  "https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create";

//Testing with SCB
export const SCB_API_KEY_UAT = "l7273cdc1f853b428eb9bfb2a71a61a98f";
export const SCB_API_SECRET_UAT = "96f3218e0ccc409198306f64b0045c49";
export const GENERATE_SCB_ACCESS_TOKEN_URL_UAT =
  "https://api-uat.partners.scb/partners/v1/oauth/token";
export const REQUEST_CREATE_SCB_QR30_URL_UAT =
  "https://api-uat.partners.scb/partners/v1/payment/qrcode/create";

//Etrackings
export const ETRACKINGS_API_KEY = "e9cc2b492e0030e6cdca5473bdcadd6f39655acc";
export const ETRACKINGS_API_SECRET =
  "c8f9d55d10246d3a3fa37f7dbb0c6d4608081eceb69a52beedbf9d931b6f094ed4af400f9298ce994a7f61fdd39e755ae75f22739f6cff6bc75c432f3879f3e8d82f2c910b33576946dd39";
