import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw Error("not authenticated as a user");
  }

  return next();
};
