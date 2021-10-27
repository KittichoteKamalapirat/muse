import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { Post } from "./entities/Post";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
import { PostResolver } from "./resolvers/post";
import { MyContext } from "./types";

import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { COOKIE_NAME, __prod__ } from "./constants";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail";
import path from "path";
import { Upvote } from "./entities/Upvote";
import { createUserLoader } from "./utils/createUserLoader";
import { upvoteLoader } from "./utils/createUpvoteLoader";
import { Address } from "./entities/Address";
import { CartItem } from "./entities/CartItem";
import { Mealkit } from "./entities/Mealkit";
import { AddressResolver } from "./resolvers/address";
import { sendSMS } from "./utils/sendSms";
import { MealkitResolver } from "./resolvers/mealkit";
import { CartItemResolver } from "./resolvers/cartItem";
import "dotenv-safe/config";
import { Token } from "graphql";
import { PaymentResolver } from "./resolvers/payment";
// import { createUpvoteLoader } from "./utils/createUpvoteLoader";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    host: "localhost",
    url: process.env.DATABASE_URL,
    port: 5432,
    // username: "postgres",
    // password: "chain123",
    // database: "cookknowdb",
    logging: true,
    // synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Post, Upvote, Address, Mealkit, CartItem],
  });

  await conn.runMigrations();
  const app = express();

  console.log(process.memoryUsage());
  // sendSMS();
  // generateQr();
  // generateQr();

  app.get("/payment-confirmation", (req, res) => {
    console.log("req");
    // console.log(req);
    res.send("payment paid");
  });

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.set("trust proxy", 1); //make cookie working in a proxy environment since Nginx will be sitting infront of our api(server), 1 -> we have 1 proxy
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  // const redisClient = redis.createClient（）
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true, //so that Javascript's front end can't access cookie
        sameSite: "lax", //csrf
        secure: __prod__, //cookie onl works in https
        domain: __prod__ ? ".cookknow.com" : undefined, //no need if in development
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const schema = await buildSchema({
    resolvers: [
      HelloResolver,
      UserResolver,
      PostResolver,
      AddressResolver,
      MealkitResolver,
      CartItemResolver,
      PaymentResolver,
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
    }), //so that we can access session because session is stick with request
  });

  // const apolloServer = new ApolloServer({
  //     schema: await buildSchema({
  //         resolvers: [HelloResolver],
  //         validate: false,
  //     })
  // })
  // Rest to test whether it is running all not

  apolloServer.applyMiddleware({ app, cors: false });
  console.log(process.memoryUsage());

  app.listen(parseInt(process.env.PORT), () => {
    console.log(`server started on port 4000`);
  });
};

main();
