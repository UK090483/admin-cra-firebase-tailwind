/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, fireEvent, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import Form2, { FormFields } from "./Form";
import { debug } from "console";

const testFields: FormFields = [
  { name: "name", type: "text", label: "Name", initialValue: "testValue" },
  {
    name: "email",
    type: "email",
    label: "Email",
    validation: (value) => {
      return value && value.length > 10 ? undefined : "error Text";
    },
  },
];

describe("Form", () => {
  it("should render  ", () => {
    const { getByLabelText, getByText } = render(
      <Form2 formFields={testFields} onSubmit={jest.fn}></Form2>
    );
    expect(getByLabelText("Name")).toHaveDisplayValue("testValue");
    getByLabelText("Email");
    expect(getByText("Submit")).toHaveProperty("disabled");
  });

  it("should validate ", async () => {
    const { getByLabelText, findByText, debug } = render(
      <Form2 formFields={testFields} onSubmit={jest.fn}></Form2>
    );

    const emailInput = getByLabelText("Email");
    await waitFor(() => {
      fireEvent.change(emailInput, { target: { value: "abc" } });
    });
    expect(emailInput).toHaveValue("abc");
    const error = await waitFor(() => findByText("error Text"));
    expect(error).toBeTruthy();
  });

  it("should return Result on submit ", async () => {
    const onSubmit = jest.fn();
    const { getByLabelText, getByText, debug } = render(
      <Form2 formFields={testFields} onSubmit={onSubmit}></Form2>
    );

    const emailInput = getByLabelText("Email");
    const nameInput = getByLabelText("Name");
    const submit = getByText("Submit");

    await waitFor(() => {
      fireEvent.change(emailInput, { target: { value: "abcdefg@me.com" } });
    });
    await waitFor(() => {
      fireEvent.change(nameInput, { target: { value: "TestName" } });
    });

    await waitFor(() => {
      fireEvent.click(submit);
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(
      { email: "abcdefg@me.com", name: "TestName" },
      expect.anything()
    );
  });
});
