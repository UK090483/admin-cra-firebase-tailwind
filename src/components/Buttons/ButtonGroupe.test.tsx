/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Button from "./Button";
import ButtonGroupe from "./ButtonGroupe";

describe("ButtonGroupe", () => {
  test("renders with no props", () => {
    const { getByText } = render(
      <ButtonGroupe items={[{ label: "a" }, { label: "b" }, { label: "c" }]} />
    );
    getByText("b");
  });

  test("should call the onClick callback", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <ButtonGroupe
        items={[{ label: "a" }, { label: "b", id: "testid" }, { label: "c" }]}
        onClick={onClick}
      />
    );

    fireEvent.click(getByText("b"));

    expect(onClick).toBeCalledTimes(1);
    expect(onClick).toBeCalledWith(1, "testid");
  });
});
