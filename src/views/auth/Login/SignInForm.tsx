import * as React from "react";

export interface ISignInFormProps {
  onSubmit: (email: string, password: string) => void;
}

export default function SignInForm(props: ISignInFormProps) {
  const { onSubmit } = props;
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleSubmit = () => {
    onSubmit(email, password);
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full  shadow-lg rounded-lg bg-gray-300 border-0 animate-fadeIn">
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0 ">
          <div className="text-gray-500 text-center mb-3 font-bold"></div>
          <form data-testid="login-form" className="pt-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                data-testid="email"
                id="email"
                value={email}
                name={"email"}
                type="email"
                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                data-testid="password"
                id="password"
                value={password}
                type="password"
                name={"password"}
                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="text-center mt-6">
              <button
                data-testid="submit"
                onClick={handleSubmit}
                className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                type="button"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
