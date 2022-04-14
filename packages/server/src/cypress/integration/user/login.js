/* eslint-disable no-undef */

const usernameOrEmailOrPhonenumber = "luffy";
const password = "3d2y";

describe("user", () => {
  it("login a user", () => {
    // cy.createUserInDbAndLogin(usernameOrEmailOrPhonenumber, password);
    cy.url().should("eq", `${Cypress.env("clientUrl")}/`);
  });
});
