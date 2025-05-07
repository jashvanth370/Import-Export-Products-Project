import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // Adjust base URL as needed
});

export const fetchTransactions = (status?: string) =>
  API.get(`/transactions${status ? `?status=${status}` : ""}`);

export const updateTransactionStatus = (id: number, status: string) =>
  API.put(`/transactions/${id}/status`, { status });
