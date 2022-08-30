/* eslint-disable no-undef */

describe("post", () => {
  Cypress.on("uncaught:exception", () => false);
  xit("creator can create a post", () => {
    // login a user and redirect to homepage
    // cy.createUserInDbAndLogin(usernameOrEmailOrPhoneNumber, password);
    cy.url().should("eq", `${Cypress.env("clientUrl")}/`);

    // go to my account page
    // cy.get('a[aria-label="My Account Button"]').click();

    // become a creator
    // cy.get('button:contains("Switch Account type")').click();
    // cy.get('button:contains("Switch to Creator Account")').click();

    cy.get('a:contains("My shop")').click();

    cy.get('a:contains("Create a new video with meal kit")').click({
      force: true,
    });

    cy.url().should("eq", `${Cypress.env("clientUrl")}/create-post`);

    // create a new product
    // cy.get("input").click({ force: true });
    cy.contains("Select a video").click({ force: true });

    // upload a video
    cy.contains("New Video").should("be.visible", { force: true });
    const videoFileName = "video1.mp4";
    cy.get("input[accept='video/*']")
      .should("be.exist")
      .attachFile(videoFileName, {
        mimeType: "video/mp4",
      });

    // manually click since no redirect in cypress?
    cy.get('button[aria-label="Go to create thumbnail tab"]')
      .should("be.visible")
      .click({ force: true });

    // upload a thumbnail
    cy.contains("Cover Photo").should("be.visible", { force: true });

    const thumbnailFileName = "thumbnail1.png";
    cy.get('input[accept="image/*"]')
      .should("be.exist")
      .attachFile(thumbnailFileName, {
        mimeType: "img/png",
      });

    cy.get('button[aria-label="Go to post detail tab"]')
      .should("be.visible")
      .click({ force: true });

    cy.contains("Add Post Detail").should("be.visible", { force: true });
    // fill in post details
    const title = "Marinara";
    const text = "Marinara Details";
    const cooktimeLength = 1;
    const cooktimeUnit = "mins";
    const postPortion = "1";
    cy.get('input[name="title"]').type(title);
    cy.get('textarea[name="text"]').type(text);
    cy.get('input[name="cooktimeLength"]').type(cooktimeLength);
    cy.get('input[name="cooktimeUnit"]').type(cooktimeUnit);
    cy.get('input[name="portion"]').type(postPortion);
    cy.get('button[aria-label="Go to mealkit details tab"]')
      .should("be.visible")
      .click({ force: true });

    cy.contains("Add a Meal Kit").should("be.visible", { force: true });

    // fill in mealkit details
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
    cy.get('input[name="mealkitPortion"]').type(mealkitPortion);

    cy.get('button[type="submit"]').click({ force: true });

    // check whether redirects to home page
    cy.url().should("eq", `${Cypress.env("clientUrl")}/`);

    // check the post was created
    cy.contains(title).should("be.exist");
    cy.contains(mealkitName).should("be.exist");
  });
});
