/* eslint-disable no-undef */

before(() => {
  //   cy.task("clearDb");
  cy.task("clearDbAndCreateAUserInDb");
});

// it("Clear a database before each test", () => {
//   cy.task("clearDb");
// });
