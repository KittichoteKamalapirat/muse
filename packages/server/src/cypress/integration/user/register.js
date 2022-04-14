/* eslint-disable no-undef */

const username = "luffy";
const email = "luffy@gmail.com";
const password = "3d2y";
const phonenumber = "0900000000";

describe("user", () => {
  it.skip("can register a user", () => {
    // visit register page
    cy.visit("/register");

    // fill in the form
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="phonenumber"]').type(phonenumber);
    cy.get('input[name="password"]').type(password);

    // submit button
    cy.get('button[type="submit"]').click();

    // assert the url
    cy.url().should("eq", `${Cypress.env("clientUrl")}/`);
  });
});
