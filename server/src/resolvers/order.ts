import {
  Arg,
  Ctx,
  Field,
  ID,
  InputType,
  Int,
  Mutation,
  Query,
  registerEnumType,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { CartItem } from "../entities/CartItem";
import { Mealkit } from "../entities/Mealkit";
import { Order, OrderStatus } from "../entities/Order";
import { Payment } from "../entities/Payment";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";
import { s3, s3Params } from "../utils/s3";
import { createScbQr, scbToken } from "./payment";
import axios from "axios";
import { s3Bucket } from "../constants";
import { User } from "../entities/User";
import { Address } from "../entities/Address";
import { Tracking } from "../entities/Tracking";

//we need to make TypeGraphQL aware of the enums manually by calling the registerEnumType function and providing the enum name for GraphQL (accotding to Doc)
registerEnumType(OrderStatus, {
  name: "OrderStatus",
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
      status: OrderStatus.PaymentPending,
      cartItemsByCreator: cartItemsByCreatorInput,
      userId: req.session.userId,
      paymentId: payment.id,
      //   cartItemId: 123,
    }).save();

    // save to S3 start
    const options = {
      headers: {
        "Content-Type": "utf-8",
      },
    };
    // qr
    const base64raw = await createScbQr(
      grossOrder,
      req.session.userId!,
      order.id
    );
    const base64Text = `data:image/png;base64, ${base64raw.data.qrImage}`;
    // await axios.put(signedRequest, image, options);
    await axios.put(signedRequest, base64Text, options);
    // save to S3 done
    // save url to database

    // loop through every cartItem
    // orderId

    cartItemIds.forEach(async (cartItemId) => {
      await getConnection()
        .createQueryBuilder()
        .update(CartItem)
        .set({ orderId: order.id })
        .where("id = :id", { id: cartItemId })
        .execute();
    });

    return order;
  }

  @UseMiddleware(isAuth)
  @Query(() => [CartItem])
  async orderItems(
    @Arg("status", () => OrderStatus) status: OrderStatus,
    @Ctx() { req, res }: MyContext
  ): Promise<CartItem[] | undefined> {
    const cartItems = await getConnection().query(
      `
      SELECT *
      FROM "cart_item"
      WHERE "orderId" IN (
        SELECT id
        FROM "order"
        WHERE "userId" = '${req.session.userId}' AND "status" = '${status}' 
        );
        `
    );

    cartItems.forEach(async (cartItem: CartItem, index: number) => {
      console.log(index);
      const mealkit = Mealkit.findOne(cartItem.mealkitId);
      cartItems[index].mealkit = mealkit;
    });
    console.log(cartItems);
    return cartItems;
  }

  //get orderItems for current creator
  // by status
  // has orderId -> already ordered
  //the mealkits in the order belongs to the current creator
  @UseMiddleware(isAuth)
  @Query(() => [CartItem])
  async creatorOrderItems(
    @Arg("status", () => OrderStatus) status: OrderStatus,
    @Ctx() { req, res }: MyContext
  ): Promise<CartItem[]> {
    const cartItems = await getConnection().query(
      `
      SELECT *
      FROM cart_item
      INNER JOIN "order"
      ON cart_item."orderId"="order".id 
      WHERE "order".status = '${status}'
      AND "mealkitId" IN (
        SELECT id
        FROM mealkit
        WHERE "creatorId" = '${req.session.userId}'
      AND "orderId" IS NOT NULL
      )
      `
    );

    // cartItems.map(async (cartItem: CartItem, index: number) => {
    //   const mealkit = await Mealkit.findOne(cartItem.mealkitId);
    //   const user = await User.findOne(cartItem.userId);
    //   const address = await Address.findOne({
    //     where: { userId: cartItem.userId },
    //   });
    //   cartItems[index].mealkit = mealkit;
    //   cartItems[index].user = user;
    //   cartItems[index].user.address = address;
    // });
    console.log(cartItems);
    return cartItems.map(async (cartItem: CartItem, index: number) => {
      const mealkit = await Mealkit.findOne(cartItem.mealkitId);
      const user = await User.findOne(cartItem.userId);
      const address = await Address.findOne({
        where: { userId: cartItem.userId },
      });
      const tracking = await Tracking.findOne({ id: cartItem.trackingId });
      mealkit && (cartItem.mealkit = mealkit);
      user && (cartItem.user = user);
      address && (cartItem.user.address = address);
      tracking && (cartItem.tracking = tracking);
      return cartItem;
    });
  }

  @UseMiddleware(isAuth)
  @Query(() => [Order])
  async myOrders(
    @Arg("status", () => OrderStatus) status: OrderStatus,
    @Ctx() { req, res }: MyContext
  ): Promise<Order[] | undefined> {
    const orders = await Order.find({
      where: { userId: req.session.userId, status: status },
      relations: [
        "cartItems",
        "cartItems.mealkit",
        "cartItems.mealkit.creator",
        "payment",
      ],
    });

    return orders;
  }

  @UseMiddleware(isAuth)
  @Query(() => [CartItem])
  async cartItemsByOrderStatus(
    @Arg("status", () => OrderStatus) status: OrderStatus,
    @Ctx() { req, res }: MyContext
  ): Promise<CartItem[] | undefined> {
    // const orders = await CartItem.find({
    //   where: { userId: req.session.userId },
    //   // relations: ["", "cartItems.mealkit", "payment"],
    // });

    const cartItems = await getConnection().query(
      `
      SELECT *
      FROM cart_item
      INNER JOIN "order"
      ON cart_item."orderId"="order".id 
      WHERE "order".status = '${status}'
      AND "order"."userId" = '${req.session.userId}'
      AND "orderId" IS NOT NULL
      `
    );

    return cartItems.map(async (cartItem: CartItem) => {
      cartItem.mealkit = (await Mealkit.findOne(cartItem.mealkitId)) as Mealkit;
      cartItem.mealkit.creator = (await User.findOne(
        cartItem.mealkit.creatorId
      )) as User;
      return cartItem;
    });
  }
}
