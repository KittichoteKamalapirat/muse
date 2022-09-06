import { createServer } from "http";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { Server as WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
/* eslint-disable no-console */
import {
  ApolloServer,
  checkForResolveTypeResolver,
} from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
// import "dotenv-safe/config";
import dotenv from "dotenv-safe";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { Server } from "socket.io";
import { buildSchema, PubSub } from "type-graphql";
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
import { SimpleConsoleLogger } from "typeorm";
import { disconnect } from "process";

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
      sameSite: "lax", // csrf
      secure: IS_PROD, // cookie onl works in https
      domain: IS_PROD ? ".muse.com" : undefined, // no need if in development
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

    // console.log(sessionMiddleware())

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
    console.log("1");

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
        ApolloServerPluginDrainHttpServer({ httpServer }),

        // Proper shutdown for the WebSocket server.
        {
          async serverWillStart() {
            return {
              async drainServer() {
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

    console.log("2");
    apolloServer.applyMiddleware({ app, path: "/graphql", cors: false });
    console.log("3");

    const PORT = parseInt(process.env.PORT, 10);
    const server = httpServer.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });

    // web socket start -----------------------------------
    const io = new Server(server, {
      cors: {
        origin: ["http://localhost:19000", "http://localhost:19001"],
      },
    });

    io.on("connection", (socket) => {
      console.log("io socket started");
      socket.on("incrementUpvote", (placeId, songId, upvotesNum) => {
        console.log("placeId", placeId);
        console.log("songId", songId);
        console.log("upvotesNum", upvotesNum);
        io.emit("broadcastIncrementUpvote", placeId, songId, upvotesNum + 1);
      });
    });

    // seb socket ends ----------------------------------------

    return { server, connection: conn };
  } catch (error) {
    console.log(error);
    return error;
  }
};
