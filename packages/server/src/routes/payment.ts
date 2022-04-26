import { Router } from "express";
import { CartItem, Order, CartItemNoti } from "../entities";
import { CartItemStatus } from "../entities/CartItem";
import creatorReceivesPaymentMessage from "../utils/emailContents/creatorReceivesPaymentMessage";
import userCompletesPaymentMessage from "../utils/emailContents/userCompletesPaymentMessage";
import { sendEmail } from "../utils/sendEmail";

const router = Router();

// url: server.cookknow.com/api/payment/scb-confirm
router.post("/scb-confirm", async (req, res) => {
  try {
    // eslint-disable-next-line no-console
    console.log("got response from SCB");
    const ref1 = parseInt(req.body.billPaymentRef1, 10);
    console.log(req.body);
    console.log("ref1: ", ref1);
    await CartItem.update(
      { orderId: ref1 },
      { status: CartItemStatus.ToDeliver }
    );

    const cartItems = await CartItem.find({
      where: { orderId: ref1 },
      relations: ["user", "mealkit", "mealkit.creator", "order", "order.user"],
    });

    cartItems.forEach(async (cartItem) => {
      const message = ` ${cartItem.user.username} has completed the payment for ${cartItem.quantity} ${cartItem.mealkit.name}. Pleaes deliver soon.`;

      // create notis for creators
      await CartItemNoti.create({
        read: false,
        message,
        cartItemId: cartItem.id,
        userId: cartItem.mealkit.creatorId,
      }).save();

      // send sms to creator
      sendEmail(
        cartItem.mealkit.creator.email,
        `💰 ${cartItem.order.user.username} has completed a payment for ${
          cartItem.quantity
        } ${cartItem.mealkit.name}${cartItem.quantity > 1 ? "s" : ""}`,
        creatorReceivesPaymentMessage(
          cartItem.quantity,
          cartItem.mealkit.name,
          cartItem.order.user.username
        )
      );

      // send sms to users
      sendEmail(
        cartItem.order.user.email,
        `💰 You made a payment for ${cartItem.quantity} ${
          cartItem.mealkit.name
        }${cartItem.quantity > 1 ? "s" : ""}`,
        userCompletesPaymentMessage(
          cartItem.quantity,
          cartItem.mealkit.name,
          cartItem.order.user.username
        )
      );
    });

    // have to send back to SCB

    const response = {
      resCode: "00",
      "resDesc ": "success",
      transactionId: req.body.transactionId,
      confirmId: "xxx", // TODO change later
    };

    res.send(response);
  } catch (error) {
    // todo
  }
});

// url: server.cookknow.com/api/payment/test
router.get("/test", async (req, res) => {
  res.send("Hello from server, api route");
});

// for frontend to query with setInterval
// url: server.cookknow.com/api/payment/cart-item-status/:id
router.get("/status/:id", async (req, res) => {
  // I have paymentId
  // I need status but it is with cartItem
  // order has paymentId
  // cartItem has order Id
  const { id: paymentId } = req.params;
  const order = await Order.findOne({ where: { paymentId } });
  const cartItems = await CartItem.find({ where: { orderId: order?.id } });
  const paidItems = cartItems.filter(
    (item) => item.status === CartItemStatus.ToDeliver
  );
  if (paidItems.length === cartItems.length) {
    res.send(true);
  } else {
    res.send(false);
  }
});

export default router;
