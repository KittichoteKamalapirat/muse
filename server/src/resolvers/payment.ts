import fetch from "node-fetch";
// import generatePayload from "promptpay-qr";
import { BILLER_ID, SCB_API_KEY } from "../constants";
import { SCB_API_SECRET } from "../constants";
import {
  Arg,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middlware/isAuth";

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

const scbToken = async () => {
  try {
    const authentication_headers = {
      headers: {
        "Content-Type": "application/json",
        resourceOwnerId: SCB_API_KEY,
        requestUId: "later",
        // "accept-language": "EN", //or "TH"
      },
      method: "POST",
      body: JSON.stringify({
        applicationKey: SCB_API_KEY,
        applicationSecret: SCB_API_SECRET,
        // mode: "raw",
        // raw: "",
      }),
    };
    const response = await fetch(
      "https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token",
      { ...authentication_headers }
    );
    // const body = await response.text();
    const data: any = await response.json();
    const token = data.data.accessToken;
    return token;
  } catch (error) {
    console.log(error);
  }
};

@Resolver()
export class PaymentResolver {
  @Query(() => qrOutput)
  @UseMiddleware(isAuth)
  async createScbQr(
    // @Arg('requestId',() => String) requestId: string
    @Arg("amount", () => Int) amount: number
  ): Promise<qrOutput | undefined> {
    try {
      const token = await scbToken();
      console.log(token);

      const qr_headers = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept-language": "EN", //or "TH"
          authorization: `Bearer ${token}`,
          requestUId: "later",
          resourceOwnerId: SCB_API_KEY,
        },

        body: JSON.stringify({
          qrType: "PP", //QR30
          ppType: "BILLERID", //change later
          ppId: BILLER_ID,
          amount: amount,
          ref1: "REFERENCE1",
          ref2: "REFERENCE2",
          ref3: "SCB", // -> NEED UNTIL THIS
        }),
      };
      console.log(qr_headers.headers.authorization);

      const response = await fetch(
        "https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create",
        { ...qr_headers }
      );

      console.log({ response });
      const data: any = await response.json();
      console.log({ data });

      return data;
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
      const token = await scbToken();
      const requestOptions = {
        headers: {
          resourceOwnerId: SCB_API_KEY,
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
}

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
// }
