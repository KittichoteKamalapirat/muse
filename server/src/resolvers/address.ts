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
import { Address } from "../entities/Address";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";

@InputType()
class AddressInput {
  @Field()
  name: string;
  @Field()
  phonenumber: string;
  @Field()
  line1: string;
  @Field()
  line2: string;
  @Field()
  subdistrict: string;
  @Field()
  district: string;
  @Field()
  province: string;
  @Field()
  country: string;
  @Field()
  postcode: string;
}

@InputType()
class ProfileInput {
  @Field()
  address: AddressInput;
  @Field()
  avatarUrl: string;
}

@Resolver()
export class AddressResolver {
  @Query(() => Address)
  async address(@Ctx() { req }: MyContext): Promise<Address | undefined> {
    return Address.findOne({ userId: req.session.userId });
  }
  @Mutation(() => Address)
  @UseMiddleware(isAuth)
  async createAddress(
    @Arg("input") input: AddressInput,
    @Ctx() { req }: MyContext
  ): Promise<Address> {
    return Address.create({ ...input, userId: req.session.userId }).save();
  }

  @Mutation(() => Address, { nullable: true })
  @UseMiddleware(isAuth) //have to log in to update a post
  async updateAddress(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: AddressInput,
    @Ctx() { req }: MyContext
  ): Promise<Address | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Address)
      .set({
        name: input.name,
        phonenumber: input.phonenumber,
        line1: input.line1,
        line2: input.line2,
        subdistrict: input.subdistrict,
        district: input.district,
        province: input.province,
        country: input.country,
        postcode: input.postcode,
      })
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
  async deleteAddress(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await Address.delete({ id: id, userId: req.session.userId });
    return true;
  }
}
