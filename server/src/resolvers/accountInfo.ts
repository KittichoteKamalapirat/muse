import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { AccountInfo } from "../entities/AccountInfo";
import { MyContext } from "../types";

@InputType()
class AccountInfoInput {
  @Field()
  address: string;
  @Field()
  mobileNumber: string;
  @Field()
  avatarUrl: string;
}

@Resolver()
export class AccountInfoResolver {
  @Query(() => AccountInfo)
  async accountInfo(
    @Ctx() { req }: MyContext
  ): Promise<AccountInfo | undefined> {
    return AccountInfo.findOne({ userId: req.session.userId });
  }
  @Mutation(() => AccountInfo)
  async createAccountInfo(
    @Arg("input") input: AccountInfoInput,
    @Ctx() { req }: MyContext
  ): Promise<AccountInfo> {
    return AccountInfo.create({ ...input, userId: req.session.userId }).save();
  }
}
