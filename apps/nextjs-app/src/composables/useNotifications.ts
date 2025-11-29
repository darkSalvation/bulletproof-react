import { useNotificationsStore, type Notification } from '~/stores/notifications';

export function useNotifications() {
  const store = useNotificationsStore();

  return {
    notifications: store.notifications,
    addNotification: (notification: Omit<Notification, 'id'>) => {
      store.addNotification(notification);
    },
    dismissNotification: (id: string) => {
      store.dismissNotification(id);
    },
  };
}
