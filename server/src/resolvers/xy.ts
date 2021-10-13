import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { X } from "../entities/X";
import { Y } from "../entities/Y";

@Resolver()
export class XyResolver {
  @Query(() => String)
  xy() {
    return "helloasdfasdfsss world resolver";
  }

  @Mutation(() => X)
  async createX(@Arg("yId") yId: number) {
    const x = await X.create({ yId: yId }).save();
    return x;
  }

  @Mutation(() => Y)
  async createY() {
    const y = await Y.create().save();
    return y;
  }

  @Query(() => Y)
  async y(@Arg("id") id: number) {
    const y = await Y.findOne(id);
    return y;
  }
}

// @Arg("xId") xId: number
