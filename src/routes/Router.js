import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../components/Main';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
