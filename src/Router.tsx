import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Url from './pages/Url';
import Login from './pages/Login';

export default function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/url">
          <Url />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </HashRouter>
  );
}
