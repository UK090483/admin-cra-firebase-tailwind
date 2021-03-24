/// <reference types="cypress" />

context("Navigation", () => {
  before(() => {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
  });

  it("login", async () => {
    cy.navigate();
    cy.get("[data-testid=email]").type("web@konradullrich.com");
    cy.get("[data-testid=password]").type("123456");
    cy.get("[data-testid=submit]").click();
    cy.get("[data-testid=Judges]").click();
    cy.get("[data-testid=actionButton]").click();

    cy.get('input[name="name"]').type("fakejudge 100");
    cy.get('input[name="email"]').type("fakejudge100@test.com");
    cy.get(".bg-pink-200").click();
    cy.get("button[type=submit]").click();
  });

  // it("cy.visit() - visit a remote url", () => {
  //   https://on.cypress.io/visit
  //   Visit any sub-domain of your current domain
  //   Pass options to the visit
  //   cy.visit('https://example.cypress.io/commands/navigation', {
  //     timeout: 50000, // increase total time for the visit to resolve
  //     onBeforeLoad (contentWindow) {
  //       // contentWindow is the remote page's window object
  //       expect(typeof contentWindow === 'object').to.be.true
  //     },
  //     onLoad (contentWindow) {
  //       // contentWindow is the remote page's window object
  //       expect(typeof contentWindow === 'object').to.be.true
  //     },
  //   })
  // });
});
