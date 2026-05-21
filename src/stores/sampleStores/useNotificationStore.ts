import { create } from "zustand";

type Notification = { id: string; message: string };

type NotificationState = {
  notifications: Notification[];
  push: (notification: Notification) => void;
  dismiss: (id: string) => void;
};

export const useNotificationStore = create<NotificationState>()((set) => ({
  notifications: [],
  push: (notification) => set((state) => ({ notifications: [...state.notifications, notification] })),
  dismiss: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id)
    }))
}));
