/* eslint-disable no-unused-vars */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      REDIS_URL: string;
      PORT: string;
      SESSION_SECRET: string;
      CORS_ORIGIN: string;
      CORS_ORIGIN_PROD: string;
      CORS_ORIGIN_TEST: string;
      SCB_API_BILLERID: string;
      SCB_API_REF3: string;
      SCB_API_KEY: string;
      SCB_API_SECRET: string;
      GENERATE_SCB_ACCESS_TOKEN_URL: string;
      REQUEST_CREATE_SCB_QR30_URL: string;
      ETRACKINGS_API_KEY: string;
      ETRACKINGS_API_SECRET: string;
      TWILIO_ACCOUNT_SID: string;
      TWILIO_AUTH_TOKEN: string;
      TWILIO_TEST_PHONE_NUMBER: string;
    }
  }
}

export {};
