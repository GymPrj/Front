import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPage from '../components/MainPage';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
<<<<<<< HEAD
import RegisterCompany from '../components/auth/RegisterCompany';
import GymSeach from '../components/GymSeach';
import TrainerRegister from '../components/TrainerRegister';
=======
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
>>>>>>> a27cbfd9c81d90473a66c015e7db23c089d4ed9e

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
<<<<<<< HEAD
        <Route path="/registerCompany" exact component={RegisterCompany} />
        <Route path="/gymSeach" exact component={GymSeach} />
        <Route path="/trainerRegister" exact component={TrainerRegister} />
=======
        <>
          <Header />
          <Route path="/" exact component={MainPage} />
          <Footer />
        </>
>>>>>>> a27cbfd9c81d90473a66c015e7db23c089d4ed9e
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
