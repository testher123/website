export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';
export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  estimatedDelivery: Date;
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  shippingMethod: 'standard' | 'express' | 'overnight';
  trackingNumber: string;
  statusHistory: {
    status: OrderStatus;
    timestamp: Date;
    message: string;
  }[];
  currentLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  discount?: {
    code: string;
    discountType: 'percentage' | 'fixed';
    discountAmount: number;
  };
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  orderId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}
