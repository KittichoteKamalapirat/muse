const username = "luffy";
const email = "luffy@gmail.com";
const phonenumber = "0900000000";
const password = "3d2y";

it("login a user", () => {
  cy.visit("/login");
  cy.get('input[name="usernameOrEmailOrPhonenumber"]').type(username, {
    force: true,
  });
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});
