/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Loading from "./Loading";

describe("Loading", () => {
  it("should render  ", async () => {
    render(<Loading show={true} />);
  });
});
