import { Request, Response, Express } from "express";
import { Session } from "express-session";
import { Redis } from "ioredis";
import { upvoteLoader } from "./utils/createUpvoteLoader";
import { createUserLoader } from "./utils/createUserLoader";
// import { createUpvoteLoader } from "./utils/createUpvoteLoader";
export type MyContext = {
  // req: Request & { session: Express.Session };
  req: Request & { session?: Session & { userId?: number } };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  // upvoteLoader: ReturnType<typeof createUpvoteLoader>;
  upvoteLoader: ReturnType<typeof upvoteLoader>;
};
