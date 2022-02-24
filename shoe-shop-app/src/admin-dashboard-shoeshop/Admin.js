
import React from "react";
import { BrowserRouter as Router, Switch, Route ,  useRouteMatch, } from "react-router-dom";

import "./Admin.css";
import "./responsive.css";

import HomeScreen from "./screens/HomeScreen";

const Admin = () => {

  let { path, url } = useRouteMatch();

    return (
      <div>
         <Router>
          <Switch>
            <Route path={`${url}`} component={HomeScreen} exact />
          </Switch>
        </Router>
      </div>
    );
  };
  export default Admin;
