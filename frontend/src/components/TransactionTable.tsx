import React from "react";
import { ShipmentStatus, Transaction } from "../Types";

interface Props {
  transactions: Transaction[];
  onStatusChange: (id: number, status: ShipmentStatus) => void;
}

const TransactionTable: React.FC<Props> = ({ transactions, onStatusChange }) => {
  return (
    <table className="table-auto w-full border">
      <thead>
        <tr>
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Product</th>
          <th className="border px-4 py-2">Status</th>
          <th className="border px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <tr key={tx.id}>
            <td className="border px-4 py-2">{tx.id}</td>
            <td className="border px-4 py-2">{tx.productName}</td>
            <td className="border px-4 py-2">{tx.status}</td>
            <td className="border px-4 py-2">
              <select
                value={tx.status}
                onChange={(e) =>
                  onStatusChange(tx.id, e.target.value as ShipmentStatus)
                }
              >
                <option value="PENDING">PENDING</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="DELIVERED">DELIVERED</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
