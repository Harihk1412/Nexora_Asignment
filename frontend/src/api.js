import axios from 'axios';
const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
export const api = axios.create({ baseURL: BASE });

export const getProducts = () => api.get('/products');
export const addToCart = (data) => api.post('/cart', data);
export const getCart = () => api.get('/cart');
export const updateCartQty = (id, qty) => api.put(`/cart/${id}`, { qty });
export const removeCartItem = (id) => api.delete(`/cart/${id}`);
export const checkout = (payload) => api.post('/checkout', payload);
