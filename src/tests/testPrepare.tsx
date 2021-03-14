import React from "react";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { BrowserRouter } from "react-router-dom";
import ReduxProvider from "redux/Provider";
import firebase from "../misc/firebase";
import { store } from "redux/store";

const TestWrap: React.FC = (props) => {
  return (
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={{}}
      dispatch={store.dispatch}
    >
      <ReduxProvider>
        <BrowserRouter>{props.children}</BrowserRouter>
      </ReduxProvider>
    </ReactReduxFirebaseProvider>
  );
};

export { TestWrap };
