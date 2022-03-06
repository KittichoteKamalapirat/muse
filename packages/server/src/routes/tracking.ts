import { Router } from "express";
import { Tracking } from "../entities/Tracking";

const router = Router();

//url: server.cookknow.com/api/tracking/update
router.post("/update-tracking", (req) => {
  const trackingData = req.body.data;
  Tracking.update({ id: trackingData.trackingNo }, { ...trackingData });
});

export default router;
