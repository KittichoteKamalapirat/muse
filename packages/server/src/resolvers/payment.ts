/* eslint-disable class-methods-use-this */
import { PubSub } from "graphql-subscriptions";
import fetch from "node-fetch";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
// import generatePayload from "promptpay-qr";
import { CartItemStatus } from "../entities/CartItem";
import {} from "../entities/Order";
import { Payment, Order, CartItem } from "../entities";
import { ConfirmationResponse } from "../entities/utils";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";

export const pubsub = new PubSub();

// const qrcode = require('qrcode ')
// const generatePaylload = require('promptpay-qr')

export const getScbToken = async () => {
  try {
    const authenticationHeaders = {
      headers: {
        "Content-Type": "application/json",
        resourceOwnerId: process.env.SCB_API_KEY,
        requestUId: "uniqueIdentifier",
        // "accept-language": "EN", //or "TH"
      },
      method: "POST",
      body: JSON.stringify({
        applicationKey: process.env.SCB_API_KEY,
        applicationSecret: process.env.SCB_API_SECRET,
      }),
    };
    const response = await fetch(process.env.GENERATE_SCB_ACCESS_TOKEN_URL, {
      ...authenticationHeaders,
    });
    // const body = await response.text();
    const data: any = await response.json();
    const token: string = data.data.accessToken;
    return token;
  } catch (error) {
    return "";
  }
};

export const createScbQr = async (amount: number, orderId: number) => {
  try {
    const token = await getScbToken();

    const qrHeaders = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept-language": "EN", // or "TH"
        // authorization: `Bearer ${token}`,
        authorization: `Bearer ${token}`,
        requestUId: "uniqueIdentifier",
        // resourceOwnerId: SCB_API_KEY,
        resourceOwnerId: process.env.SCB_API_KEY,
      },

      // comment out code before testing with scb
      // body: JSON.stringify({ =>
      //   qrType: "PP", //QR30
      //   ppType: "BILLERID", //change later
      //   ppId: BILLER_ID,
      //   amount: amount,
      //   ref1: orderId.toString(),
      //   // ref1: "REFERENCE1",
      //   // ref2: "REFERENCE2",
      //   // ref2: orderId.toString(),
      //   ref3: "SCB", // -> NEED UNTIL THIS
      // }),

      body: JSON.stringify({
        qrType: "PP", // somehow meaning QR30
        ppType: "BILLERID", // change later
        ppId: "110330017933201", // Partners can get on merchant profile of their application.
        amount,
        ref1: orderId.toString(),
        ref2: "PLACEHOLDER", // ref2 is also required since I applied like to, number or UPPERCASE string less length <= 20
        ref3: "CKN", // -> NEED UNTIL THIS
      }),
    };

    const response = await fetch(process.env.REQUEST_CREATE_SCB_QR30_URL, {
      ...qrHeaders,
    });

    const data: any = await response.json();

    return data;
  } catch (error) {
    return null;
  }
};

@Resolver()
export class PaymentResolver {
  @Query(() => Payment)
  @UseMiddleware(isAuth)
  async payment(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Payment | undefined> {
    // const payment = await Payment.findOne({ where: { id: id } });

    // const result = await getConnection()
    //   .createQueryBuilder()
    //   .select("payment")
    //   .leftJoinAndSelect("payment.order", "order")
    //   .leftJoinAndSelect("order.user", "user")
    //   .where("order.userId=:userId", { userId: req.session.userId });
    try {
      // const payment = await Payment.findOne({ where: { id: id } });
      const payment = await getConnection().query(
        `SELECT payment.* FROM payment
      LEFT JOIN "order"
      ON payment.id = "order"."paymentId"
      LEFT JOIN "user"
      ON "user".id = "order"."userId"
      WHERE payment.id = ${id} AND "user".id = '${req.session.userId}';`
      );

      return payment[0];
    } catch (error) {
      return undefined;
    }
  }

  // check
  // 1) the refs exists
  // 2) the sender and the receiver
  // 3) the amount = paidamount?
  @Query(() => ConfirmationResponse)
  @UseMiddleware(isAuth)
  async confirmPayment(
    @Arg("transRef") transRef: string,
    @Arg("sendingBank") sendingBank: string
  ): Promise<ConfirmationResponse | undefined> {
    try {
      const token = await getScbToken();
      const requestOptions = {
        headers: {
          resourceOwnerId: process.env.SCB_API_KEY,
          requestUId: "later",
          authorization: `Bearer ${token}`,
        },
      };
      const ref = "202110172ueu2uNvKkMU5LJ";

      // sand box
      // const response = await fetch(
      //   `https://api-sandbox.partners.scb/partners/sandbox/v1/payment/billpayment/transactions/${ref}?sendingBank=${sendingBank}
      //   `,
      //   { ...requestOptions }
      // );

      // prod
      const response = await fetch(
        `https://api.partners.scb/partners/v1/payment/billpayment/transactions/${ref}?sendingBank=${sendingBank}`,
        { ...requestOptions }
      );

      if (response.status === 200) {
        const data = (await response.json()) as ConfirmationResponse;
        // const data = await response.text();
        return data;
      }

      throw Error;
    } catch (error) {
      return undefined;
    }
  }

  @UseMiddleware(isAuth)
  @Query(() => Boolean)
  async manuallyConfirmPayment(
    @Arg("paymentId", () => Int) paymentId: number
  ): Promise<boolean | Error> {
    try {
      // check whether all the cartitems associated to this paymentId (orderId) have the status ToDelivery or not
      const statusArray: { status: CartItemStatus }[] = await getConnection()
        .query(`
      SELECT status
      FROM cart_item
      LEFT JOIN "order"
      ON cart_item."orderId" = "order".id
      WHERE "order"."paymentId" = '${paymentId}';
    `);

      const { length } = statusArray;

      const paidItems = statusArray.filter(
        (status) => status.status === CartItemStatus.ToDeliver
      );
      const paidLength = paidItems.length;

      if (length === paidLength) {
        return true;
      }
      return false;
    } catch (error) {
      return new Error("Payment confirmation failed");
    }
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async uploadSlip(
    @Arg("paymentId", () => Int) paymentId: number,
    @Arg("slipUrl") slipUrl: string
  ) {
    try {
      await Payment.update({ id: paymentId }, { slipUrl });
      return true;
    } catch (error) {
      return false;
    }
  }

  @UseMiddleware(isAuth)
  @Query(() => Boolean)
  async paymentIsComplete(@Arg("paymentId", () => Int) paymentId: number) {
    const order = await Order.findOne({ where: { paymentId } });
    const cartItems = await CartItem.find({ where: { orderId: order?.id } });
    const paidItems = cartItems.filter(
      (item) => item.status === CartItemStatus.ToDeliver
    );
    if (paidItems.length === cartItems.length) {
      return true;
    }
    return false;
  }
}

// export async function generateQr() {
//   const mobilenumber = "0961489046";
//   const amount = 20; // THB;
//   const payload = generatePayload(mobilenumber, { amount });
//   qrcode.toFile("./imageQR/result.png", payload, (err) => {
//     if (err) throw err;

//   });
// }
