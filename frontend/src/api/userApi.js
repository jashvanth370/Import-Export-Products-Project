// src/api/userApi.js
import api from './axios';

export const createUser = (user) => api.post('/users', user);
export const getUsers = () => api.get('/users');
