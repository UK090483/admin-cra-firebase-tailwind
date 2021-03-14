import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Admin from "./layouts/admin/Admin";
import Auth from "./layouts/Auth";
import Judge from "./layouts/judge/Judge";
import { useSelector } from "react-redux";
import { RootState } from "./redux/Reducers/RootReducer";
import { Spinner } from "./components/Spinner/Spinner";
import "styles.css";

function App() {
  const { authLoaded, isEmpty, isAdmin } = useSelector((state: RootState) => ({
    isEmpty: state.fb.auth.isEmpty,
    isAdmin: state.fb.profile.token?.claims.admin,
    authLoaded: state.fb.auth.isLoaded,
  }));

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
