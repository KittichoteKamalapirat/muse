/* eslint-disable no-undef */

// the cookie won't be preserved in the upcoming test without this
Cypress.Cookies.defaults({
  preserve: "qidRedis",
});

const usernameOrEmailOrPhoneNumber = "luffy";
const password = "3d2y";

beforeEach(() => {
  cy.visit("/login");
  cy.get('input[name="usernameOrEmailOrPhoneNumber"]').type(
    usernameOrEmailOrPhoneNumber,
    {
      force: true,
    }
  );
  cy.get('input[name="password"]').type(password);

  // submit button
  cy.get('button[type="submit"]').click();

  // assert the url
  cy.url().should("eq", `${Cypress.env("clientUrl")}/`);
});
