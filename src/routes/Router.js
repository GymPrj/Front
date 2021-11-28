import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../components/Main';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import RegisterCompany from '../components/auth/RegisterCompany';
import GymSeach from '../components/GymSeach';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/registerCompany" exact component={RegisterCompany} />
        <Route path="/gymSeach" exact component={GymSeach} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
