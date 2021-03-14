import * as React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

interface IProviderProps {}

const ReduxProvider: React.FunctionComponent<IProviderProps> = (props) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default ReduxProvider;
