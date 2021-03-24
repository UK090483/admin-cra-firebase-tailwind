/// <reference types="cypress" />

import Fields from "../../../src/assessments/helper/fields";

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
  });

  it("should have all Accordions", async () => {
    cy.fixture("users").then((logo) => {
      const userId = logo.users[0].localId;

      cy.callFirestore("update", "tableDoc/first", {
        ["FakeApplication1.assessments"]: [userId],
      });

      cy.wait(1000);

      cy.get("[data-testid=tableRow-FakeApplication1]").click();

      cy.wrap([
        { label: "Basic information" },
        { label: "Startup overview" },
        {
          label: "Product",
          questions: [
            {
              label: "Is the product/service innovative",
              name: "isInnovative",
            },
            {
              label: "Is there a clear USP ?",
              name: "isClearUSP",
            },
          ],
        },
        {
          label: "Market",
          questions: [
            {
              label: "Is there relevant market potential ?",
              name: "isTherePotential",
            },
          ],
        },
        {
          label: "Competition",
          questions: [
            {
              label: "Do they know their competitors ?",
              name: "doTheyKnowCompetitors",
            },
          ],
        },
        {
          label: "Business",
          questions: [
            {
              label:
                "Is their business model solid and in balance with their resources?",
              name: "isBusinessModelSolid",
            },
            {
              label: "Are the numbers promising?",
              name: "areNumbersPromising",
            },
          ],
        },
        {
          label: "Funding",
          questions: [
            {
              label: "Is the funding solid?",
              name: "isFundingSolid",
            },
          ],
        },
        {
          label: "Team",
          questions: [
            {
              label: "Is Team Experienced",
              name: "isTeamExperienced",
            },
          ],
        },
        {
          label: "Impact",
          questions: [
            {
              label: "Will our future cities benefit from their idea? ",
              name: "willFutureCitiesBenefit",
            },
            {
              label: "Is the business in compliance with the SDGs?",
              name: "isComplianceWithSDG",
            },
          ],
        },
        {
          label: "Media",
          questions: [
            {
              label:
                "Is the startup presentation based on elevator pitch, pitch deck and website good?",
              name: "isPresentationGood",
            },
          ],
        },
      ]).each((topic) => {
        return new Cypress.Promise((resolve) => {
          cy.contains(topic.label).should("be.visible").click();

          if (topic.questions) {
            topic.questions.forEach((question) => {
              cy.contains(question.label).should("be.visible");
              cy.get(`[data-testid=pointInput-${question.name}]`).should(
                "be.visible"
              );
              // cy.get(
              //   `[data-testid=pointInput-${question.name}]> :nth-child(2)`
              // ).click();

              // cy.callFirestore("get", `judges/${userId}`).then((res) => {
              //   expect(res.assessments.FakeApplication1[question.name]).to.eq(
              //     2
              //   );
              // });
            });
          }

          cy.contains(topic.label).click();
          resolve();
        });
      });

      // Object.entries(Fields).forEach(([key, field]) => {
      //   cy.contains(field.label);
      // });
    });
  });
});
