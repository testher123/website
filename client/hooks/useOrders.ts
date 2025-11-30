import { useState, useEffect } from 'react';
import { orderStore } from '@/store/orders';
import { Order, OrderStatus } from '@/types';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(orderStore.getOrders());

  useEffect(() => {
    // Refresh orders every 2 seconds to show status updates
    const interval = setInterval(() => {
      setOrders(orderStore.getOrders());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return {
    orders,
    createOrder: orderStore.createOrder.bind(orderStore),
    getOrder: orderStore.getOrder.bind(orderStore),
    updateOrderStatus: orderStore.updateOrderStatus.bind(orderStore),
    cancelOrder: orderStore.cancelOrder.bind(orderStore),
  };
}
