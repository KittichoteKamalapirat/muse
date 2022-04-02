import { Router } from "express";
import { CartItem, Order } from "../entities/";
import { CartItemStatus } from "../entities/CartItem";
const router = Router();

//url: server.cookknow.com/api/payment/scb-confirm
router.post("/scb-confirm", async (req, res) => {
  try {
    console.log("got response from SCB");
    console.log("print req parameter");
    console.log(req);

    const ref1 = parseInt(req.body.billPaymentRef1);
    console.log("ref1");
    console.log(ref1);

    // await CartItem.update(
    //   { orderId: ref1 },
    //   { status: CartItemStatus.ToDeliver }
    // );

    // const cartItems = await CartItem.find({
    //   where: { orderId: ref1 },
    //   relations: ["user", "mealkit"],
    // });

    // cartItems.forEach(async (cartItem) => {
    //   const message = ` ${cartItem.user.username} has completed the payment for ${cartItem.quantity} ${cartItem.mealkit.name}. Pleaes deliver soon.`;
    //   await CartItemNoti.create({
    //     read: false,
    //     message: message,
    //     cartItemId: cartItem.id,
    //     creatorId: cartItem.mealkit.creatorId,
    //   }).save();
    // });

    //have to send back to SCB

    console.log("send back to SCB");
    const response = {
      resCode: "00",
      "resDesc ": "success",
      transactionId: req.body.transactionId,
      confirmId: "xxx", //TODO change later
    };

    console.log("response");
    console.log(response);
    res.send(response);
    res.end;
  } catch (error) {
    console.log(error);
  }
});

//url: server.cookknow.com/api/payment/test
router.get("/test", async (req, res) => {
  console.log("Hello from server, api route");
  res.send("Hello from server, api route");
});

//for frontend to query with setInterval
//url: server.cookknow.com/api/payment/cart-item-status/:id
router.get("/status/:id", async (req, res) => {
  //I have paymentId
  //I need status but it is with cartItem
  //order has paymentId
  //cartItem has order Id
  const { id: paymentId } = req.params;
  const order = await Order.findOne({ where: { paymentId } });
  const cartItems = await CartItem.find({ where: { orderId: order?.id } });
  const paidItems = cartItems.filter((item) => {
    return item.status === CartItemStatus.ToDeliver;
  });
  if (paidItems.length === cartItems.length) {
    res.send(true);
  } else {
    res.send(false);
  }
});

export default router;
