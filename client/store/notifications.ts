import { Notification, NotificationType } from '@/types';

const NOTIFICATIONS_STORAGE_KEY = 'lighthub_notifications';

let listeners: (() => void)[] = [];

export const notificationStore = {
  getNotifications(): Notification[] {
    try {
      const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (!stored) return [];
      return JSON.parse(stored).map((notif: any) => ({
        ...notif,
        timestamp: new Date(notif.timestamp),
      }));
    } catch {
      return [];
    }
  },

  addNotification(
    type: NotificationType,
    title: string,
    message: string,
    orderId?: string
  ): Notification {
    const notifications = this.getNotifications();
    const notification: Notification = {
      id: `notif-${Date.now()}`,
      type,
      title,
      message,
      timestamp: new Date(),
      read: false,
      orderId,
    };

    notifications.unshift(notification);
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
    this.notify();

    // Auto-dismiss after 7 seconds for non-critical notifications
    if (type !== 'error' && type !== 'warning') {
      setTimeout(() => {
        // Keep notification but it can be dismissed by user
      }, 7000);
    }

    return notification;
  },

  markAsRead(notificationId: string): void {
    const notifications = this.getNotifications();
    const notif = notifications.find((n) => n.id === notificationId);
    if (notif) {
      notif.read = true;
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
      this.notify();
    }
  },

  markAllAsRead(): void {
    const notifications = this.getNotifications();
    notifications.forEach((n) => (n.read = true));
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
    this.notify();
  },

  deleteNotification(notificationId: string): void {
    const notifications = this.getNotifications().filter((n) => n.id !== notificationId);
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
    this.notify();
  },

  clearAll(): void {
    localStorage.removeItem(NOTIFICATIONS_STORAGE_KEY);
    this.notify();
  },

  getUnreadCount(): number {
    return this.getNotifications().filter((n) => !n.read).length;
  },

  subscribe(listener: () => void) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },

  notify() {
    listeners.forEach((listener) => listener());
  },
};
