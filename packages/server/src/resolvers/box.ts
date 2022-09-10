import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  registerEnumType,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { In } from "typeorm";
import { Box, Address, JoinBox } from "../entities";
import { BoxTypeEnum } from "../entities/Box";
import BoxInput from "../entities/utils/box/BoxInput";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";

registerEnumType(BoxTypeEnum, {
  name: "BoxTypeEnum",
});

@Resolver(Box)
export class BoxResolver {
  @FieldResolver(() => Boolean, { nullable: true })
  async isJoined(@Root() box: Box, @Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    const { userId } = req.session;
    const boxId = box.id;
    const matchedJoinBox = await JoinBox.findOne({ where: { userId, boxId } });
    if (!matchedJoinBox) return false;
    return true;
  }

  @Query(() => [Box])
  async boxes(): Promise<Box[]> {
    try {
      console.log("finding boxes");
      const events = await Box.find({
        relations: [
          "address",
          "songRequests",
          "songRequests.song",
          "songRequests.requester",
        ],
      });
      return events;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  @Query(() => [Box])
  @UseMiddleware(isAuth)
  async joinedBoxes(@Ctx() { req }: MyContext): Promise<Box[]> {
    const joinBoxes = await JoinBox.find({
      where: { userId: req.session.userId },
    });

    const joinedBoxesIds: string[] = joinBoxes.map((u) => u.boxId);

    const joinedBoxes = await Box.find({ where: { id: In(joinedBoxesIds) } });

    return joinedBoxes;
  }

  @Query(() => Box)
  async box(@Arg("id") id: string): Promise<Box | null | undefined> {
    try {
      const box = await Box.findOne({
        where: { id },
        relations: [
          "address",
          "songRequests",
          "songRequests.song",
          "songRequests.requester",
        ],
      });
      return box;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // TODO: use link with location
  // @Mutation(() => Box)
  // @UseMiddleware(isAuth)
  // async createBox(
  //   @Arg("input") input: BoxInput,
  //   @Arg("addressId", () => String) addressId: string,
  //   @Ctx() { req }: MyContext
  // ): Promise<Box | Error> {
  //   try {
  //     if (!input.name) {
  //       console.log("name is empty");
  //       const address = await Address.findOne(addressId);
  //       if (address) input.name = address.name;
  //     }
  //     console.log("name is not empty");
  //     const box = await Box.create({
  //       ...input,
  //       creatorId: req.session.userId,
  //       addressId,
  //     }).save();
  //     return box;
  //   } catch (error) {
  //     //   rollbar.log(error);
  //     throw new Error("cannot create a box");
  //   }
  // }

  // TODO remove this later
  @Mutation(() => Box)
  @UseMiddleware(isAuth)
  async createBox(
    @Arg("input") input: BoxInput,
    @Ctx() { req }: MyContext
  ): Promise<Box | Error> {
    try {
      console.log("create box input", input);
      console.log("req session", req.session);
      const address = await Address.create({
        name: input.addressName,
      }).save();

      const { name, type, description, startTime, endTime } = input;
      const box = await Box.create({
        name,
        type,
        description,
        startTime,
        endTime,
        addressId: address.id,
        creatorId: req.session.userId,
      }).save();

      return box;
    } catch (error) {
      //   rollbar.log(error);
      throw new Error("cannot create a box");
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async joinBox(
    @Arg("boxId") boxId: string,
    @Ctx() { req }: MyContext
  ): Promise<Boolean | Error> {
    try {
      const { userId } = req.session;
      await JoinBox.create({
        boxId,
        userId,
      }).save();

      return true;
    } catch (error) {
      //   rollbar.log(error);
      throw new Error("cannot join this event");
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async unjoinBox(
    @Arg("boxId") boxId: string,
    @Ctx() { req }: MyContext
  ): Promise<Boolean | Error> {
    try {
      const { userId } = req.session;
      await JoinBox.delete({
        boxId,
        userId,
      });

      return true;
    } catch (error) {
      //   rollbar.log(error);
      throw new Error("cannot join this event");
    }
  }
}
