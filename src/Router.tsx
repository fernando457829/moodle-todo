import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Entrypoint from './pages/Entrypoint';
import Home from './pages/Home';
import Login from './pages/Login';

export default function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <Entrypoint />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </HashRouter>
  );
}
