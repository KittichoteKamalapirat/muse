import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { Post } from "./entities/Post";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import { PostResolver } from "./resolvers/post";
import { MyContext } from "./types";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { COOKIE_NAME, __prod__ } from "./constants";
import cors from "cors";
import path from "path";
import { Upvote } from "./entities/Upvote";
import { createUserLoader } from "./utils/createUserLoader";
import { upvoteLoader } from "./utils/createUpvoteLoader";
import { Address } from "./entities/Address";
import { CartItem, CartItemStatus } from "./entities/CartItem";
import { Mealkit } from "./entities/Mealkit";
import { AddressResolver } from "./resolvers/address";
import { MealkitResolver } from "./resolvers/mealkit";
import { CartItemResolver } from "./resolvers/cartItem";
import "dotenv-safe/config";
import { PaymentResolver } from "./resolvers/payment";
import { Order } from "./entities/Order";
import { OrderResolver } from "./resolvers/order";
import { Payment } from "./entities/Payment";
import { Follow } from "./entities/Follow";
import { FollowResolver } from "./resolvers/follow";
import { PaymentInfo } from "./entities/PaymentInfo";
import { PaymentInfoResolver } from "./resolvers/paymentInfo";
import { TrackingResolver } from "./resolvers/tracking";
import { Tracking } from "./entities/Tracking";
import { CartItemNoti } from "./entities/CartItemNoti";
import { CartItemNotiResolver } from "./resolvers/cartItemNoti";
import { FlowValidateList } from "twilio/lib/rest/studio/v2/flowValidate";
import { S3Resolver } from "./utils/resolvers/s3";
import { Review } from "./entities/Review";
import { ReviewResolver } from "./resolvers/review";
import { createTypeORMConn } from "./utils/createTypeORMConn";
// import { useMeQuery, shitColor, primaryColor } from "@cookknow/shared-package";

const main = async () => {
  // const conn = await createConnection({
  //   type: "postgres",
  //   host: "localhost",
  //   url: process.env.DATABASE_URL,
  //   port: 5432,
  //   // username: "postgres",
  //   // password: "chain123",
  //   // database: "cookknowdb",
  //   logging: true,
  //   synchronize: true,
  //   migrations: [path.join(__dirname, "./migrations/*")],
  //   entities: [
  //     User,
  //     Post,
  //     Upvote,
  //     Address,
  //     Mealkit,
  //     CartItem,
  //     CartItemNoti,
  //     Order,
  //     Payment,
  //     Follow,
  //     PaymentInfo,
  //     Tracking,
  //     Review,
  //   ],
  // });

  const conn = await createTypeORMConn();

  // await conn.runMigrations();
  const app = express();

  // console.log(process.memoryUsage());
  // sendSMS();
  // generateQr();
  // generateQr();

  console.log("hii");
  // console.log(shitColor);
  // console.log(primaryColor);

  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(express.json());

  app.post("/update-tracking", (req) => {
    const trackingData = req.body.data;
    Tracking.update({ id: trackingData.trackingNo }, { ...trackingData });
  });

  app.post("/payment-confirmation", async (req, res) => {
    try {
      // SSE starts
      res.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-streatm",
        "Cache-Control": "no-cache",
      });
      console.log(req);
      console.log("req.body");
      console.log(req.body);
      const ref1 = parseInt(req.body.billPaymentRef1);
      console.log({ ref1 });
      // await Order.update({ id: ref1 }, { status: OrderStatus.ToDeliver });
      await CartItem.update(
        { orderId: ref1 },
        { status: CartItemStatus.ToDeliver }
      );

      const cartItems = await CartItem.find({
        where: { orderId: ref1 },
        relations: ["user", "mealkit"],
      });
      cartItems.forEach(async (cartItem) => {
        const message = ` ${cartItem.user.username} has completed the payment for ${cartItem.quantity} ${cartItem.mealkit.name}. Pleaes deliver soon.`;
        await CartItemNoti.create({
          read: false,
          message: message,
          cartItemId: cartItem.id,
          creatorId: cartItem.mealkit.creatorId,
        }).save();
      });

      // SSE Continue
      res.write("success");
      res.writeHead(404);

      //have to send back to SCB
      res.send({
        resCode: "00",
        "resDesc ": "success",
        transactionId: "xxx",
        confirmId: "xxx",
      });

      res.end;

      // res.redirect("http://google.com/");
      // res.writeHead(302, {
      //   Location: '"http://google.com/"',
      // });
      // res.end();
    } catch (error) {
      console.log(error);
      // res.send(error);
      // res.send({
      //   error: error,
      // });
    }
  });

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.set("trust proxy", 1); //make cookie working in a proxy environment since Nginx will be sitting infront of our api(server), 1 -> we have 1 proxy
  app.use(
    cors({
      origin: [process.env.CORS_ORIGIN, "http://localhost:19006"], //localhost 3000 and mobile
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
  // console.log(process.memoryUsage());

  app.listen(parseInt(process.env.PORT), () => {
    console.log(`server started on port 4000`);
  });
};

main();
