import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./i18n";
import configureStore from "./redux/store";

const store = configureStore();

ReactDOM.render(<App store={store} />, document.getElementById("root"));
