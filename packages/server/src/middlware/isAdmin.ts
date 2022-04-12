import { MyContext } from "../types";
import { MiddlewareFn } from "type-graphql";
import { User } from "../entities";

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const userId = context.req.session.userId;
  if (!userId) {
    throw Error("not authenticated");
  }
  const admin = await User.findOne({ where: { id: userId, isAdmin: true } });

  if (!admin) {
    throw Error("not an admin");
  }

  return next();
};
