// src/api/productApi.js
import api from './axios';

export const createProduct = (product) => api.post('/products', product);
export const getProducts = () => api.get('/products');
