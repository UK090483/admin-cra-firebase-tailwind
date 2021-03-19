import "misc/assets/styles/tailwind.css";
import { firebase } from "misc/firebase";
import { render } from "react-dom";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { BrowserRouter } from "react-router-dom";
import { createFirestoreInstance } from "redux-firestore";
import ReduxProvider from "redux/Provider";
import { store } from "redux/store";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./styles/index.css";

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
