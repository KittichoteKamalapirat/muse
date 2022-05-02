/* eslint-disable class-methods-use-this */
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { rollbar } from "../config/initializers/rollbar";
import { CartItem, CartItemNoti, Mealkit } from "../entities";
import { CartItemStatus } from "../entities/CartItem";
import { AddToCart, CartItemInput } from "../entities/utils";
import { isAdmin } from "../middlware/isAdmin";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";
import userReceivedCartItemEmail from "../utils/notifications/emailContents/userReceivedCartItemEmail";
import userReceivedCartItemInApp from "../utils/notifications/inAppMessage/userReceivedCartItemInApp";
import { sendEmail } from "../utils/sendEmail";

@Resolver(CartItem)
export class CartItemResolver {
  @FieldResolver(() => Int)
  async fieldTotal(@Root() cartItem: CartItem): Promise<number> {
    const mealkit = await cartItem.mealkit;

    const total = mealkit.price * cartItem.quantity;
    return total;
  }

  // cart items which are not orders
  @Query(() => [CartItem])
  @UseMiddleware(isAuth)
  async cartItems(@Ctx() { req }: MyContext): Promise<CartItem[]> {
    return CartItem.find({
      where: { userId: req.session.userId, orderId: null },
      relations: [
        "mealkit",
        "user",
        "mealkit.post",
        "mealkit.creator",
        "mealkit.mealkitFiles",
      ],
    });
  }

  @Query(() => CartItem)
  @UseMiddleware(isAuth)
  async cartItem(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<CartItem | undefined> {
    return CartItem.findOne({
      where: { id, userId: req.session.userId },
      relations: [
        "mealkit",
        "user",
        "tracking",
        "order",
        "user.address",
        "mealkit.post",
        "mealkit.creator",
        "mealkit.mealkitFiles",
      ],
    });
  }

  // for admin
  @Query(() => [CartItem])
  @UseMiddleware(isAdmin)
  async allCartItems(): Promise<CartItem[]> {
    return CartItem.find({
      relations: [
        "mealkit",
        "user",
        "user.paymentInfo",
        "mealkit.post",
        "mealkit.creator",
        "mealkit.mealkitFiles",
        "mealkit.creator.paymentInfo",
      ],
    });
  }

  @Mutation(() => AddToCart)
  @UseMiddleware(isAuth)
  async createCartItem(
    @Arg("input") input: CartItemInput,
    @Ctx() { req }: MyContext
  ): Promise<AddToCart | Error | undefined> {
    // check first whether this melakit already exsits in the cart
    const cartItem = await CartItem.findOne({
      where: {
        mealkitId: input.mealkitId,
        userId: req.session.userId,
        orderId: null,
      },
    });

    // CartItem.create().save()
    if (cartItem) {
      const result = await getConnection()
        .createQueryBuilder()
        .update(CartItem)
        .set({ quantity: cartItem.quantity + input.quantity })
        .where('id = :id and "mealkitId" = :mealkitId', {
          id: cartItem.id,
          mealkitId: cartItem.mealkitId,
        })
        .returning("*")
        .execute();

      // const sameCartItem = await CartItem.create({
      //   id: cartItem.id,
      //   quantity: cartItem.quantity + input.quantity,
      //   userId: req.session.userId,
      //   mealkitId: cartItem.mealkitId,
      // }).save();
      // console.log({ cartItem: sameCartItem, newItem: false });
      return { cartItem: result.raw[0], newItem: false };
    }
    const newCartItem = await CartItem.create({
      quantity: input.quantity,
      userId: req.session.userId,
      mealkitId: input.mealkitId,
    }).save();

    if (newCartItem) {
      console.log({ newCartItem });
      const mealkit = await Mealkit.findOne(input.mealkitId);
      if (mealkit) {
        newCartItem.mealkit = mealkit;
        return { cartItem: newCartItem, newItem: true };
      }
      return new Error("Cannot find the following meal kit");
    }
    return undefined;
  }

  @Mutation(() => CartItem)
  @UseMiddleware(isAuth)
  async updateCartItem(
    @Arg("quantity", () => Int) quantity: number,
    @Arg("id", () => Int) id: number,
    @Arg("mealkitId", () => Int) mealkitId: number,
    @Ctx() { req }: MyContext
  ): Promise<CartItem> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(CartItem)
      .set({ quantity })
      .where('id = :id and "userId" = :userId', {
        id,
        userId: req.session.userId,
      })
      .returning("*")
      .execute();
    const mealkit = Mealkit.findOne(mealkitId);
    const updated = result.raw[0];
    updated.mealkit = mealkit;
    // console.log(result.raw[0]);
    // return result.raw[0];
    return updated;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteCartItem(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await CartItem.delete({ id, userId: req.session.userId });
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async receivedCartItem(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await CartItem.update(
      { id, userId: req.session.userId },
      { status: CartItemStatus.Received }
    );

    const cartItem = await CartItem.findOne({
      where: { id },
      relations: ["mealkit", "mealkit.creator", "order", "order.user"],
    });

    if (cartItem) {
      // create noti for creator
      await CartItemNoti.create({
        message: userReceivedCartItemInApp(
          cartItem?.mealkit.creator.username,
          cartItem?.quantity,
          cartItem?.mealkit.name
        ),
        detailUrl: `/myshop/order/cartItem/${cartItem.id}`,
        avatarHref: "noti/confirm",
        cartItemId: cartItem.id,
        userId: cartItem.mealkit.creatorId,
      }).save();

      // send to creator
      sendEmail(
        cartItem?.mealkit.creator.email,
        `👌 ${cartItem?.order.user.username} has received ${
          cartItem?.quantity
        } ${cartItem?.mealkit.name}${cartItem?.quantity > 1 ? "s" : ""}`,
        userReceivedCartItemEmail(
          cartItem?.mealkit.creator.username,
          cartItem?.order.user.username,
          cartItem?.quantity,
          cartItem?.mealkit.name
        )
      );
    }

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async adminCompleteCartItem(
    @Arg("id", () => Int) id: number
  ): Promise<boolean> {
    try {
      await CartItem.update({ id }, { status: CartItemStatus.Complete });
      return true;
    } catch (error) {
      rollbar.error(error);
      return false;
    }
  }
}
