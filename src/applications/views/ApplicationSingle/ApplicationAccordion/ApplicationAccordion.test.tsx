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

describe("ApplicationAccordion", () => {
  it("should render", async () => {
    const fakeApplication = FakeApplication();
    fakeApplication.foundingDate = "dfsdf";

    render(
      <TestWrap>
        <ApplicationAccordion application={fakeApplication} />
      </TestWrap>
    );
  });
});
