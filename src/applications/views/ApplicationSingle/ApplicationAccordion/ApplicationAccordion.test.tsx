/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ApplicationAccordion from "./ApplicationAccordion";
import { TestWrap } from "tests/testPrepare";
import { FakeApplication } from "seed/FakeApplication";

import { ApplicationHelper } from "applications/helper/ApplicationHelper";
import FakeAssessment from "../../../../seed/FakeAssessment";

import * as MockFirebase from "firebase-mock";

describe("ApplicationAccordion", () => {
  jest.mock("misc/firebase", () => {
    return MockFirebase.MockFirebaseSdk;
  });

  it("should render", async () => {
    const fakeApplication = FakeApplication();
    // @ts-ignore
    fakeApplication.foundingDate = "dfsdf";

    render(
      <TestWrap>
        <ApplicationAccordion application={fakeApplication} />
      </TestWrap>
    );
  });

  it("should render All Topics", async () => {
    const fakeApplication = FakeApplication();
    // @ts-ignore
    fakeApplication.foundingDate = "dfsdf";

    const { getAllByText } = render(
      <TestWrap>
        <ApplicationAccordion application={fakeApplication} />
      </TestWrap>
    );

    for (let field of Object.entries(ApplicationHelper.getTopics())) {
      const [key, value] = field;
      getAllByText(value);
    }
  });

  it("should render All Labels", async () => {
    const fakeApplication = FakeApplication();
    // @ts-ignore
    fakeApplication.foundingDate = "dfsdf";

    const { getAllByText } = render(
      <TestWrap>
        <ApplicationAccordion application={fakeApplication} />
      </TestWrap>
    );

    for (let field of Object.entries(ApplicationHelper.getAllFields())) {
      const [key, value] = field;
      getAllByText(value.label);
    }
  });

  it("should render Assessments", async () => {
    const fakeApplication = FakeApplication();
    // @ts-ignore
    fakeApplication.foundingDate = "dfsdf";

    fakeApplication.assessments = {
      B9LqKvEEgVJ1Go3yZDASFPVZE5cj: FakeAssessment(
        "ab",
        "B9LqKvEEgVJ1Go3yZDASFPVZE5cj"
      ),
    };

    const { getByTestId, debug, getByText } = render(
      <TestWrap>
        <ApplicationAccordion application={fakeApplication} />
      </TestWrap>
    );

    // debug(getByTestId("test-Product-fields"));
  });
});
