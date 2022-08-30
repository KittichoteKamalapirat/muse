/* eslint-disable no-undef */

const usernameOrEmailOrPhoneNumber = "luffy";
const password = "3d2y";

describe("user", () => {
  it("login a user", () => {
    // cy.createUserInDbAndLogin(usernameOrEmailOrPhoneNumber, password);
    cy.url().should("eq", `${Cypress.env("clientUrl")}/`);
  });
});
