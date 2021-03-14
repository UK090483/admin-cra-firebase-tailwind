/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Sum from "./Sum";

describe("Sum", () => {
  it("should render", async () => {
    const { getByText } = render(<Sum sum={33} />);
    getByText("∅33");
  });
});
