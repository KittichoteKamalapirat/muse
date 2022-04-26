import { Router } from "express";
import { CartItem, Tracking } from "../entities";
import { CartItemStatus } from "../entities/CartItem";
import { ETrackingStatus } from "../entities/Tracking";
import cartItemDeliveredMessageForCreator from "../utils/emailContents/cartItemDeliveredMessageForCreator";
import cartItemDeliveredMessageForUser from "../utils/emailContents/cartItemDeliveredMessageForUser";
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

    // send to user
    if (cartItem) {
      sendEmail(
        cartItem.order.user.email, // TODO change to review.mealkit.creator.email
        `📦 ${cartItem.quantity} ${cartItem.mealkit.name}${
          cartItem.quantity > 1 ? "s" : ""
        } have been successfully delivered to you.`,
        cartItemDeliveredMessageForUser(
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
        cartItemDeliveredMessageForCreator(
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
