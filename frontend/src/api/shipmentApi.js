// src/api/shipmentApi.js
import api from './axios';

export const createShipment = (shipment) => api.post('/shipments', shipment);
export const getShipments = () => api.get('/shipments');
