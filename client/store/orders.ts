import { Order, OrderStatus } from '@/types';

const ORDERS_STORAGE_KEY = 'lighthub_orders';

export const orderStore = {
  getOrders(): Order[] {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (!stored) return [];
      return JSON.parse(stored).map((order: any) => ({
        ...order,
        createdAt: new Date(order.createdAt),
        estimatedDelivery: new Date(order.estimatedDelivery),
        statusHistory: order.statusHistory.map((h: any) => ({
          ...h,
          timestamp: new Date(h.timestamp),
        })),
      }));
    } catch {
      return [];
    }
  },

  createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'statusHistory' | 'trackingNumber'>): Order {
    const orders = this.getOrders();
    const orderNumber = `ORD-${Date.now()}`;
    const trackingNumber = `TRK-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    
    const order: Order = {
      ...orderData,
      id: `order-${Date.now()}`,
      orderNumber,
      trackingNumber,
      statusHistory: [
        {
          status: 'pending',
          timestamp: new Date(),
          message: 'Order received. Processing your request.',
        },
      ],
    };

    // Simulate status progression with timeouts
    this.simulateOrderProgress(order.id);

    orders.push(order);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    return order;
  },

  getOrder(orderId: string): Order | undefined {
    return this.getOrders().find((o) => o.id === orderId);
  },

  updateOrderStatus(orderId: string, status: OrderStatus, message: string): void {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === orderId);

    if (order) {
      order.status = status;
      order.statusHistory.push({
        status,
        timestamp: new Date(),
        message,
      });

      // Update location based on status
      const locations: Record<OrderStatus, { lat: number; lng: number; address: string }> = {
        pending: { lat: 6.5244, lng: 3.3792, address: 'Lagos Warehouse' },
        processing: { lat: 6.5244, lng: 3.3792, address: 'Processing Center, Lagos' },
        shipped: { lat: 6.4549, lng: 3.3947, address: 'In Transit - Lagos to Abuja' },
        out_for_delivery: { lat: 9.0765, lng: 7.3986, address: 'Out for Delivery - Your Area' },
        delivered: { lat: 9.0765, lng: 7.3986, address: 'Delivered' },
        cancelled: { lat: 6.5244, lng: 3.3792, address: 'Cancelled' },
      };

      order.currentLocation = locations[status];
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    }
  },

  cancelOrder(orderId: string): void {
    this.updateOrderStatus(orderId, 'cancelled', 'Order cancelled by user.');
  },

  private simulateOrderProgress(orderId: string): void {
    // Simulate automatic order status updates
    const statuses: OrderStatus[] = ['processing', 'shipped', 'out_for_delivery', 'delivered'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < statuses.length) {
        const status = statuses[currentIndex];
        const messages: Record<OrderStatus, string> = {
          processing: 'Your order is being prepared for shipment.',
          shipped: 'Your order has been shipped!',
          out_for_delivery: 'Your order is out for delivery today.',
          delivered: 'Your order has been delivered. Thank you!',
          pending: '',
          cancelled: '',
        };

        this.updateOrderStatus(orderId, status, messages[status]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 5000 + Math.random() * 5000); // Random interval between 5-10 seconds
  },

  clearOrders(): void {
    localStorage.removeItem(ORDERS_STORAGE_KEY);
  },
};
