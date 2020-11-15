import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";

import { Home } from "./pages/Home";
import { ControlPanel } from "./pages/ControlPanel";
import { Selector } from "./components/Lenguaje";
import { Logout } from "./components/Logout";

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div
        style={{
          marginTop: 60,
        }}>
        <Route exact path='/' component={Home} />
        <Route exact path='/ControlPanel' component={ControlPanel} />
      </div>
    </Router>
    <div
      style={{
        display: "flex",
        position: "fixed",
        top: 20,
        left: 20,
        width: 10,
      }}>
      <Logout />
      <Selector />
    </div>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
