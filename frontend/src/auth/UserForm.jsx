import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate
import { createUser } from '../api/userApi';
import '../styles/UserForm.css'; // Import the CSS file

function UserForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'EXPORTER' });
  const navigate = useNavigate(); // <-- Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(form);
      alert('User created!');
      navigate('/'); // <-- Redirect to home page
    } catch (error) {
      alert('Error creating user. Please try again.');
      console.error(error);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <label className="form-label">Name</label>
      <input
        className="form-input"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <label className="form-label">Email</label>
      <input
        className="form-input"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <label className="form-label">Password</label>
      <input
        type="password"
        className="form-input"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <label className="form-label">Role</label>
      <select
        className="form-input"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="EXPORTER">Exporter</option>
        <option value="IMPORTER">Importer</option>
        <option value="ADMIN">Officer</option>
      </select>

      <button type="submit" className="form-button">Create User</button>
    </form>
  );
}

export default UserForm;
