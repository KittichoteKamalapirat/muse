/* eslint-disable no-undef */

import "@testing-library/cypress/add-commands"; // so we can use same command as in react-testing-library
import "cypress-file-upload";

Cypress.Commands.add(
  "createUserInDbAndLogin",
  (usernameOrEmailOrPhoneNumber, password) => {
    // create a user in db first
    cy.task("createAUserInDb");
    cy.wait(1000);

    // visit login [age]
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
  }
);
