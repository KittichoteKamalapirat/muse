/* eslint-disable class-methods-use-this */
import axios from "axios";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  registerEnumType,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { s3Bucket } from "../constants";
import { CartItem, CartItemNoti, Order, Payment } from "../entities";
import { CartItemStatus } from "../entities/CartItem";
import { CartItemsByCreatorInput } from "../entities/utils";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";
import {
  CartItemsByOrderFormat,
  MappedCreatorOrders,
} from "../utils/ObjectType";
import { s3, s3Params } from "../utils/s3";
import { toCreatorOrdersMap } from "../utils/toCreatorOrdersMap";
import { toUserOrdersMap } from "../utils/toUserOrdersMap";
import { createScbQr } from "./payment";

// we need to make TypeGraphQL aware of the enums manually by calling the registerEnumType function and providing the enum name for GraphQL (accotding to Doc)

registerEnumType(CartItemStatus, {
  name: "CartItemStatus",
});

@Resolver()
export class OrderResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Order)
  async createOrder(
    @Ctx() { req }: MyContext,
    @Arg("cartItemIds", () => [Int]) cartItemIds: number[],
    @Arg("grossOrder", () => Int) grossOrder: number, // need Int due to reflection system
    @Arg("cartItemsByCreatorInput", () => [CartItemsByCreatorInput])
    cartItemsByCreatorInput: CartItemsByCreatorInput[]
  ): Promise<Order | undefined> {
    // S3
    const now = Date.now().toString();
    // s3 signed request
    const qrParams = s3Params(`${req.session.userId}/${now}`, "utf-8");
    const signedRequest = s3.getSignedUrl("putObject", qrParams);
    const url = `https://${s3Bucket}.s3.amazonaws.com/${req.session.userId}/${now}`;
    // s3 signed request done

    // payment object

    const payment = await Payment.create({
      amount: grossOrder,
      qrUrl: url,
    }).save();

    const order = await Order.create({
      grossOrder,
      cartItemsByCreator: cartItemsByCreatorInput,
      userId: req.session.userId,
      paymentId: payment.id,
    }).save();

    // save to S3 start
    const options = {
      headers: {
        "Content-Type": "utf-8",
      },
    };
    // qr
    const base64raw = await createScbQr(grossOrder, order.id);
    const base64Text = `data:image/png;base64, ${base64raw.data.qrImage}`;
    // await axios.put(signedRequest, image, options);
    await axios.put(signedRequest, base64Text, options);
    // save to S3 donef
    // save url to database

    // loop through every cartItem
    // orderId

    try {
      cartItemIds.forEach(async (cartItemId) => {
        await getConnection()
          .createQueryBuilder()
          .update(CartItem)
          .set({ orderId: order.id, status: CartItemStatus.PaymentPending })
          .where("id = :id", { id: cartItemId })
          .execute();

        // CartItem Noti

        const cartItem = await CartItem.findOne({
          where: { id: cartItemId },
          relations: ["mealkit", "user"],
        });

        if (cartItem) {
          // create notis for creators
          CartItemNoti.create({
            read: false,
            message: `You received an order for ${cartItem?.quantity} ${cartItem?.mealkit.name} from ${cartItem?.user.username}.`,
            cartItemId: cartItem.id,
            userId: cartItem?.mealkit.creatorId,
          }).save();
        }
      });
    } catch (error) {
      console.log(error);
    }

    return order;
  }

  // look for me as a user's orders
  @UseMiddleware(isAuth)
  @Query(() => [CartItemsByOrderFormat])
  async userOrders(
    @Arg("status", () => CartItemStatus) status: CartItemStatus,
    @Ctx() { req }: MyContext
  ): Promise<CartItemsByOrderFormat[] | undefined> {
    const cartItems = await CartItem.find({
      where: {
        status,
        userId: req.session.userId,
        // order: !IsNull(),
      },
      relations: [
        "order",
        "user",
        "user.address",
        "mealkit",
        "mealkit.creator",
        "tracking",
      ],
    });
    const mapped = toUserOrdersMap(cartItems);

    return mapped;
  }

  @UseMiddleware(isAuth)
  @Query(() => [MappedCreatorOrders])
  async creatorOrders(
    @Arg("status", () => CartItemStatus) status: CartItemStatus,
    @Ctx() { req }: MyContext
  ): Promise<MappedCreatorOrders[] | Error | undefined> {
    const cartItems = await CartItem.find({
      where: {
        status,
        mealkit: { creatorId: req.session.userId },
        // order: !IsNull(),
      },
      relations: [
        "order",
        "user",
        "user.address",
        "mealkit",
        "mealkit.creator",
        "tracking",
      ],
    });

    console.log(cartItems);
    const mapped = toCreatorOrdersMap(cartItems);
    // console.log(mapped);
    if (mapped) {
      return mapped;
    }
    return new Error("no cart items");
    // return undefined;
  }
}
