import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "views/auth/Login/Login";

const Auth: React.FC = () => {
  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen bg-gray-900 ">
          <Login />
          {/* <Switch>
            <Route path="/auth/login" exact component={Login} />
           <Route path="/auth/register" exact component={Register} />
            <Redirect from="/auth" to="/auth/login" />
          </Switch> */}
        </section>
      </main>
    </>
  );
};

export default Auth;
