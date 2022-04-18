/* eslint-disable class-methods-use-this */
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
import { PaymentInfo, User } from "../entities";
import { PaymentInfoInput, PaymentInfoResponse } from "../entities/utils";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";
import { validatePaymentInfo } from "../utils/validatePaymentInfo";

@Resolver()
export class PaymentInfoResolver {
  @Query(() => PaymentInfo, { nullable: true })
  @UseMiddleware(isAuth)
  paymentInfo(
    // @Arg("id", () => Int) id: number
    @Ctx() { req }: MyContext
  ): Promise<PaymentInfo | undefined> {
    return PaymentInfo.findOne({ userId: req.session.userId });
  }

  @Mutation(() => PaymentInfoResponse)
  @UseMiddleware(isAuth)
  async createPaymentInfo(
    @Ctx() { req }: MyContext,
    @Arg("input") input: PaymentInfoInput
  ): Promise<PaymentInfoResponse> {
    const errors = validatePaymentInfo(input);
    if (errors) return { errors };

    const paymentInfo = await PaymentInfo.create({
      ...input,
      userId: req.session.userId,
    }).save();
    // have to update user as well

    await User.update(
      { id: req.session.userId },
      {
        paymentInfo,
      }
    );
    return { paymentInfo };
  }

  @Mutation(() => PaymentInfoResponse, { nullable: true })
  @UseMiddleware(isAuth)
  async updatePaymentInfo(
    @Ctx() { req }: MyContext,
    @Arg("id", () => Int) id: number,
    @Arg("input") input: PaymentInfoInput
  ): Promise<PaymentInfoResponse> {
    const errors = validatePaymentInfo(input);
    if (errors) return { errors };

    const result = await getConnection()
      .createQueryBuilder()
      .update(PaymentInfo)
      .set(input)
      .where('id = :id and "userId" = :userId', {
        id,
        userId: req.session.userId,
      })
      .returning("*")
      .execute();
    return { paymentInfo: result.raw[0] };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePaymentInfo(
    @Ctx() { req }: MyContext,
    @Arg("id", () => Int) id: number
  ) {
    await PaymentInfo.delete({ id, userId: req.session.userId });
    return true;
  }
}
