/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { MemoryRouter, Route } from "react-router-dom";
import JudgeApplicationAccordion from "./JudgeApplicationAccordion";
import { TestWrap } from "tests/testPrepare";
import * as JudgeAppApplications from "./state/hooks/useJudgeAppApplications";
import { FakeApplication } from "../seed/FakeApplication";
import { IApplicationRecord } from "../applications/ApplicationTypes";
import FakeAssessment from "../seed/FakeAssessment";

const fakeApplication = FakeApplication();
// @ts-ignore
fakeApplication.foundingDate = "dfg";

const fakeAssessment = FakeAssessment("234", "234");
fakeApplication.assessments = { dfgdg: fakeAssessment };

describe("JudgeApplicationAccordion", () => {
  it("should render", async () => {
    const { debug } = render(
      <TestWrap>
        <JudgeApplicationAccordion application={fakeApplication} />
      </TestWrap>
    );
  });
});
