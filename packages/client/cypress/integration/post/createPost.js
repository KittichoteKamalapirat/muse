describe("payment", () => {
  it("user can make payment via QR code", () => {
    // cy.visit(`${Cypress.env("clientUrl")}`);
    //visit the site
    // register
    // cy.get("a[]")
    //click the register button

    const username = "luffy";
    const email = "luffy@gmail.com";
    const phonenumber = "0900000000";
    const password = "3d2y";

    //create a new account
    cy.visit("/register");
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="phonenumber"]').type(phonenumber);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    // login;
    // cy.visit("/login");
    // cy.get('input[name="usernameOrEmailOrPhonenumber"]').type(username, {
    //   force: true,
    // });
    // cy.get('input[name="password"]').type(password);
    // cy.get('button[type="submit"]').click();

    // go to account and become a creator

    cy.get('a[aria-label="My Account Button"]').click();

    cy.get('button:contains("Switch Account type")').click();
    cy.get('button:contains("Switch to Creator Account")').click();

    cy.get('a:contains("My shop")').click();

    cy.get('a:contains("Create new video with meal kit")').click();

    //create a new product

    cy.get("input").click({ force: true });

    // upload a video
    const videoFileName = "video1.mp4";
    cy.get("input").should("be.exist").attachFile(videoFileName, {
      mimeType: "video/mp4",
    });

    // upload a thumbnail
    const thumbnailFileName = "thumbnail1.png";
    cy.get('input[accept="image/*"]')
      .should("be.exist")
      .attachFile(thumbnailFileName, {
        mimeType: "img/png",
      });

    cy.get('button:contains("Next")').click();

    // fill in details
    const title = "Marinara";
    const text = "Marinara Details";
    const cooktime = "1";
    const postPortion = "1";
    cy.get('input[name="title"]').type(title);
    cy.get('textarea[name="text"]').type(text);
    cy.get('input[name="cooktime"]').type(cooktime);
    cy.get('input[name="portion"]').type(postPortion);
    cy.get('button:contains("Next")').click();

    // fill in mealkit
    const mealkitName = "Marinara Mealkit";
    const price = "100";
    const mealkitPortion = "1";

    cy.get('input[accept="image/*,video/*"]')
      .should("be.exist")
      .attachFile(thumbnailFileName, {
        mimeType: "image/*,video/*",
      });
    cy.get('input[name="name"]').type(mealkitName);
    cy.get('input[name="price"]').type(price);
    cy.get('input[name="portion"]').type(mealkitPortion);

    cy.get('button[type="submit"]').click();

    // check the post is created
    cy.contains(title).should("be.exist");
    cy.contains(mealkitName).should("be.exist");

    //create an order

    //make a payment
  });
});
