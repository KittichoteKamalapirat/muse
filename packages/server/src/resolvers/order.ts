import axios from "axios";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  registerEnumType,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { s3Bucket } from "../constants";
import { CartItemStatus } from "../entities/CartItem";
import { CartItemNoti, Order, Payment, CartItem } from "../entities/";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";
import { s3, s3Params } from "../utils/s3";
import {
  MappedCreatorOrders,
  toCreatorOrdersMap,
} from "../utils/toCreatorOrdersMap";
import {
  CartItemsByOrderFormat,
  toUserOrdersMap,
} from "../utils/toUserOrdersMap";
import { createScbQr } from "./payment";

//we need to make TypeGraphQL aware of the enums manually by calling the registerEnumType function and providing the enum name for GraphQL (accotding to Doc)

registerEnumType(CartItemStatus, {
  name: "CartItemStatus",
});

@InputType()
class CartItemsByCreatorInput {
  @Field()
  creatorId: string;

  @Field()
  deliveryFee: number;

  @Field()
  mealkitsFee: number;
}

@Resolver()
export class OrderResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Order)
  async createOrder(
    @Ctx() { req, res }: MyContext,
    @Arg("cartItemIds", () => [Int]) cartItemIds: number[],
    @Arg("grossOrder", () => Int) grossOrder: number, //need Int due to reflection system
    @Arg("cartItemsByCreatorInput", () => [CartItemsByCreatorInput])
    cartItemsByCreatorInput: CartItemsByCreatorInput[]
  ): Promise<Order | undefined> {
    // S3
    const now = Date.now().toString();
    // s3 signed request
    const qrParams = s3Params(`${req.session.userId}/${now}`, "utf-8");
    const signedRequest = s3.getSignedUrl("putObject", qrParams);
    const url = `https://${s3Bucket}.s3.amazonaws.com/${req.session.userId}/${now}`;
    //s3 signed request done

    // payment object

    const payment = await Payment.create({
      amount: grossOrder,
      qrUrl: url,
    }).save();

    const order = await Order.create({
      grossOrder: grossOrder,
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

        CartItemNoti.create({
          read: false,
          message: `You received an order for ${cartItem?.quantity} ${cartItem?.mealkit.name} from ${cartItem?.user.username}.`,
          cartItemId: cartItemId,
          creatorId: cartItem?.mealkit.creatorId,
        }).save();
      });
    } catch (error) {
      console.log(error);
    }

    return order;
  }

  // @UseMiddleware(isAuth)
  // @Query(() => [CartItem])
  // async orderItems(
  //   @Arg("status", () => OrderStatus) status: OrderStatus,
  //   @Ctx() { req, res }: MyContext
  // ): Promise<CartItem[] | undefined> {
  //   const cartItems = await getConnection().query(
  //     `
  //     SELECT *
  //     FROM "cart_item"
  //     WHERE "orderId" IN (
  //       SELECT id
  //       FROM "order"
  //       WHERE "userId" = '${req.session.userId}' AND "status" = '${status}'
  //       );
  //       `
  //   );

  //   cartItems.forEach(async (cartItem: CartItem, index: number) => {
  //     console.log(index);
  //     const mealkit = Mealkit.findOne(cartItem.mealkitId);
  //     cartItems[index].mealkit = mealkit;
  //   });
  //   console.log(cartItems);
  //   return cartItems;
  // }

  //get orderItems for current creator
  // by status
  // has orderId -> already ordered
  //the mealkits in the order belongs to the current creator
  // @UseMiddleware(isAuth)
  // @Query(() => [CartItem])
  // async creatorOrderItems(
  //   @Arg("status", () => OrderStatus) status: OrderStatus,
  //   @Ctx() { req, res }: MyContext
  // ): Promise<CartItem[]> {
  //   const cartItems = await getConnection().query(
  //     `
  //     SELECT *
  //     FROM cart_item
  //     INNER JOIN "order"
  //     ON cart_item."orderId"="order".id
  //     WHERE "order".status = '${status}'
  //     AND "mealkitId" IN (
  //       SELECT id
  //       FROM mealkit
  //       WHERE "creatorId" = '${req.session.userId}'
  //     AND "orderId" IS NOT NULL
  //     )
  //     `
  //   );

  //   // cartItems.map(async (cartItem: CartItem, index: number) => {
  //   //   const mealkit = await Mealkit.findOne(cartItem.mealkitId);
  //   //   const user = await User.findOne(cartItem.userId);
  //   //   const address = await Address.findOne({
  //   //     where: { userId: cartItem.userId },
  //   //   });
  //   //   cartItems[index].mealkit = mealkit;
  //   //   cartItems[index].user = user;
  //   //   cartItems[index].user.address = address;
  //   // });
  //   console.log(cartItems);
  //   return cartItems.map(async (cartItem: CartItem, index: number) => {
  //     const mealkit = await Mealkit.findOne(cartItem.mealkitId);
  //     const user = await User.findOne(cartItem.userId);
  //     const address = await Address.findOne({
  //       where: { userId: cartItem.userId },
  //     });
  //     const tracking = await Tracking.findOne({ id: cartItem.trackingId });
  //     mealkit && (cartItem.mealkit = mealkit);
  //     user && (cartItem.user = user);
  //     address && (cartItem.user.address = address);
  //     tracking && (cartItem.tracking = tracking);
  //     return cartItem;
  //   });
  // }

  //look for me as a user's orders
  @UseMiddleware(isAuth)
  @Query(() => [CartItemsByOrderFormat])
  async userOrders(
    @Arg("status", () => CartItemStatus) status: CartItemStatus,
    @Ctx() { req, res }: MyContext
  ): Promise<CartItemsByOrderFormat[] | undefined> {
    const cartItems = await CartItem.find({
      where: {
        status: status,
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

  // @UseMiddleware(isAuth)
  // @Query(() => [CartItem])
  // async cartItemsByOrderFormatStatus(
  //   @Arg("status", () => OrderStatus) status: OrderStatus,
  //   @Ctx() { req, res }: MyContext
  // ): Promise<CartItem[] | undefined> {
  //   // const orders = await CartItem.find({
  //   //   where: { userId: req.session.userId },
  //   //   // relations: ["", "cartItems.mealkit", "payment"],
  //   // });

  //   const cartItems = await getConnection().query(
  //     `
  //     SELECT *
  //     FROM cart_item
  //     INNER JOIN "order"
  //     ON cart_item."orderId"="order".id
  //     WHERE "order".status = '${status}'
  //     AND "order"."userId" = '${req.session.userId}'
  //     AND "orderId" IS NOT NULL
  //     `
  //   );

  //   return cartItems.map(async (cartItem: CartItem) => {
  //     cartItem.mealkit = (await Mealkit.findOne(cartItem.mealkitId)) as Mealkit;
  //     cartItem.mealkit.creator = (await User.findOne(
  //       cartItem.mealkit.creatorId
  //     )) as User;
  //     cartItem.tracking = (await Tracking.findOne({
  //       id: cartItem.trackingId,
  //     })) as Tracking;
  //     return cartItem;
  //   });
  // }

  @UseMiddleware(isAuth)
  @Query(() => [MappedCreatorOrders])
  async creatorOrders(
    @Arg("status", () => CartItemStatus) status: CartItemStatus,
    @Ctx() { req, res }: MyContext
  ): Promise<MappedCreatorOrders[] | Error | undefined> {
    const cartItems = await CartItem.find({
      where: {
        status: status,
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
    } else {
      return new Error("no cart items");
      // return undefined;
    }
  }
}
