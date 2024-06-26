import React from "react";
import { Provider } from "react-redux";
import App from "./App";

import store from "./store/store";

const Index = () => {
  return (
    <Provider store={store}>
      <App></App>
    </Provider>
  );
};

export default Index;
