/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import TextPreview from "./TextPreview";
import { testRows } from "components/Table/tests/testPrepare";

describe("TextPreview", () => {
  it("should render", async () => {
    const { getByText, debug } = render(
      <TextPreview row={testRows} prevItemList={["name", "age"]} />
    );
  });
});
