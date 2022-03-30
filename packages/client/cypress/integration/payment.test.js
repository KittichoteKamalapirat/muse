describe("payment", () => {
  it("user can make payment via QR code", () => {
    cy.visit("/");

    // cy.visit(`${Cypress.env("clientUrl")}`);
    //visit the site
    // register
    // cy.get("a[]")
    //click the register button
    cy.contains("Sign up").click();

    //create a new account
    const username = "luffy";
    const email = "luffy@gmail.com";
    const phonenumber = "0900000000";
    const password = "3d2y";
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="phonenumber"]').type(phonenumber);
    cy.get('input[name="password"]').type(password);

    cy.get('button[type="submit"]').click();
    //create a new product
    //
    //create an order
    //make a payment
  });
});
