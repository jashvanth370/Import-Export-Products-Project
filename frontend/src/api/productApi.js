// src/api/productApi.js
import axios from './axios';

const BASE_URL ='http://localhost:8080/api';

export const createProduct = (product) => api.post('/products', product);
export const getProducts = async () => {
    await axios.get(`${BASE_URL}/products`);
}


