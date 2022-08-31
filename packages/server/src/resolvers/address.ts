import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Address } from "../entities";
import { MyContext } from "../types";

@Resolver(Address)
export class AddressResolver {
  @Query(() => [Address])
  async addresses(): Promise<Address[]> {
    try {
      const addresses = await Address.find();
      return addresses;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  @Query(() => Address)
  async address(@Arg("id") id: string): Promise<Address | null | undefined> {
    try {
      const address = await Address.findOne({
        where: { id },
        relations: [],
      });
      return address;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Mutation(() => Address)
  //   @UseMiddleware(isAuth)
  async createAddress(
    @Arg("name") name: string,
    @Ctx() { req }: MyContext
  ): Promise<Address | Error> {
    try {
      const address = await Address.create({
        name,
      }).save();
      return address;
    } catch (error) {
      //   rollbar.log(error);
      throw new Error("cannot create a address");
    }
  }
}
