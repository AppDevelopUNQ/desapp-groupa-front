import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

import { Home } from "./pages/Home";
import { ControlPanel } from "./pages/ControlPanel";
import { Selector } from "./components/Lenguaje";
import { Logout } from "./components/Logout";
import { Login } from "./components/Login";
import { CircularProgress } from "@material-ui/core";
import "./style.sass";

const App = ({ store }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const fn_login = () => {
    console.log("usuario -> ", user);
    if (isLoading)
      return <CircularProgress color='secondary'></CircularProgress>;

    if (isAuthenticated) return <Logout />;

    return <Login />;
  };
  const ruteo = () => {
    if (!isAuthenticated) return <Route exact path='/' component={Home} />;
    return <Route exact path='/' component={ControlPanel} />;
  };
  return (
    <Provider store={store}>
      <Router>
        <div className='root'>{ruteo()}</div>
      </Router>
      <div className='nav'>
        {fn_login()}
        <Selector />
      </div>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
