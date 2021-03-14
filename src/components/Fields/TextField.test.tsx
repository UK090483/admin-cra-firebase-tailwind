/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";

import TextField from "./TextField";

describe("TextField", () => {
  test("should Render", () => {
    const { getByText, debug } = render(
      <TextField text={"testText"} label={"testLabel"} />
    );

    getByText("testText");
    getByText("testLabel");
  });
});
