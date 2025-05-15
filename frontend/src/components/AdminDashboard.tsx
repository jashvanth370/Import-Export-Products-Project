import React, { useEffect, useState } from "react";
import { ShipmentStatus, Transaction } from "../Types";
import "../styles/AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("");

  // const getTransactions = async () => {
  //   const res = await fetchTransactions(statusFilter);
  //   setTransactions(res.data);
  // }

  // useEffect(() => {
  //   getTransactions();
  // }, [statusFilter]);

  // const handleStatusChange = async (id: number, newStatus: ShipmentStatus) => {
  //   await updateTransactionStatus(id, newStatus);
  //   getTransactions();
  // };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="filter-container">
        <label>Status Filter: </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="PENDING">PENDING</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="DELIVERED">DELIVERED</option>
        </select>
      </div>

  
    </div>
  );
};

export default AdminDashboard;
