import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface Order {
  id: number;
  customer: string;
  status: string;
  items: { productId: number; quantity: number }[];
}

const ORDER_STATUSES = ["pending", "shipped", "delivered", "cancelled"];

export function OrderManagement() {
  const { adminKey } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!adminKey) return;

    const fetchOrders = async () => {
      setError(null);
      try {
        const response = await fetch("/api/orders", {
          headers: { 'X-Admin-Auth': adminKey },
        });
        if (!response.ok) throw new Error("Could not fetch orders. Check your secret key.");
        const data = await response.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchOrders();
  }, [adminKey]);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    setError(null);
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Auth': adminKey! },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to update order status.");
      const updatedOrder = await response.json();
      setOrders(prevOrders => prevOrders.map(o => o.id === orderId ? updatedOrder : o));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Order & Delivery Management</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Order ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Customer</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status (Delivery)</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.customer}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  {ORDER_STATUSES.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}