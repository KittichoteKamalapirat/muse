/* eslint-disable no-undef */

it("register a user", () => {
  cy.task("register", "This will be output to the terminal");
  cy.wait(1000); // wait awhile for the data to be saved to
});
