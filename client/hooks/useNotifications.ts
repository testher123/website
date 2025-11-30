import { useState, useEffect } from 'react';
import { notificationStore } from '@/store/notifications';
import { Notification } from '@/types';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(
    notificationStore.getNotifications()
  );
  const [unreadCount, setUnreadCount] = useState(notificationStore.getUnreadCount());

  useEffect(() => {
    const unsubscribe = notificationStore.subscribe(() => {
      setNotifications(notificationStore.getNotifications());
      setUnreadCount(notificationStore.getUnreadCount());
    });

    return unsubscribe;
  }, []);

  return {
    notifications,
    unreadCount,
    addNotification: notificationStore.addNotification.bind(notificationStore),
    markAsRead: notificationStore.markAsRead.bind(notificationStore),
    markAllAsRead: notificationStore.markAllAsRead.bind(notificationStore),
    deleteNotification: notificationStore.deleteNotification.bind(notificationStore),
    clearAll: notificationStore.clearAll.bind(notificationStore),
  };
}
