import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', {
        username: name,
      password: password
    });
      navigate("/")
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <h1>Login to E-Commerce site</h1>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        className="input"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className='login-btn'>Login</button>
    </form>
  );
};

export default Login;