import { Router } from "express";
import { getConnection } from "typeorm";
import { Tracking, CartItem } from "../entities";
import { CartItemStatus } from "../entities/CartItem";
import { ETrackingStatus } from "../entities/Tracking";

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

  const result = await getConnection()
    .createQueryBuilder()
    .update(Tracking)
    .set({
      trackingNo,
      courier,
      courierKey,
      color,
      status,
      currentStatus,
      shareLink,
      timelines,
    })
    .where("trackingNo = :trackingNo ", {
      trackingNo,
    })
    .returning("*")
    .execute();
  const tracking = result.raw[0] as Tracking;

  console.log("updated tracking");
  console.log({ tracking });

  // delivered successfully
  if (tracking && status === ETrackingStatus.ON_DELIVERED) {
    // update every cartItem that has this trackingId
    CartItem.update(
      { trackingId: tracking.id },
      { status: CartItemStatus.Delivered }
    );
  }
  res.send("tracking updated");
});

export default router;
