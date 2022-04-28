/* eslint-disable class-methods-use-this */
import fetch from "node-fetch";
import {
  Arg,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { CartItem, Tracking } from "../entities";
import { CartItemStatus } from "../entities/CartItem";
import { TrackingInput } from "../entities/utils";
import { isAuth } from "../middlware/isAuth";
import creatorCreatedTrackingMessage from "../utils/emailContents/creatorCreatedTrackingMessage";
import { sendEmail } from "../utils/sendEmail";

// @ObjectType()
// class Location {
//   @Field(() => String || undefined)
//   originCity: string | undefined;
//   @Field()
//   originProvince: string;
//   @Field(() => String || undefined)
//   destinationCity: string | undefined;
//   @Field()
//   destinationProvince: string;
// }

// @ObjectType()
// class TrackingResult {
//   @Field()
//   trackingNo: string;
//   @Field()
//   courier: string;
//   @Field()
//   courierKey: string;
//   @Field()
//   status: string;
//   @Field()
//   currentStatus: string;
//   @Field(() => Location)
//   detail: Location;
// }

const getTrackingOptions = (trackingNo: string, courier: string) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Etrackings-api-key": process.env.ETRACKINGS_API_KEY,
      "Etrackings-key-secret": process.env.ETRACKINGS_API_SECRET,
      //   "Accept-Language": "th",
      "Accept-Language": "en",
    },
    method: "POST",
    // body: JSON.stringify({ "courier": "kerry-express", "trackingNo": "SHP5040314158" })
    body: JSON.stringify({
      courier,
      trackingNo,
    }),
  };
  return options;
};

@Resolver()
export class TrackingResolver {
  @Query(() => Tracking)
  async tracking(
    @Arg("id", () => Int) id: number
  ): Promise<Tracking | undefined | Error> {
    try {
      const tracking = await Tracking.findOne({
        where: { id },
        relations: [
          "cartItems",
          "cartItems.mealkit",
          "cartItems.mealkit.mealkitFiles",
          "cartItems.mealkit.creator",
        ],
      });

      return tracking;
    } catch (error) {
      return new Error("can't find the tracking");
    }
  }

  //   @Mutation(() => TrackingResult)
  @UseMiddleware(isAuth)
  @Mutation(() => Tracking)
  async createTracking(
    @Arg("id", () => Int, { nullable: true }) id: number,
    @Arg("input") input: TrackingInput
  ): Promise<Tracking | Error | undefined> {
    // 1. look for the tracking by the number
    // 2. if there traking exists and valid (check amount of something) - . not sure tho wto check
    // 3. update the order status and create tracking

    try {
      console.log({ input });
      const options = getTrackingOptions(input.trackingNo, input.courier);
      const response = await fetch(
        "https://fast.etrackings.com/api/v3/tracks/find",
        { ...options }
      );

      // if not found, create blank tracking and don't update cartItemStatus
      if (response.status !== 200) {
        console.log("not found");
        const tracking = await Tracking.create({
          trackingNo: input.trackingNo,
          isFound: false,
        }).save();

        input.cartItemIds.forEach(async (id) => {
          await CartItem.update(
            { id },
            { trackingId: tracking.id, status: CartItemStatus.ToDeliver } // didn't update to OnDelivery yet since not found
          );
        });

        return tracking;
      }

      console.log("found");
      // eTracking found the tracking
      const data: any = await response.json();
      const trackingData = data.data;

      const tracking = await (async () => {
        if (!id)
          return Tracking.create({
            trackingNo: trackingData.trackingNo,
            isFound: true,
            courier: trackingData.courier,
            courierKey: trackingData.courierKey,
            shareLink: trackingData.shareLink,
            color: trackingData.color,
            status: trackingData.status,
            currentStatus: trackingData.currentStatus,
            timelines: trackingData.timelines,
          }).save();

        await Tracking.update(
          { id },
          {
            trackingNo: trackingData.trackingNo,
            isFound: true,
            courier: trackingData.courier,
            courierKey: trackingData.courierKey,
            shareLink: trackingData.shareLink,
            color: trackingData.color,
            status: trackingData.status,
            currentStatus: trackingData.currentStatus,
            timelines: trackingData.timelines,
          }
        );
        return Tracking.findOne(id);
      })();

      input.cartItemIds.forEach(async (cartItemId) => {
        await CartItem.update(
          { id: cartItemId },
          { trackingId: tracking?.id, status: CartItemStatus.OnDelivery }
        );

        // CartItem.save({id, trackingId: tracking.id, status:  CartItemStatus.OnDelivery})

        const cartItem = await CartItem.findOne({
          where: { id },
          relations: ["mealkit", "order", "order.user"],
        });

        if (cartItem && tracking)
          sendEmail(
            cartItem.order.user.email,
            `📝 ${cartItem?.quantity} ${cartItem?.mealkit.name}${
              cartItem?.quantity > 1 ? "s are" : " is"
            } on the way `,
            creatorCreatedTrackingMessage(
              tracking.id,
              cartItem.quantity,
              cartItem.mealkit.name,
              cartItem.order.user.username,
              tracking.courier
            )
          );
      });

      // send email

      return tracking;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }
}
