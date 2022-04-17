/* eslint-disable no-undef */

describe("order", () => {
  it("a buyer can create an order", () => {
    // login a user and redirect to homepage

    // create post and mealkit in db
    cy.task("createPostAndMealkit");

    // refresh the page so the post shows up
    cy.reload(true);
    cy.url().should("eq", `${Cypress.env("clientUrl")}/`);
    cy.reload(true);

    // click the post
    // TODO h2 marinara matches multiple
    cy.contains("Marinara Details").should("be.visible").click({ force: true }); // is being covered

    cy.url().should("contain", `${Cypress.env("clientUrl")}/post/`);

    // add to cart
    cy.get("button:contains('ใส่ตะกร้า')").click();

    // see cart
    cy.visit(`${Cypress.env("clientUrl")}/cart`);

    // checkout
    cy.get("button:contains('Checkout')").click();

    // make a payment
    cy.get("button:contains('Make a payment')").click();
    // (Unordered -> PaymentPending)
    // TODO frontend hide make a payment button if no address yet

    // Scan the Qr code and make a payment
    // task: But manually update cartItem status in DB instead (replicate SCB web hook)
    // (PaymentPending -> ToDelivery )
    cy.url().should("contain", `${Cypress.env("clientUrl")}/payment/`);
    // cy.task("buyerMakeAPayment"); // update db

    // replicate SCBg webhook
    const orderId = 1;
    const scbBody = { billPaymentRef1: orderId }; // order
    cy.request(
      "POST",
      `${Cypress.env("apiUrl")}/api/payment/scb-confirm`,
      scbBody
    ); // seems like cypress stringify for us

    // redirect automatially
    cy.url().should("contain", `${Cypress.env("clientUrl")}/order`);

    // task: add a tracking number and update CartItemStatus
    // (ToDeliver -> OnDelivery)
    cy.task("creatorCreateTracking").then((tracking) => {
      console.log("print tracking");
      console.log({ tracking });
    });

    // cy.request to update to be Delivered (replicate eTracking web hook)
    // (OnDelivery -> Delivered)

    const eTrackingBody = {
      trackingNo: "SHD1063000874",
      courier: "เคอรี่ เอ็กซ์เพรส",
      courierKey: "kerry-express",
      color: "#FB8523",
      status: "ON_DELIVERED",
      currentStatus:
        "13:59 เคอรี่จัดส่งพัสดุของคุณเรียบร้อยแล้ว - คานหาม, พระนครศรีอยุธยา",
      detail: {
        sender: "ETrackings****",
        recipient: "สหรัก ม******",
        qty: 0,
        address: "",
        originCity: "",
        originProvince: "นนทบุรี",
        originCountry: "",
        destinationCity: "",
        destinationProvince: "พระนครศรีอยุธยา",
        destinationCountry: "",
        signer: "สหรัก ม******",
        signerImageURL: "",
        weight: 0,
        shippingService: "",
        returnShippingService: "",
        deliveryType: "Normal",
        packaging: "",
        senderPhoneNumber: "",
        recipientPhoneNumber: "",
        sendDate: "",
        dueDate: "2021-02-10",
        cashOnDelivery: "0",
        isPayCashOnDelivery: false,
        deliveryStaffName: "",
        deliveryStaffPhoneNumber: "",
        deliveryStaffBranchPhoneNumber: "",
        senderCompany: "",
        senderAddress: "",
        recipientCompany: "",
        recipientAddress: "",
        courierTrackingNumber: "",
        courierPartner: "",
      },
      shareLink:
        "https://apps.etrackings.com/share?track=Y291cmllcj1rZXJyeS1leHByZXNzJnRyYWNraW5nLW5vPVNIUDUwNTQzNjkxNzImZW1haWw9",
      timelines: [
        {
          date: "2021-02-10",
          details: [
            {
              dateTime: "2021-02-10T13:59:56+07:00",
              date: "2021-02-10",
              time: "13:59",
              status: "ON_DELIVERED",
              description:
                "13:59 เคอรี่จัดส่งพัสดุของคุณเรียบร้อยแล้ว - คานหาม, พระนครศรีอยุธยา",
            },
            {
              dateTime: "2021-02-10T08:57:06+07:00",
              date: "2021-02-10",
              time: "08:57",
              status: "ON_SHIPPING",
              description:
                "08:57 พนักงานกำลังจัดส่งพัสดุของคุณ - คานหาม, พระนครศรีอยุธยา",
            },
          ],
        },
        {
          date: "2021-02-09",
          details: [
            {
              dateTime: "2021-02-09T08:10:59+07:00",
              date: "2021-02-09",
              time: "08:10",
              status: "ON_OTHER_STATUS",
              description:
                "08:10 พัสดุของคุณถึงสาขาปลายทางแล้ว เตรียมจัดส่ง - คานหาม, พระนครศรีอยุธยา",
            },
            {
              dateTime: "2021-02-09T03:09:31+07:00",
              date: "2021-02-09",
              time: "03:09",
              status: "ON_OTHER_STATUS",
              description:
                "03:09 พัสดุของคุณอยู่ระหว่างขนส่ง - ตลิ่งชั่น, พระนครศรีอยุธยา",
            },
          ],
        },
        {
          date: "2021-02-08",
          details: [
            {
              dateTime: "2021-02-08T22:03:55+07:00",
              date: "2021-02-08",
              time: "22:03",
              status: "ON_OTHER_STATUS",
              description:
                "22:03 พัสดุของคุณอยู่ระหว่างขนส่ง - ศูนย์คัดแยกสินค้าสมุทรสาคร, กรุงเทพมหานคร",
            },
            {
              dateTime: "2021-02-08T13:35:59+07:00",
              date: "2021-02-08",
              time: "13:35",
              status: "ON_PICKED_UP",
              description: "13:35 เคอรี่เข้ารับพัสดุแล้ว",
            },
          ],
        },
      ],
    };

    cy.request(
      "POST",
      `${Cypress.env("apiUrl")}/api/tracking/update`,
      eTrackingBody
    );

    // click received button
    // (Delivered -> Received)
    cy.visit(`${Cypress.env("clientUrl")}/order?status=Delivered`);
    cy.get("button:contains('Received an item')").click();
    cy.url().should(
      "contain",
      `${Cypress.env("clientUrl")}/order?status=Received`
    );

    // Leave a review
    cy.get("a:contains('Leave a Review')").should("be.visible").click();
    cy.url().should("eq", `${Cypress.env("clientUrl")}/review/create`);

    cy.get("input[value='4']").should("be.exist").click({ force: true }); // display = hidden
    cy.get("input[name='title']").should("be.visible").type("recommend!");
    cy.get("textarea[name='text']")
      .should("be.visible")
      .type("definitely worth trying!");

    cy.get("button:contains('Submit review')").should("be.visible").click();
    cy.url().should("contain", `${Cypress.env("clientUrl")}/post/`);

    // Admin complete!
    cy.task("adminCompleteCartItem");
    cy.visit(`${Cypress.env("clientUrl")}/order?status=Complete`);
    cy.get("h2:contains('Marinara Mealkit')").should("be.visible");

    // task: transfer money and
    // (Received -> Completed )
  });
});
