import { Router } from "express";
import { CartItem, CartItemStatus } from "../entities/CartItem";
import { CartItemNoti } from "../entities/CartItemNoti";
import { Tracking } from "../entities/Tracking";

const router = Router();

//url: server.cookknow.com/api/payment/confirm
router.post("/confirm", async (req, res) => {
  try {
    // SSE starts
    res.writeHead(200, {
      Connection: "keep-alive",
      "Content-Type": "text/event-streatm",
      "Cache-Control": "no-cache",
    });
    console.log(req);
    console.log("req.body");
    console.log(req.body);
    const ref1 = parseInt(req.body.billPaymentRef1);
    console.log({ ref1 });
    // await Order.update({ id: ref1 }, { status: OrderStatus.ToDeliver });
    await CartItem.update(
      { orderId: ref1 },
      { status: CartItemStatus.ToDeliver }
    );

    const cartItems = await CartItem.find({
      where: { orderId: ref1 },
      relations: ["user", "mealkit"],
    });
    cartItems.forEach(async (cartItem) => {
      const message = ` ${cartItem.user.username} has completed the payment for ${cartItem.quantity} ${cartItem.mealkit.name}. Pleaes deliver soon.`;
      await CartItemNoti.create({
        read: false,
        message: message,
        cartItemId: cartItem.id,
        creatorId: cartItem.mealkit.creatorId,
      }).save();
    });

    // SSE Continue
    res.write("success");
    res.writeHead(404);

    //have to send back to SCB
    res.send({
      resCode: "00",
      "resDesc ": "success",
      transactionId: "xxx",
      confirmId: "xxx",
    });

    res.end;

    // res.redirect("http://google.com/");
    // res.writeHead(302, {
    //   Location: '"http://google.com/"',
    // });
    // res.end();
  } catch (error) {
    console.log(error);
    // res.send(error);
    // res.send({
    //   error: error,
    // });
  }
});

export default router;
