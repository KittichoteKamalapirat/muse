import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Box, Address } from "../entities";
import BoxInput from "../entities/utils/box/BoxInput";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";

@Resolver(Box)
export class BoxResolver {
  @Query(() => [Box])
  async boxes(): Promise<Box[]> {
    try {
      console.log("finding boxes");
      const events = await Box.find();
      return events;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  @Query(() => Box)
  async box(@Arg("id") id: string): Promise<Box | null | undefined> {
    try {
      const box = await Box.findOne({
        where: { id },
        relations: [],
      });
      return box;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Mutation(() => Box)
  @UseMiddleware(isAuth)
  async createBox(
    @Arg("input") input: BoxInput,
    @Arg("addressId", () => String) addressId: string,
    @Ctx() { req }: MyContext
  ): Promise<Box | Error> {
    try {
      if (!input.name) {
        console.log("name is empty");
        const address = await Address.findOne(addressId);
        if (address) input.name = address.name;
      }
      console.log("name is not empty");
      const box = await Box.create({
        ...input,
        creatorId: req.session.userId,
        addressId,
      }).save();
      return box;
    } catch (error) {
      //   rollbar.log(error);
      throw new Error("cannot create a box");
    }
  }
}
