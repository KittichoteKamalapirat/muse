/* eslint-disable no-undef */
// CypressOnRails: dont remove these command
Cypress.Cookies.defaults({
  preserve: "userToken",
});

it("Login user, set jwt token", () => {
  cy.visit("/");
  cy.get('input[name="email"]').clear().type(`test@test.com`);
  cy.get('input[name="password"]').clear().type(`password`);
  cy.get("button[name='Login']").click();
  cy.url().should("eq", `${Cypress.env("clientUrl")}/customers`);
  cy.getCookie("userToken").then(() => cy.Cookies.preserveOnce("userToken"));

  const username = "luffy";
  const email = "luffy@gmail.com";
  const phonenumber = "0900000000";
  const password = "3d2y";
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="phonenumber"]').type(phonenumber);
  cy.get('input[name="password"]').type(password);
});
