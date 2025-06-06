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

export const getUserProfile= async (id) => {
  try{
    const res = await axios.get(`http://localhost:8080/api/users/user-profile/${id}`,);
    return res.data;
  }catch (error) {
    console.error('Error fetching  user:', error);
    throw error;
  }
}

export const updateUserProfile = async(id, userData) => {
  try{
    const res = await axios.get(`http://localhost:8080/api/users/update-profile/${id}`,userData);
    return res.data;
  }catch (error) {
    console.error('Error Update  user:', error);
    throw error;
  }
}
