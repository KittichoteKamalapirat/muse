/* eslint-disable no-undef */

const usernameOrEmailOrPhonenumber = "luffy";
const password = "3d2y";

it("login a user", () => {
  cy.login(usernameOrEmailOrPhonenumber, password);
});
