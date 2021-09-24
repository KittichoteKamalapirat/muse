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
import { AddressResolver } from "./resolvers/address";
// import { createUpvoteLoader } from "./utils/createUpvoteLoader";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "chain123",
    database: "cookknowdb",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Post, Upvote, Address],
  });

  // await conn.runMigrations();
  // console.log("delete all the data");
  // await Post.delete({})
  // await conn.runMigrations(); -> make sure the colume name with capital letter is "", put quatation "creatorId"
  // console.log("dirname", __dirname);
  // sendEmail("bob@bob.com", "<h1>Email</h1>");
  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  // const redisClient = redis.createClient();
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
      },
      saveUninitialized: false,
      secret: "secret",
      resave: false,
    })
  );

  const schema = await buildSchema({
    resolvers: [HelloResolver, UserResolver, PostResolver, AddressResolver],
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

  app.listen(4000, () => {
    console.log(`server started on port 4000`);
  });
};

main();
