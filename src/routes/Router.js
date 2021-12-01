import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPage from '../components/MainPage';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import RegisterCompany from '../components/auth/RegisterCompany';
import TrainerRegister from '../components/TrainerRegister';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/registerCompany" exact component={RegisterCompany} />
        <>
          <Header />
          <Route path="/" exact component={MainPage} />
          <Route path="/rrainerCreate" exact component={TrainerRegister} />
          <Footer />
        </>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
