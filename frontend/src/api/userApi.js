// src/api/userApi.js
// api/userApi.js
import axios from 'axios';


export const createUser = async (user) => {
  const formData = new FormData();

  formData.append('name', user.name);
  formData.append('email', user.email);
  formData.append('password', user.password);
  formData.append('role', user.role);
  formData.append('phone', user.phone);
  formData.append('address', user.address);
  if (user.profilePic) {
    formData.append('profilePic', user.profilePic);
  }

  return await axios.post('http://localhost:8080/api/users/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
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
    const res = await axios.put(`http://localhost:8080/api/users/update-profile/${id}`,userData);
    return res.data;
  }catch (error) {
    console.error('Error Update  user:', error);
    throw error;
  }
}
