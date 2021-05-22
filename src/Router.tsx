import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Url from './pages/Url';
import Login from './pages/Login';
import Assignment from './pages/Assignment';

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
        <Route exact path="/assignment/:id">
          <Assignment />
        </Route>
      </Switch>
    </HashRouter>
  );
}
