import React from "react";
import { Route, Switch } from "react-router-dom";
import Admin from "./layouts/admin/Admin";
import Auth from "./layouts/Auth";
import Judge from "./layouts/judge/Judge";
import { Spinner } from "./components/Spinner/Spinner";
import "styles.css";
import { useAuth } from "hooks/useAuth";

function App() {
  const { authLoaded, isEmpty, isAdmin } = useAuth();

  return (
    <Switch>
      <AuthIsLoaded isLoaded={authLoaded}>
        {isEmpty ? (
          <>
            <Route path="/" component={Auth} />
            {/* <Redirect to="/auth"></Redirect> */}
          </>
        ) : isAdmin ? (
          <>
            <Route path="/" component={Admin} />
            {/* <Redirect to="/"></Redirect> */}
          </>
        ) : (
          <>
            <Route path="/" component={Judge} />
            {/* <Redirect to="/"></Redirect> */}
          </>
        )}
      </AuthIsLoaded>
    </Switch>
  );
}

export default App;

interface IAuthIsLoadedProps {
  children: any;
  isLoaded: boolean;
}

const AuthIsLoaded: React.FC<IAuthIsLoadedProps> = ({ children, isLoaded }) => {
  return (
    <>
      <div
        data-testid={isLoaded ? "" : "splash screen"}
        className={`flex justify-center items-center absolute top-0 w-full h-screen bg-blue-900 transition-all duration-300 ${
          isLoaded ? "opacity-0 z-0 h-0 w-0  hidden " : "opacity-100"
        }`}
      >
        <Spinner size={"1/2"}></Spinner>
      </div>
      {isLoaded && children}
    </>
  );
};
