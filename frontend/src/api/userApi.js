// src/api/userApi.js
// api/userApi.js
import axios from 'axios';

export const createUser = async (user) => {
  try {
    const res = await axios.post('http://localhost:8080/api/users/register', user);
    return res.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
