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

//we need to make TypeGraphQL aware of the enums manually by calling the registerEnumType function and providing the enum name for GraphQL (accotding to Doc)
registerEnumType(OrderStatus, {
  name: "OrderStatus",
});

@Resolver()
export class OrderResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Order)
  async createOrder(
    @Ctx() { req, res }: MyContext,
    @Arg("cartItemIds", () => [Int]) cartItemIds: number[],
    @Arg("grossOrder", () => Int) grossOrder: number //need Int due to reflection system
  ): Promise<Order | undefined> {
    // loop through every cartItem
    // orderId

    const order = await Order.create({
      grossOrder: grossOrder,
      status: OrderStatus.PaymentPending,
      userId: "5619ffb2-6ce2-42cf-bd5c-042f2685a045",
      //   cartItemId: 123,
      //   paymentId: 123
    }).save();

    cartItemIds.forEach(async (cartItemId) => {
      await getConnection()
        .createQueryBuilder()
        .update(CartItem)
        .set({ orderId: order.id })
        .where("id = :id", { id: cartItemId })
        .execute();
    });

    // qr
    const base64raw = await createScbQr(grossOrder, req.session.userId!);
    const base64Text = `data:image/png;base64, ${base64raw.data.qrImage}`;
    // S3
    const now = Date.now().toString();
    // s3 signed request
    const qrParams = s3Params(`${req.session.userId}/${now}`, "utf-8");
    const signedRequest = s3.getSignedUrl("putObject", qrParams);
    const url = `https://${s3Bucket}.s3.amazonaws.com/${req.session.userId}/${now}`;
    //s3 signed request done

    // save to S3 start
    const options = {
      headers: {
        "Content-Type": "utf-8",
      },
    };

    // await axios.put(signedRequest, image, options);
    await axios.put(signedRequest, base64Text, options);
    // save to S3 done
    // save url to database
    await Payment.create({
      amount: grossOrder,
      qrUrl: url,
    }).save();

    return order;
  }

  @UseMiddleware(isAuth)
  @Query(() => [CartItem])
  async cartItems(
    @Arg("status", () => OrderStatus) status: OrderStatus,
    @Ctx() { req, res }: MyContext
  ): Promise<CartItem[] | undefined> {
    // let cartItems: CartItem[] | undefined = [];

    // await getConnection().transaction(async (tm) => {
    // 1. select orderId by userId and status from Order
    // 2. select data from Cartitem by orderId
    //   const orderIds = await tm.query(
    //     `
    //   SELECT id
    //   FROM "order"
    //   WHERE "userId" = $1 AND "status" = $2;
    //   `,
    //     [req.session.userId, status]
    //   );
    //   let idsArray: number[] = [];
    //   orderIds.forEach((idObj: any) => {
    //     idsArray.push(idObj.id);
    //   });

    //   let arrayForIN: string | null;
    //   if (idsArray.length > 0) {
    //     arrayForIN = "(" + idsArray.join() + ")";
    //   } else {
    //     arrayForIN = null;
    //   }

    //   cartItems = await tm.query(
    //     `
    //   SELECT *
    //   FROM "cart_item"
    //   ${
    //     arrayForIN
    //       ? `WHERE "orderId" IN ${arrayForIN}`
    //       : `WHERE "orderId" IN (0)`
    //   }
    //  ;
    //   `
    //   );
    // });

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

  @UseMiddleware(isAuth)
  @Query(() => [CartItem])
  async creatorCartItems(
    @Arg("status", () => OrderStatus) status: OrderStatus,
    @Ctx() { req, res }: MyContext
  ) {
    // 1. select cartItems which have mealkit.creatorId = currentUser and has orderId
    // 2. only pick cartItem which order status matches

    // const cartItems = await getConnection().query(
    //   `
    //   SELECT *
    //   FROM cart_item
    //   WHERE "mealkitId" IN (
    //     SELECT id
    //     FROM mealkit
    //     WHERE "creatorId" = '${req.session.userId}'
    //   AND "orderId" IS NOT NULL
    //   )
    //   `
    // );

    // const cartItems2 = await getConnection().query(
    //   `
    //   SELECT cart_item.id
    //   FROM cart_item
    //   INNER JOIN "order"
    //   ON cart_item."orderId"="order".id
    //   WHERE "order".status = '${status}'
    //   `
    // );

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

    cartItems.forEach((cartItem: CartItem, index: number) => {
      const mealkit = Mealkit.findOne(cartItem.mealkitId);
      cartItems[index].mealkit = mealkit;
    });
    console.log(cartItems);
    return cartItems;
  }
  @UseMiddleware(isAuth)
  @Query(() => [Order])
  async myOrders(
    @Arg("status", () => OrderStatus) status: OrderStatus,
    @Ctx() { req, res }: MyContext
  ): Promise<Order[] | undefined> {
    const orders = await Order.find({
      where: { userId: req.session.userId, status: status },
      relations: ["cartItems", "cartItems.mealkit", "payment"],
    });

    return orders;
  }
}
