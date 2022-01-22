import React, { useState } from 'react';
import axios from 'axios'; // eslint-disable-line no-unused-vars

const Login = () => {
  const [email, setEmail] = useState(''); // eslint-disable-line no-unused-vars
  const [password, setPassword] = useState(''); // eslint-disable-line no-unused-vars
  return (
    <div>
      <p>로그인</p>
      <input type="email" value={email} />
      <input type="password" value={password} />
      <button type="button">로그인</button>
    </div>
  );
};
export default Login;
