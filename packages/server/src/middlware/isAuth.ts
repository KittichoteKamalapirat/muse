import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  console.log("print context");
  console.log(context.req.session.userId);
  if (!context.req.session.userId) {
    throw Error("not authenticated as user");
  }

  return next();
};
