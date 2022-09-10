import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
/* eslint-disable no-console */
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
// import "dotenv-safe/config";
import dotenv from "dotenv-safe";
import express from "express";
import session from "express-session";
import { useServer } from "graphql-ws/lib/use/ws";
import { createServer } from "http";
import Redis from "ioredis";
import { buildSchema } from "type-graphql";
import { Server as WebSocketServer } from "ws";
import { COOKIE_NAME, IS_PROD } from "./constants";
import { AddressResolver } from "./resolvers/address";
import { BoxResolver } from "./resolvers/box";
import { PostResolver } from "./resolvers/post";
import { SongResolver } from "./resolvers/song";
import { SongRequestResolver } from "./resolvers/songRequest";
import { SpotifyResolver } from "./resolvers/spotify";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";
import { createTypeORMConn } from "./utils/createTypeORMConn";
import { upvoteLoader } from "./utils/createUpvoteLoader";
import { createUserLoader } from "./utils/createUserLoader";

console.log("node_env", process.env.NODE_ENV);

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

  const conn = await createTypeORMConn(process.env.NODE_ENV);

  const app = express();

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
        "http://localhost:19000",
        "http://localhost:19001",
      ], // localhost 3000 and mobile
      credentials: true,
    })
  );

  const sessionMiddleware = session({
    name: COOKIE_NAME,
    store: new RedisStore({
      client: redis,
      disableTouch: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      httpOnly: true, // so that Javascript's front end can't access cookie
      sameSite: "none", // so mobile cann access? (lax => only same site and works in dev (both localhost))
      secure: IS_PROD, // cookie onl works in https
      // domain: IS_PROD ? ".jocky.com" : undefined, // no need if in development
    },
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    resave: false,
  });

  app.use(sessionMiddleware); // cookie passed automatically in req.session (for query and mutation)

  try {
    const schema = await buildSchema({
      resolvers: [
        UserResolver,
        PostResolver,
        BoxResolver,
        AddressResolver,
        SongResolver,
        SongRequestResolver,
        SpotifyResolver,
      ],
      validate: false,
    });

    // zone ------------------
    const httpServer = createServer(app);

    // Creating the WebSocket server
    const wsServer = new WebSocketServer({
      server: httpServer,
      path: "/graphql",
    });

    const serverCleanup = useServer(
      {
        schema,
        context: (ctx, msg, args) => ({
          req: ctx.extra.request,
          userLoader: createUserLoader(),
          upvoteLoader: upvoteLoader(),
        }),
        onConnect: async (ctx) => {
          console.log("socket connected");
          // manually add session object to request
          sessionMiddleware(ctx.extra.request as any, {} as any, () => {
            console.log("session added");
          });
        },
        onDisconnect() {
          console.log("socket disconnected");
        },
      },
      wsServer
    );

    const apolloServer = new ApolloServer({
      // playground: {
      //   subscriptionEndpoint: "ws://localhost:4000/subscriptions",
      // },
      schema,
      context: ({ req, res }): MyContext => ({
        req,
        res,
        redis,
        userLoader: createUserLoader(),
        // upvoteLoader: createUpvoteLoader(),
        upvoteLoader: upvoteLoader(),
      }), // so that we can access session because session is stick with request
      plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }) as any,
        // Proper shutdown for the WebSocket server.
        {
          async serverWillStart() {
            console.log("web socket server will start");
            return {
              async drainServer() {
                console.log("drain");
                await serverCleanup.dispose();
              },
            };
          },
        },
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
      subscriptions: {
        path: "/graphql",
      },
    });

    apolloServer.applyMiddleware({ app, path: "/graphql", cors: false });

    const PORT = parseInt(process.env.PORT, 10);
    const server = httpServer.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });

    return { server, connection: conn };
  } catch (error) {
    console.log(error);
    return error;
  }
};
