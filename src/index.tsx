import React from "react";
import { render } from "react-dom";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ReduxProvider from "redux/Provider";

// import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import "./styles/index.css";
import { store } from "redux/store";
import { firebase } from "misc/firebase";
import { createFirestoreInstance } from "redux-firestore";

const rrfConfig = {
  userProfile: "judges",
  useFirestoreForProfile: true,
  enableClaims: true,
  presence: "presence",
  sessions: "sessions",
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

function Index() {
  return (
    <ReactReduxFirebaseProvider {...rrfProps}>
      <ReduxProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReduxProvider>
    </ReactReduxFirebaseProvider>
  );
}

render(<Index />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
