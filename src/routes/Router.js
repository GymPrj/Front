import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPage from '../components/MainPage';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import RegisterCompany from '../components/auth/RegisterCompany';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import TrainerRegister from '../components/TrainerRegister';
import GymDetailPage from '../components/GymDetailPage';
import TrainerDetailPage from '../components/TrainerDetailPage';

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
          <Route path="/tainerCreate" exact component={TrainerRegister} />
          <Route path="/gymDetail/:gymId" exact component={GymDetailPage} />
          <Route
            path="/trainerDetail/:gymId/:name"
            exact
            component={TrainerDetailPage}
          />
          <Footer />
        </>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
