/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { MemoryRouter, Route } from "react-router-dom";
import AssessmentView from "./AssessmentView";
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

const RenderWithRouter: React.FC = () => (
  <TestWrap>
    <MemoryRouter initialEntries={["/applications/FakeApplication0"]}>
      <Route path="/applications/:id" component={AssessmentView} />
    </MemoryRouter>
  </TestWrap>
);

describe("AssessmentView", () => {
  const useSelectorMock = jest.spyOn(
    JudgeAppApplications,
    "useJudgeAppApplications"
  );

  it("should render", async () => {
    useSelectorMock.mockReturnValue({
      applications: { FakeApplication0: fakeApplication },
      applicationsData: [],
    });
    const { findByText, debug } = render(<RenderWithRouter />);

    findByText(fakeApplication.startupName);
  });
});
