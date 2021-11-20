import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../components/Main';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
