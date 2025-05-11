import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';
import '../styles/LoginPage.css';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
     e.preventDefault();

  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const { token, userId: id, userName: name, role1} = await response.json(); // extract id, name, and token
    console.log('Login response:', { id, name, token }); 

    // Fetch the role using the token
    const roleResponse = await fetch('http://localhost:8080/api/users/role', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!roleResponse.ok) {
      throw new Error('Failed to fetch user role');
    }

    const roleData = await roleResponse.json();
    const role = roleData.role;

    // Store the token and user details (id, name, role) in localStorage and the store
    login({ id, name, role, token }); // save id, name, role, and token
    console.log('User logged in:', { id, name, role, token });


    navigate('/'); // Navigate to the home page after successful login
  } catch (err) {
    setError(err.message);
  }
};


  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
