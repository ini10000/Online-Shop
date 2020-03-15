import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import ReduxThunk from "redux-thunk";

import productReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import authReducer from "./store/reducers/auth";
import ordersReducer from "./store/reducers/orders";
import NavigationContainer from "./routes/NavigationContainer";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  if (!isLoading) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setIsLoading(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
