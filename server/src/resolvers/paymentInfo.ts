import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { PaymentInfo } from "../entities/PaymentInfo";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";
import { FieldError } from "../utils/FieldError";
import { validatePaymentInfo } from "../utils/validatePaymentInfo";

@InputType()
export class PaymentInfoInput {
  @Field()
  bankAccount: string;
  @Field()
  bankCode: string;
}

@ObjectType()
class PaymentInfoResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => PaymentInfo, { nullable: true })
  paymentInfo?: PaymentInfo;
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

  @Mutation(() => PaymentInfoResponse)
  @UseMiddleware(isAuth)
  async createPaymentInfo(
    @Ctx() { req }: MyContext,
    @Arg("input") input: PaymentInfoInput
  ): Promise<PaymentInfoResponse> {
    const errors = validatePaymentInfo(input);
    if (errors) return { errors: errors };

    const paymentInfo = await PaymentInfo.create({
      ...input,
      userId: req.session.userId,
    }).save();
    return { paymentInfo: paymentInfo };
  }

  @Mutation(() => PaymentInfoResponse, { nullable: true })
  @UseMiddleware(isAuth)
  async updatePaymentInfo(
    @Ctx() { req }: MyContext,
    @Arg("id", () => Int) id: number,
    @Arg("input") input: PaymentInfoInput
  ): Promise<PaymentInfoResponse> {
    const errors = validatePaymentInfo(input);
    if (errors) return { errors: errors };

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
    return { paymentInfo: result.raw[0] };
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
