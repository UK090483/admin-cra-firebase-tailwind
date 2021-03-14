/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("should render  ", async () => {
    render(<Spinner size={8} />);
  });
});
