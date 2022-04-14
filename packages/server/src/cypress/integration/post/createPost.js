/* eslint-disable no-undef */

const usernameOrEmailOrPhonenumber = "luffy";
const password = "3d2y";

describe("post", () => {
  it("creator can create a post", () => {
    // login a user and redirect to homepage
    cy.login(usernameOrEmailOrPhonenumber, password);

    // go to my account page
    cy.get('a[aria-label="My Account Button"]').click({ force: true });

    // become a creator
    cy.get('button:contains("Switch Account type")').click({ force: true });
    cy.get('button:contains("Switch to Creator Account")').click({
      force: true,
    });

    cy.get('a:contains("My shop")').click({ force: true });

    cy.get('a:contains("Create new video with meal kit")').click({
      force: true,
    });

    // create a new product

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

    cy.get('button:contains("Next")').click({ force: true });

    // fill in details
    const title = "Marinara";
    const text = "Marinara Details";
    const cooktime = "1";
    const postPortion = "1";
    cy.get('input[name="title"]').type(title);
    cy.get('textarea[name="text"]').type(text);
    cy.get('input[name="cooktime"]').type(cooktime);
    cy.get('input[name="portion"]').type(postPortion);
    cy.get('button:contains("Next")').click({ force: true });

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

    cy.get('button[type="submit"]').click({ force: true });

    cy.wait(60000);

    // check whether redirects to home page
    cy.url().should("eq", `${Cypress.env("clientUrl")}/`);

    // check the post was created
    cy.contains(title).should("be.exist");
    cy.contains(mealkitName).should("be.exist");
  });
});
