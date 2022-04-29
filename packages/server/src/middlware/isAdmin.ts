import { MiddlewareFn } from "type-graphql";
import { User } from "../entities";
import { MyContext } from "../types";

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const { userId } = context.req.session;

  if (!userId) {
    throw Error("Not authenticated as admin");
  }
  const admin = await User.findOne({ where: { id: userId, isAdmin: true } });

  if (!admin) {
    throw Error("not an admin");
  }

  return next();
};
