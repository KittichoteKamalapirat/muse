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
      SPOTIFY_CLENT_ID: string;
      SPOTIFY_CLENT_SECRET: string;
    }
  }
}

export {}
