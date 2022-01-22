import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPage from '../components/MainPage';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Router = () => {
  return (
    <BrowserRouter>
      <>
        <Header />
        <div id="wrapper">
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/memberSignUp" exact component={Register} />
            <Route path="/" exact component={MainPage} />
          </Switch>
        </div>
        <Footer />
      </>
    </BrowserRouter>
  );
};

export default Router;
