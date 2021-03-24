import { data } from "autoprefixer";
import { FakeApplication } from "../../../src/seed/FakeApplication";
/// <reference types="cypress" />

context("Navigation", () => {
  before(() => {
    cy.clearFireStore();
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    cy.navigate();
    cy.fixture("users").then((logo) => {
      const userId = logo.users[0].localId;
      const email = logo.users[0].email;

      cy.get("[data-testid=email]").type(email);
      cy.get("[data-testid=password]").type("F123456");
      cy.get("[data-testid=submit]").click();
    });
    cy.wait(2000);
  });

  it("Info should be visible", () => {
    cy.get("[data-testid=intro]").should("be.visible");
    cy.get("[data-testid=introClickAway]")
      .click()
      .get("[data-testid=intro]")
      .should("not.exist");
  });

  it("should show the Application Prejudge", async () => {
    cy.fixture("users").then((logo) => {
      const userId = logo.users[0].localId;
      const email = logo.users[0].email;

      cy.callFirestore("update", "tableDoc/first", {
        ["FakeApplication1.assessments"]: [userId],
      });

      cy.get("[data-testid=tableRow-FakeApplication1]").should("be.visible");

      cy.callFirestore("update", "tableDoc/first", {
        ["FakeApplication2.assessments"]: [userId],
      });

      cy.get("[data-testid=tableRow-FakeApplication2]").should("be.visible");

      cy.clearFireStore();

      cy.get("[data-testid=tableRow-FakeApplication1]").should("not.exist");
      cy.get("[data-testid=tableRow-FakeApplication2]").should("not.exist");
    });
  });

  it("should go Assessment", async () => {
    cy.fixture("users").then((logo) => {
      const userId = logo.users[0].localId;

      cy.callFirestore("update", "tableDoc/first", {
        ["FakeApplication1.assessments"]: [userId],
      });

      cy.get("[data-testid=tableRow-FakeApplication1]").click();

      cy.location().should((location) => {
        expect(location.href).to.eq(
          "http://localhost:3000/applications/FakeApplication1"
        );
      });

      cy.clearFireStore();
    });
  });
});
