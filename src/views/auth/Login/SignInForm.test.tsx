/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SignInForm, { ISignInFormProps } from "./SignInForm";

function renderLoginForm(props: Partial<ISignInFormProps> = {}) {
  const defaultProps: ISignInFormProps = {
    onSubmit() {
      return;
    },
  };
  return render(<SignInForm {...defaultProps} {...props} />);
}

describe("SignINForm", () => {
  it("Renders without Crashing", async () => {
    renderLoginForm();
  });

  it("has email and Password", async () => {
    const { findByTestId } = renderLoginForm();
    const loginForm = await findByTestId("login-form");

    const email = (await findByTestId("email")) as HTMLInputElement;
    const password = (await findByTestId("password")) as HTMLInputElement;
    expect(email.value).toEqual("");
    expect(password.value).toEqual("");
  });

  it("should allow entering a email and Password", async () => {
    const { findByTestId } = renderLoginForm();
    const email = (await findByTestId("email")) as HTMLInputElement;
    const password = (await findByTestId("password")) as HTMLInputElement;
    fireEvent.change(email, { target: { value: "test@test.com" } });
    fireEvent.change(password, { target: { value: "12345678" } });
    expect(email.value).toEqual("test@test.com");
    expect(password.value).toEqual("12345678");
  });

  it("should allow entering a email", async () => {
    const onSubmit = jest.fn();
    const { findByTestId } = renderLoginForm({ onSubmit });
    const email = (await findByTestId("email")) as HTMLInputElement;
    const password = (await findByTestId("password")) as HTMLInputElement;
    const submitButton = await findByTestId("submit");

    fireEvent.change(email, { target: { value: "test@test.com" } });
    fireEvent.change(password, { target: { value: "12345678" } });
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith("test@test.com", "12345678");

    expect(email.value).toEqual("test@test.com");
    expect(password.value).toEqual("12345678");
  });
});
