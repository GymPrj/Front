const authHeader= () => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (user && user.accessToken) {
      return { Authorization: "Bearer " + user.accessToken };
    }
}

import React from 'react';
import axios from 'axios';

const API_URL = 'http://3.37.165.129/api/session/login';

export const LoginServe = (email, password,loginIdType) => {
  return axios.post(API_URL + 'login', { email, password, loginTypeId}).then(response => {
    if (response.data.accessToken) {
      cookies.save('user', JSON.stringify(response.data));
    }

    return response.data;
  });
};

