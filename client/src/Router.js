import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Menu from "./components/Menu";
import Profile from "./components/Profile";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/restaurants/:restaurantId" component={Menu} />
      <Route path="/profile/:userId" component={Profile} />
    </Switch>
  </BrowserRouter>
);

export default Router;