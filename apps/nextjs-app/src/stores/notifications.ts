import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';

export type Notification = {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message?: string;
};

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [] as Notification[],
  }),
  actions: {
    addNotification(notification: Omit<Notification, 'id'>) {
      this.notifications.push({
        id: nanoid(),
        ...notification,
      });
    },
    dismissNotification(id: string) {
      this.notifications = this.notifications.filter(
        (notification) => notification.id !== id,
      );
    },
  },
});
