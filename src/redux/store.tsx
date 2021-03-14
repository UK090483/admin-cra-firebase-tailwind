import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./Reducers/RootReducer";
import thunk from "redux-thunk";
// import storage from "redux-persist/lib/storage";
import localForage from "localforage";

const initialState = {};

const middlewares = [];

const storage = localForage.createInstance({
  driver: localForage.WEBSQL, // Force WebSQL; same as using setDriver()
  name: "myApp",
  version: 1.0,
  size: 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: "keyvaluepairs", // Should be alphanumeric, with underscores.
  description: "some description",
});

const rootPersistConfig = {
  key: "root",
  storage,
};

const composeEnhancers =
  (process.env.NODE_ENV === "development" // @ts-ignore
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;

middlewares.push(applyMiddleware(thunk));

const store = createStore(
  rootReducer,
  // persistReducer<any, any>(rootPersistConfig, rootReducer),
  initialState,
  composeEnhancers(...middlewares)
);

export type RootState = ReturnType<typeof store.getState>;
const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export { store };
