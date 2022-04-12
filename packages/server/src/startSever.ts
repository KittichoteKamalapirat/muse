import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
// import "dotenv-safe/config";
import dotenv from "dotenv-safe";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { buildSchema } from "type-graphql";
import { COOKIE_NAME, __prod__ } from "./constants";
import { AddressResolver } from "./resolvers/address";
import { CartItemResolver } from "./resolvers/cartItem";
import { CartItemNotiResolver } from "./resolvers/cartItemNoti";
import { FollowResolver } from "./resolvers/follow";
import { MealkitResolver } from "./resolvers/mealkit";
import { OrderResolver } from "./resolvers/order";
import { PaymentResolver } from "./resolvers/payment";
import { PaymentInfoResolver } from "./resolvers/paymentInfo";
import { PostResolver } from "./resolvers/post";
import { ReviewResolver } from "./resolvers/review";
import { TrackingResolver } from "./resolvers/tracking";
import { UserResolver } from "./resolvers/user";
import paymentRouter from "./routes/payment";
import trackingRouter from "./routes/tracking";
import { MyContext } from "./types";
import { createTypeORMConn } from "./utils/createTypeORMConn";
import { upvoteLoader } from "./utils/createUpvoteLoader";
import { createUserLoader } from "./utils/createUserLoader";
import { S3Resolver } from "./utils/resolvers/s3";

// import { useMeQuery, shitColor, primaryColor } from "@cookknow/shared-package";

// determine which .env file to use
// if production -> dockerfile copy and put in .env

// if (process.env.NODE_ENV==="test") {
//   dotenv.config({ path: `${__dirname}/../.env.${process.env.NODE_ENV}` });
// } else {
//   dotenv.config();
// }

if (process.env.NODE_ENV) {
  switch (process.env.NODE_ENV) {
    case "test":
      dotenv.config({
        path: `${__dirname}/../.env.test`,
        allowEmptyValues: true,
      });
      break;
    case "development":
      dotenv.config({
        path: `${__dirname}/../.env.dev`,
        allowEmptyValues: true,
      });
      break;
    default:
      dotenv.config({ path: `${__dirname}/../.env`, allowEmptyValues: true }); // default to .env for production in docker?
  }
} else {
  dotenv.config({ allowEmptyValues: true });
}

export const startServer = async () => {
  console.log("This is", process.env.NODE_ENV, "environment.");
  console.log("CORS origin:", process.env.CORS_ORIGIN);
  console.log("CORS origin production:", process.env.CORS_ORIGIN_TEST);
  console.log("CORS origin test:", process.env.CORS_ORIGIN_TEST);
  console.log("db url:", process.env.DATABASE_URL);
  console.log("port:", process.env.PORT);
  console.log("redis url:", process.env.REDIS_URL);

  const conn = await createTypeORMConn();

  // await conn.runMigrations();
  const app = express();

  // console.log(process.memoryUsage());
  // sendSMS();
  // generateQr();
  // generateQr();
  // console.log(shitColor);
  // console.log(primaryColor);

  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(express.json());

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.set("trust proxy", 1); // make cookie working in a proxy environment since Nginx will be sitting infront of our api(server), 1 -> we have 1 proxy
  app.use(
    cors({
      origin: [
        process.env.CORS_ORIGIN,
        process.env.CORS_ORIGIN_PROD,
        process.env.CORS_ORIGIN_TEST,
        "http://localhost:19006",
      ], // localhost 3000 and mobile
      credentials: true,
    })
  );

  app.use("/api/payment", paymentRouter);
  app.use("/api/tracking", trackingRouter);

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true, // so that Javascript's front end can't access cookie
        sameSite: "lax", // csrf
        secure: __prod__, // cookie onl works in https
        domain: __prod__ ? ".cookknow.com" : undefined, // no need if in development
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      PostResolver,
      AddressResolver,
      MealkitResolver,
      CartItemResolver,
      CartItemNotiResolver,
      PaymentResolver,
      OrderResolver,
      FollowResolver,
      PaymentInfoResolver,
      TrackingResolver,
      S3Resolver,
      ReviewResolver,
    ],
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }): MyContext => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      // upvoteLoader: createUpvoteLoader(),
      upvoteLoader: upvoteLoader(),
    }), // so that we can access session because session is stick with request
  });

  // const apolloServer = new ApolloServer({
  //     schema: await buildSchema({
  //         resolvers: [HelloResolver],
  //         validate: false,
  //     })
  // })

  apolloServer.applyMiddleware({ app, cors: false });
  // console.log(process.memoryUsage());

  //   const PORT = process.env.NODE_ENV === "test" ? 0 : parseInt(process.env.PORT);
  const PORT = parseInt(process.env.PORT, 10);
  const server = app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });

  return { server, connection: conn };
};
