/* eslint-disable class-methods-use-this */
import { Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { CartItemNoti } from "../entities";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";

@Resolver(CartItemNoti)
export class CartItemNotiResolver {
  @UseMiddleware(isAuth)
  @Query(() => [CartItemNoti])
  async orderNotis(@Ctx() { req }: MyContext): Promise<CartItemNoti[] | Error> {
    try {
      const notis = CartItemNoti.find({
        where: { userId: req.session.userId },
        relations: [
          "cartItem",
          "cartItem.user",
          "cartItem.mealkit",
          "cartItem.mealkit.creator",
          "cartItem.mealkit.mealkitFiles",
        ],
      });

      return notis;
    } catch (error) {
      console.log(error);
      return new Error();
    }
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async readOrderNotis(@Ctx() { req }: MyContext): Promise<boolean | Error> {
    try {
      await getConnection()
        .createQueryBuilder()
        .update(CartItemNoti)
        .set({ read: true })
        .where('"userId" = :userId', { userId: req.session.userId })
        .execute();
      return true;
    } catch (error) {
      return new Error();
    }
  }
}
