import fetch from "node-fetch";
// import generatePayload from "promptpay-qr";
import {
  BILLER_ID,
  GENERATE_SCB_ACCESS_TOKEN_URL_UAT,
  REQUEST_CREATE_SCB_QR30_URL_UAT,
  SCB_API_KEY_UAT,
} from "../constants";
import { SCB_API_SECRET_UAT } from "../constants";
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Subscription,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middlware/isAuth";
import { s3, s3Params } from "../utils/s3";
import { MyContext } from "../types";
import axios from "axios";
import { Payment } from "../entities/Payment";
import { PubSub } from "graphql-subscriptions";
import { Connection, getConnection } from "typeorm";
import { CartItem, CartItemStatus } from "../entities/CartItem";
import { OrderStatus } from "aws-sdk/clients/outposts";
import { Order } from "../entities/Order";

export const pubsub = new PubSub();

// const qrcode = require('qrcode ')
// const generatePaylload = require('promptpay-qr')

@ObjectType()
class Status {
  @Field()
  code: number;
  @Field()
  description: string;
}

@ObjectType()
class QrData {
  @Field()
  qrRawData: string;
  @Field()
  qrImage: string;
}

@ObjectType()
class qrOutput {
  @Field(() => Status)
  status: Status;
  @Field(() => QrData)
  data: QrData;
}

@ObjectType()
class TypeAndValue {
  @Field()
  type: string;
  @Field()
  value: string;
}

@ObjectType()
class Account {
  @Field(() => Status)
  status: Status;
  @Field(() => QrData)
  data: QrData;
}

@ObjectType()
class Person {
  @Field()
  displayName: string;
  @Field()
  name: string;
  @Field(() => TypeAndValue)
  proxy: TypeAndValue;
  @Field(() => TypeAndValue)
  account: TypeAndValue;
}
//confirmation
@ObjectType()
class ConfirmData {
  @Field()
  transRef: string;
  @Field()
  sendingBank: string;
  @Field()
  receivingBank: string;
  @Field()
  transDate: string;
  @Field()
  transTime: string;
  @Field(() => Person)
  sender: Person;
  @Field(() => Person)
  receiver: Person;
  @Field()
  amount: string;
  @Field()
  paidLocalAmount: string;
  @Field()
  paidLocalCurrency: string;
  @Field()
  countryCode: string;
  @Field()
  ref1: string;
  @Field()
  ref2: string;
  @Field()
  ref3: string;
}

@ObjectType()
class ConfirmationResponse {
  @Field(() => Status)
  status: Status;
  @Field((type) => ConfirmData)
  data: ConfirmData;
}

export const getScbToken = async () => {
  try {
    const authentication_headers = {
      headers: {
        "Content-Type": "application/json",
        resourceOwnerId: SCB_API_KEY_UAT,
        requestUId: "uniqueIdentifier",
        // "accept-language": "EN", //or "TH"
      },
      method: "POST",
      body: JSON.stringify({
        applicationKey: SCB_API_KEY_UAT,
        applicationSecret: SCB_API_SECRET_UAT,
      }),
    };
    const response = await fetch(GENERATE_SCB_ACCESS_TOKEN_URL_UAT, {
      ...authentication_headers,
    });
    // const body = await response.text();
    const data: any = await response.json();
    const token = data.data.accessToken;
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const createScbQr = async (amount: number, orderId: number) => {
  try {
    const token = await getScbToken();
    console.log({ token });
    const qr_headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept-language": "EN", //or "TH"
        // authorization: `Bearer ${token}`,
        authorization: `Bearer ${token}`,
        requestUId: "uniqueIdentifier",
        // resourceOwnerId: SCB_API_KEY,
        resourceOwnerId: SCB_API_KEY_UAT,
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
        qrType: "PP", //somehow meaning QR30
        ppType: "BILLERID", //change later
        ppId: "110330017933201", //Partners can get on merchant profile of their application.
        amount: amount,
        ref1: orderId.toString(),
        ref2: "PLACEHOLDER", //ref2 is also required since I applied like to, number or UPPERCASE string less length <= 20
        ref3: "CKN", // -> NEED UNTIL THIS
      }),
    };

    console.log("qr headers");
    console.log(qr_headers);
    const response = await fetch(REQUEST_CREATE_SCB_QR30_URL_UAT, {
      ...qr_headers,
    });
    console.log({ response });

    const data: any = await response.json();

    return data;
  } catch (error) {
    console.log(error);
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
      console.log(error);
      return undefined;
    }
  }

  //check
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
          resourceOwnerId: SCB_API_KEY_UAT,
          requestUId: "later",
          authorization: `Bearer ${token}`,
        },
      };
      const ref = "202110172ueu2uNvKkMU5LJ";

      const response = await fetch(
        `https://api-sandbox.partners.scb/partners/sandbox/v1/payment/billpayment/transactions/${ref}?sendingBank=${sendingBank}
        `,
        { ...requestOptions }
      );
      if (response.status === 200) {
        console.log({ response });
        const data = (await response.json()) as ConfirmationResponse;
        // const data = await response.text();
        console.log({ data });
        console.log(data.data.sender);
        console.log(data.data.receiver);
        return data;
      } else {
        console.log("error");
        throw Error;
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  @UseMiddleware(isAuth)
  @Query(() => Boolean)
  async manuallyConfirmPayment(
    @Arg("paymentId", () => Int) paymentId: number
  ): Promise<boolean | Error> {
    try {
      //check whether all the cartitems associated to this paymentId (orderId) have the status ToDelivery or not
      const statusArray: { status: CartItemStatus }[] = await getConnection()
        .query(`
      SELECT status
      FROM cart_item
      LEFT JOIN "order"
      ON cart_item."orderId" = "order".id
      WHERE "order"."paymentId" = '${paymentId}';
    `);

      const length = statusArray.length;

      const paidItems = statusArray.filter(
        (status) => status.status == CartItemStatus.ToDeliver
      );
      const paidLength = paidItems.length;

      if (length === paidLength) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
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
      await Payment.update({ id: paymentId }, { slipUrl: slipUrl });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //   @UseMiddleware(isAuth)
  //   @Query(() => Boolean)
  //   async paymentIsComplete(@Arg("paymentId", () => Int) paymentId: number) {
  //     const order = await Order.findOne({ where: { paymentId } });
  //     const cartItems = await CartItem.find({ where: { orderId: order?.id } });
  //     const paidItems = cartItems.filter((item) => {
  //       return item.status === CartItemStatus.ToDeliver;
  //     });
  //     if (paidItems.length === cartItems.length) {
  //       console.log("true");
  //       return true;
  //     } else {
  //       console.log("false");
  //       return false;
  //     }
  //   }
  // }

  // export async function generateQr() {
  //   const mobilenumber = "0961489046";
  //   const amount = 20; // THB;
  //   const payload = generatePayload(mobilenumber, { amount });
  //   console.log({ payload });
  //   console.log(qrcode);
  //   qrcode.toFile("./imageQR/result.png", payload, (err) => {
  //     if (err) throw err;
  //     console.log("complete");
  //   });
}
