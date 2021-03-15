/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { ApplicationHelper } from "./ApplicationHelper";
import { TestWrap } from "tests/testPrepare";

describe("ApplicationHelper", () => {
  it("Match getTopics", async () => {
    expect(ApplicationHelper.getTopics()).toMatchSnapshot();
  });

  it("Match getFields", async () => {
    ApplicationHelper.getTopics().forEach((topic) => {
      expect(ApplicationHelper.getFields(topic)).toMatchSnapshot();
    });
  });

  it("Match getAllFields", async () => {
    expect(ApplicationHelper.getAllFields()).toMatchSnapshot();
  });

  it("Match getAssessments", async () => {
    ApplicationHelper.getTopics().forEach((topic) => {
      expect(ApplicationHelper.getAssessments(topic)).toMatchSnapshot();
    });
  });
  it("Match parseJotFormData", async () => {
    expect(ApplicationHelper.parseJotFormData({})).toMatchSnapshot();
  });
});
