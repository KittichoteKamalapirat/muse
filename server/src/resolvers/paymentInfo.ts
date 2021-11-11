import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { PaymentInfo } from "../entities/PaymentInfo";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";

@InputType()
class PaymentInfoInput {
  @Field()
  bankAccount: string;
  @Field()
  bankCode: string;
}

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

  @Mutation(() => PaymentInfo)
  @UseMiddleware(isAuth)
  createPaymentInfo(
    @Ctx() { req }: MyContext,
    @Arg("input") input: PaymentInfoInput
  ): Promise<PaymentInfo> {
    return PaymentInfo.create({
      ...input,
      userId: req.session.userId,
    }).save();
  }

  @Mutation(() => PaymentInfo, { nullable: true })
  @UseMiddleware(isAuth)
  async updatePaymentInfo(
    @Ctx() { req }: MyContext,
    @Arg("id", () => Int) id: number,
    @Arg("input") input: PaymentInfoInput
  ): Promise<PaymentInfo> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(PaymentInfo)
      .set(input)
      .where('id = :id and "userId" = :userId', {
        id: id,
        userId: req.session.userId,
      })
      .returning("*")
      .execute();
    return result.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePaymentInfo(
    @Ctx() { req }: MyContext,
    @Arg("id", () => Int) id: number
  ) {
    await PaymentInfo.delete({ id: id, userId: req.session.userId });
    return true;
  }
}
