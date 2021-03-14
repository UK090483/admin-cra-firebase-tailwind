import React from "react";

import SignInForm from "./SignInForm";
import { useAuth } from "hooks/useAuth";

export default function Login() {
  const { signIn } = useAuth();

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <SignInForm
              onSubmit={(email, password) => {
                signIn(email, password);
              }}
            ></SignInForm>
          </div>
        </div>
      </div>
    </>
  );
}
