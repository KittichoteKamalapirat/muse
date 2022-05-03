import { Router } from "express";
import { CartItem, CartItemNoti, Tracking } from "../entities";
import { CartItemStatus } from "../entities/CartItem";
import { ETrackingStatus } from "../entities/Tracking";
import cartItemDeliveredEmailForCreator from "../utils/notifications/emailContents/cartItemDeliveredEmailForCreator";
import cartItemDeliveredEmailForUser from "../utils/notifications/emailContents/cartItemDeliveredEmailForUser";
import cartItemDeliveredInAppForCreator from "../utils/notifications/inAppMessage/cartItemDeliveredInAppForCreator";
import cartItemDeliveredInAppForUser from "../utils/notifications/inAppMessage/cartItemDeliveredInAppForUser";
import { sendEmail } from "../utils/sendEmail";

const router = Router();

// url: server.cookknow.com/api/tracking/update
router.post("/update", async (req, res) => {
  console.log("got webhook from eTracking");
  console.log("print req.body");
  console.log(req.body);
  const {
    trackingNo,
    courier,
    courierKey,
    color,
    status,
    currentStatus,
    // detail, not used right now
    shareLink,
    timelines,
  } = req.body;

  await Tracking.update(
    { trackingNo },
    {
      trackingNo,
      courier,
      courierKey,
      color,
      status,
      currentStatus,
      shareLink,
      timelines,
    }
  );

  const tracking = await Tracking.findOne({ trackingNo }); // TODO technically this could match more than 1

  // delivered successfully
  if (tracking && status === ETrackingStatus.ON_DELIVERED) {
    // update every cartItem that has this trackingId
    await CartItem.update(
      { trackingId: tracking.id },
      { status: CartItemStatus.Delivered }
    );

    const cartItem = await CartItem.findOne({
      where: { trackingId: tracking.id },
      relations: ["mealkit", "mealkit.creator", "order", "order.user"],
    });

    if (cartItem) {
      // noti for user
      CartItemNoti.create({
        message: cartItemDeliveredInAppForUser(
          tracking.courier,
          cartItem.quantity,
          cartItem.mealkit.name
        ),
        detailUrl: `/order/cartItem/${cartItem.id}`,
        avatarHref: `noti/${CartItemStatus.Delivered}.png`, // courier guy image
        cartItemId: cartItem.id,
        userId: cartItem.userId,
      }).save();

      // noti for creator
      CartItemNoti.create({
        message: cartItemDeliveredInAppForCreator(
          tracking.courier,
          cartItem.quantity,
          cartItem.mealkit.name,
          cartItem.order.user.username
        ),
        detailUrl: `/myshop/order/cartItem/${cartItem.id}`,
        avatarHref: `noti/${CartItemStatus.Delivered}.png`, // courier guy image
        cartItemId: cartItem.id,
        userId: cartItem.mealkit.creatorId,
      }).save();

      // send to user
      sendEmail(
        cartItem.order.user.email, // TODO change to review.mealkit.creator.email
        `📦 ${cartItem.quantity} ${cartItem.mealkit.name}${
          cartItem.quantity > 1 ? "s" : ""
        } have been successfully delivered to you.`,
        cartItemDeliveredEmailForUser(
          tracking.courier,
          cartItem.quantity,
          cartItem.mealkit.name,
          cartItem.order.user.username
        )
      );

      // send to creator
      sendEmail(
        cartItem.mealkit.creator.email, // TODO change to review.mealkit.creator.email
        `📦 ${cartItem.quantity} ${cartItem.mealkit.name}${
          cartItem.quantity > 1 ? "s" : ""
        } have been successfully delivered to ${cartItem.order.user.username}.`,
        cartItemDeliveredEmailForCreator(
          cartItem.mealkit.creator.username,
          tracking.courier,
          cartItem.quantity,
          cartItem.mealkit.name,
          cartItem.order.user.username
        )
      );
    }

    // send to user
  }
  res.send("tracking updated");
});

export default router;
