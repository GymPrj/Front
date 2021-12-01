import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPage from '../components/MainPage';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import RegisterCompany from '../components/auth/RegisterCompany';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/memberSignUp" exact component={Register} />
        <Route path="/gymSignUp" exact component={RegisterCompany} />
        <>
          <Header />
          <Route path="/" exact component={MainPage} />
          <Footer />
        </>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
