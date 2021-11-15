import React, { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = e => {
    if (password !== rePassword) {
      setPasswordError(true);
    } else setPasswordError(false);
  };

  return (
    <div>
      <p>Join</p>
      <input type="email" value={email} />
      <input type="password" value={password} />
      <input type="password" value={rePassword} />
      <input type="text" value={gender} />
      <input type="text" value={age} />
      <input type="text" value={address} />

      <button onClick={handleSubmit}>회원가입</button>
    </div>
  );
};

export default Register;
