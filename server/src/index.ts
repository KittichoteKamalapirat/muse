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

const main = async () => {
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
    resolvers: [HelloResolver, UserResolver, PostResolver],
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }): MyContext => ({ req, res, redis }), //so that we can access session because session is stick with request
  });

  // const apolloServer = new ApolloServer({
  //     schema: await buildSchema({
  //         resolvers: [HelloResolver],
  //         validate: false,
  //     })
  // })

  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "chain123",
    database: "cookknowdb",
    logging: true,
    synchronize: true,
    entities: [User, Post],
  });

  // Rest to test whether it is running all not

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log(`server started on port 4000`);
  });
};

main();
