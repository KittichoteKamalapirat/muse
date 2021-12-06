import { Message } from "twilio/lib/twiml/MessagingResponse";
import {
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { CartItemNoti } from "../entities/CartItemNoti";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";

@Resolver(CartItemNoti)
export class CartItemNotiResolver {
  @UseMiddleware(isAuth)
  @Query(() => [CartItemNoti])
  async orderNotis(@Ctx() { req }: MyContext): Promise<CartItemNoti[] | Error> {
    //     const notis: CartItemNoti[] = await getConnection().query(`

    //     SELECT noti.id, noti.read, noti.message,noti."cartItemId"  FROM cart_item_noti as noti
    //     LEFT JOIN cart_item
    //     ON noti."cartItemId" = cart_item.id
    //     LEFT JOIN mealkit
    //     ON cart_item."mealkitId" = mealkit.id
    //     WHERE mealkit."creatorId" = '${req.session.userId}';

    // `);
    try {
      const notis = CartItemNoti.find({
        where: { creatorId: req.session.userId },
        relations: [
          "cartItem",
          "cartItem.user",
          "cartItem.mealkit",
          // "cartItem.mealkit.creator",
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
        .where('"creatorId" = :creatorId', { creatorId: req.session.userId })
        .execute();
      return true;
    } catch (error) {
      return new Error();
    }
  }
}
