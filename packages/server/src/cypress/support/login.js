/* eslint-disable no-undef */

const username = "luffy";
const password = "3d2y";

it("login a user", () => {
  cy.wait(1000);
  cy.visit("/login");
  cy.get('input[name="usernameOrEmailOrPhonenumber"]').type(username, {
    force: true,
  });
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});
