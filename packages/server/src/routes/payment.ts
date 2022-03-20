import { Router } from "express";
import { CartItem, CartItemStatus } from "../entities/CartItem";
import { CartItemNoti } from "../entities/CartItemNoti";
import { Order } from "../entities/Order";
import { Tracking } from "../entities/Tracking";

const router = Router();

//url: server.cookknow.com/api/payment/scb-confirm
router.post("/scb-confirm", async (req, res) => {
  try {
    const ref1 = parseInt(req.body.billPaymentRef1);
    // await Order.update({ id: ref1 }, { status: OrderStatus.ToDeliver });
    await CartItem.update(
      { orderId: ref1 },
      { status: CartItemStatus.ToDeliver }
    );
    //CartItem Table
    const cartItems = await CartItem.find({
      where: { orderId: ref1 },
      relations: ["user", "mealkit"],
    });

    //CartItem Notification Table
    cartItems.forEach(async (cartItem) => {
      const message = ` ${cartItem.user.username} has completed the payment for ${cartItem.quantity} ${cartItem.mealkit.name}. Pleaes deliver soon.`;
      await CartItemNoti.create({
        read: false,
        message: message,
        cartItemId: cartItem.id,
        creatorId: cartItem.mealkit.creatorId,
      }).save();
    });

    //have to send back to SCB
    res.send({
      resCode: "00",
      "resDesc ": "success",
      transactionId: "xxx",
      confirmId: "xxx",
    });

    res.end;
  } catch (error) {
    console.log(error);
  }
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
