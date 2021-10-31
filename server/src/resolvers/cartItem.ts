import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { CartItem } from "../entities/CartItem";
import { Mealkit } from "../entities/Mealkit";
import { User } from "../entities/User";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";

@InputType()
class CartItemInput {
  @Field()
  mealkitId: number;
  @Field()
  quantity: number;
}

@Resolver(CartItem)
export class CartItemResolver {
  @FieldResolver(() => Int)
  async total(@Root() cartItem: CartItem): Promise<number> {
    const mealkit = await cartItem.mealkit;

    const total = mealkit.price * cartItem.quantity;
    return total;
  }

  @Query(() => [CartItem])
  @UseMiddleware(isAuth)
  async cartItems(@Ctx() { req }: MyContext): Promise<CartItem[]> {
    return await CartItem.find({
      where: { userId: req.session.userId, orderId: null },
      relations: ["mealkit", "user", "mealkit.post"],
    });
  }

  @Mutation(() => CartItem)
  @UseMiddleware(isAuth)
  async createCartItem(
    @Arg("input") input: CartItemInput,
    @Ctx() { req }: MyContext
  ): Promise<CartItem> {
    const newCartItem = await CartItem.create({
      quantity: input.quantity,
      userId: req.session.userId,
      mealkitId: input.mealkitId,
    }).save();

    // const user = await User.findOne({ id: req.session.userId });
    return newCartItem;
  }

  @Mutation(() => CartItem)
  @UseMiddleware(isAuth)
  async updateCartItem(
    @Arg("quantity", () => Int) quantity: number,
    @Arg("id", () => Int) id: number,
    @Arg("mealkitId", () => Int) mealkitId: number,

    @Ctx() { req }: MyContext
  ): Promise<CartItem> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(CartItem)
      .set({ quantity: quantity })
      .where('id = :id and "userId" = :userId', {
        id: id,
        userId: req.session.userId,
      })
      .returning("*")
      .execute();
    const mealkit = Mealkit.findOne(mealkitId);
    const updated = result.raw[0];
    updated.mealkit = mealkit;
    // console.log(result.raw[0]);
    // return result.raw[0];
    return updated;
  }
}
