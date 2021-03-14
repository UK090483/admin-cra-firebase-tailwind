/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ApplicationAccordion from "./ApplicationAccordion";
import { TestWrap } from "tests/testPrepare";
import { FakeApplication } from "seed/FakeApplication";
import { parseAllDatesDoc } from "redux/api/helper/timestamp-parser";
import { ApplicationHelper } from "applications/helper/ApplicationHelper";
import { loadDatabaseRules } from "@firebase/rules-unit-testing";

describe("ApplicationAccordion", () => {
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
});
