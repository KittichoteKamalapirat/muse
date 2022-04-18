/* eslint-disable class-methods-use-this */
import fetch from "node-fetch";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { CartItem, Tracking } from "../entities";
import { CartItemStatus } from "../entities/CartItem";
import { TrackingInput } from "../entities/utils";

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
      // 1. Track my order (Order.userId = req.session.userId AND OrderStatus OnDe;lover )

      //   const courierOptions = getTrackingOptions(trackingNo,courier);
      //   const courrierResponse = await fetch(
      //     "https://fast.etrackings.com/api/v3/couriers/detect",
      //     { ...courierOptions }
      //   );

      //   if (courrierResponse.status !== 200) {
      //     return new Error("cannot fetch courier the data");
      //   }
      //   const courierData = await courrierResponse.json();
      //   console.log("courierData");
      //   console.log(courierData);

      //   const options = getTrackingOptions(trackingNo, courier);

      //   const response = await fetch(
      //     "https://fast.etrackings.com/api/v3/tracks/find",
      //     { ...options }
      //   );
      //   console.log({ response });

      //   if (response.status !== 200) {
      //     return new Error("cannot fetch the data");
      //   }
      //   const data: any = await response.json();

      //   console.log("data");
      const tracking = await Tracking.findOne({
        where: { id },
        relations: ["cartItems", "cartItems.mealkit"],
      });

      console.log(tracking);

      return tracking;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  //   @Mutation(() => TrackingResult)
  @Mutation(() => Tracking)
  async createTracking(
    @Arg("input") input: TrackingInput
  ): Promise<Tracking | Error | undefined> {
    // 1. look for the tracking by the number
    // 2. if there traking exists and valid (check amount of something) - . not sure tho wto check
    // 3. update the order status and create tracking
    console.log({ input });
    try {
      const options = getTrackingOptions(input.trackingNo, input.courier);
      const response = await fetch(
        "https://fast.etrackings.com/api/v3/tracks/find",
        { ...options }
      );

      if (response.status !== 200) {
        return new Error("cannot fetch the data");
      }
      const data: any = await response.json();
      const trackingData = data.data;
      console.log("tracking Data");
      console.log(trackingData);
      trackingData.timelines.map((timeline: any) => console.log(timeline));

      // Order.update({ id: input.orderId }, { status: OrderStatus.OnDelivery });

      const tracking = await Tracking.create({
        trackingNo: trackingData.trackingNo,
        courier: trackingData.courier,
        courierKey: trackingData.courierKey,
        shareLink: trackingData.shareLink,
        color: trackingData.color,
        status: trackingData.status,
        currentStatus: trackingData.currentStatus,
        timelines: trackingData.timelines,
      }).save();

      input.cartItemIds.forEach(async (id) => {
        await CartItem.update(
          { id },
          { trackingId: tracking.id, status: CartItemStatus.OnDelivery }
        );
      });

      // CartItem.update({ id: input.cartItemId }, { status: CartItemStatus.OnDelivery });
      return tracking;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }
}
