import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./i18n";
import configureStore from "./redux/store";
import { Auth0Provider } from "@auth0/auth0-react";

const store = configureStore();

ReactDOM.render(
  <Auth0Provider
    domain='dev-w2a5iben.auth0.com'
    clientId='jD7zPXnzQHpkDtUP-NPlCCaUii2jlviy'
    redirectUri={window.location.origin}>
    <App store={store} />
  </Auth0Provider>,
  document.getElementById("root")
);
