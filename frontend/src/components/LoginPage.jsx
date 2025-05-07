import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';
import '../styles/LoginPage.css';

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
  
      const { token } = await response.json();
      
      // Make an additional API call to get the user's role
      const roleResponse = await fetch('http://localhost:8080/api/user/role', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });
  
      if (!roleResponse.ok) {
        throw new Error('Failed to fetch user role');
      }
  
      const roleData = await roleResponse.json(); // Assuming it returns a { role: 'IMPORTER' } structure
      const role = roleData.role;  // Extract the role
  
      // Store the token and role in your global state (e.g., Zustand)
      login({ token, role });
  
      navigate('/'); // Redirect to home or products
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
