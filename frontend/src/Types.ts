export type ShipmentStatus = "PENDING" | "SHIPPED" | "DELIVERED";

export interface Transaction {
  id: number;
  productName: string;
  status: ShipmentStatus;
}
