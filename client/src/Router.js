import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Menu from "./components/Menu";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/restaurants/:restaurantId" component={Menu} />
    </Switch>
  </BrowserRouter>
);

export default Router;