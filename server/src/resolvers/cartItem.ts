import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
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

@ObjectType()
class AddToCart {
  @Field()
  cartItem: CartItem;
  @Field()
  newItem: boolean;
}

@Resolver(CartItem)
export class CartItemResolver {
  @FieldResolver(() => Int)
  async fieldTotal(@Root() cartItem: CartItem): Promise<number> {
    const mealkit = await cartItem.mealkit;

    const total = mealkit.price * cartItem.quantity;
    return total;
  }

  @Query(() => [CartItem])
  @UseMiddleware(isAuth)
  async cartItems(@Ctx() { req }: MyContext): Promise<CartItem[]> {
    return await CartItem.find({
      where: { userId: req.session.userId, orderId: null },
      relations: ["mealkit", "user", "mealkit.post", "mealkit.creator"],
    });
  }

  @Mutation(() => AddToCart)
  @UseMiddleware(isAuth)
  async createCartItem(
    @Arg("input") input: CartItemInput,
    @Ctx() { req }: MyContext
  ): Promise<AddToCart | Error | undefined> {
    // check first whether this melakit already exsits in the cart
    const cartItem = await CartItem.findOne({
      where: {
        mealkitId: input.mealkitId,
        userId: req.session.userId,
        orderId: null,
      },
    });

    // CartItem.create().save()
    if (cartItem) {
      const result = await getConnection()
        .createQueryBuilder()
        .update(CartItem)
        .set({ quantity: cartItem.quantity + input.quantity })
        .where('id = :id and "mealkitId" = :mealkitId', {
          id: cartItem.id,
          mealkitId: cartItem.mealkitId,
        })
        .returning("*")
        .execute();

      // const sameCartItem = await CartItem.create({
      //   id: cartItem.id,
      //   quantity: cartItem.quantity + input.quantity,
      //   userId: req.session.userId,
      //   mealkitId: cartItem.mealkitId,
      // }).save();
      // console.log({ cartItem: sameCartItem, newItem: false });
      return { cartItem: result.raw[0], newItem: false };
    } else {
      const newCartItem = await CartItem.create({
        quantity: input.quantity,
        userId: req.session.userId,
        mealkitId: input.mealkitId,
      }).save();

      if (newCartItem) {
        console.log({ newCartItem });
        const mealkit = await Mealkit.findOne(input.mealkitId);
        if (mealkit) {
          newCartItem.mealkit = mealkit;
          return { cartItem: newCartItem, newItem: true };
        } else {
          return new Error("Cannot find the following meal kit");
        }
      }
      return undefined;
    }
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

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteCartItem(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await CartItem.delete({ id: id, userId: req.session.userId });
    return true;
  }
}
