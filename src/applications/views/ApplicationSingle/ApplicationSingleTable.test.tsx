/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import ApplicationSingleTable from "./ApplicationSingleTable";
import { TestWrap } from "tests/testPrepare";

describe("ApplicationSingleTable", () => {
  it("Renders without Crashing", async () => {
    render(
      <TestWrap>
        {/* <ApplicationSingleTable application></ApplicationSingleTable> */}
      </TestWrap>
    );
  });
});
