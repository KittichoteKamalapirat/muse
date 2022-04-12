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
import { CartItem, Mealkit, Review } from "../entities/";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";

@InputType()
class ReviewInput {
  @Field(() => Int)
  score: number;

  @Field()
  title: string;

  @Field()
  text: string;
}

@Resolver(Review)
export class ReviewResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Review || Error)
  async createReview(
    @Arg("input", () => ReviewInput) input: ReviewInput,
    @Arg("mealkitId", () => Int) mealkitId: number,
    @Arg("cartItemId", () => Int) cartItemId: number,

    @Ctx() { req }: MyContext
  ): Promise<Review | Error> {
    try {
      //User can only review one mealkit one time? Or
      const existingReview = await Review.find({
        where: {
          mealkitId: mealkitId,
          userId: req.session.userId,
          cartItemId: cartItemId,
        },
      });
      console.log(existingReview);
      if (existingReview.length > 0) {
        return new Error("You have already reviewed this product");
      }

      //input has to be within 1-5
      if (input.score > 5 || input.score < 1) {
        return new Error("Invalid score input");
      }
      //Really creating a review

      await CartItem.update({ id: cartItemId }, { isReviewed: true });
      const mealkit = await Mealkit.findOne({ id: mealkitId });
      if (mealkit) {
        Mealkit.update(
          { id: mealkitId },
          {
            reviewsCounter: mealkit.reviewsCounter + 1,
            reviewsSum: mealkit.reviewsSum + input.score,
          }
        );
      } else {
        return new Error("cannot find the mealkit");
      }

      const review = await Review.create({
        score: input.score,
        title: input.title,
        text: input.text,
        userId: req.session.userId,
        mealkitId: mealkitId,
        cartItemId: cartItemId,
      }).save();

      return review;
    } catch (error) {
      console.log(error);
      return new Error("Cannot create review");
    }
  }

  @UseMiddleware(isAuth)
  @Query(() => [Review])
  async reviews(@Arg("mealkitId", () => Int) mealkitId: number) {
    try {
      return Review.find({
        where: { mealkitId },
        relations: ["user", "mealkit"],
      });
    } catch (error) {
      console.log(error);
      return new Error("Cannot get reviews for this mealkit");
    }
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Review || Error)
  async updateReview(
    // @Arg("mealkitId", () => Int) mealkitId: number,
    @Arg("input", () => ReviewInput) input: ReviewInput,
    @Arg("mealkitId", () => Int) mealkitId: number,
    @Arg("cartItemId", () => Int) cartItemId: number,
    @Ctx() { req }: MyContext
  ): Promise<Review | Error> {
    try {
      //input has to be within 1-5
      if (input.score > 5 || input.score < 1) {
        // return new Error("Invalid score input");
        return new Error("Invalid score input");
      }
      const currentReview = await Review.findOne({ where: { cartItemId } });
      const result = await getConnection()
        .createQueryBuilder()
        .update(Review)
        .set(input)
        .where('mealkitId = :mealkitId and "userId" = :userId', {
          mealkitId: mealkitId,
          cartItemId: cartItemId,
          userId: req.session.userId,
        })
        .returning("*")
        .execute();

      const mealkit = await Mealkit.findOne({ id: mealkitId });
      if (mealkit) {
        Mealkit.update(
          { id: mealkitId },
          {
            //same review counter
            reviewsSum:
              mealkit.reviewsSum + input.score - currentReview?.score!,
          }
        );
      } else {
        return new Error("cannot find the mealkit");
      }

      return result.raw[0];
    } catch (error) {
      console.log(error);
      return new Error("Cannot update this review");
    }
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deleteReview(
    @Arg("mealkitId", () => Int) mealkitId: number,
    @Arg("cartItemId", () => Int) cartItemId: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean | Error> {
    try {
      //won't do anything if wrong mealkitId or userId
      //   Have to update 3 tabvles which are the review it self, the cartItem, and the mealkit

      //update score on Mealkit
      const currentReview = await Review.findOne({ cartItemId: 2 });
      const mealkit = await Mealkit.findOne({ id: mealkitId });

      console.log({ mealkit });
      console.log({ currentReview });

      //   update Review
      await Review.delete({
        mealkitId,
        userId: req.session.userId,
        cartItemId,
      });
      // update status on CartItem
      CartItem.update(
        {
          id: cartItemId,
        },
        {
          isReviewed: false,
        }
      );
      if (mealkit) {
        await Mealkit.update(
          { id: mealkitId },
          {
            reviewsCounter: mealkit?.reviewsCounter! - 1,
            reviewsSum: mealkit?.reviewsSum! - currentReview?.score!,
          }
        );
        return true;
      } else {
        return new Error("Cannot find the mealkit");
      }
    } catch (error) {
      console.log(error);
      return new Error("Cannot delete this review");
    }
  }
}
