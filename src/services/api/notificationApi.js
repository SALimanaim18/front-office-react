import axiosInstance from "../axiosInstance";

export async function getNotificationsByUser(userId) {
  const response = await axiosInstance.get(`/api/notifications/user/${userId}`);
  return response.data;
}

export async function getUnseenNotifications(userId) {
  const response = await axiosInstance.get(`/api/notifications/user/${userId}/unseen`);
  return response.data;
}

export async function countUnseenNotifications(userId) {
  const response = await axiosInstance.get(`/api/notifications/user/${userId}/count-unseen`);
  return response.data.unseenCount;
}

export async function markNotificationAsSeen(notificationId) {
  const response = await axiosInstance.patch(`/api/notifications/${notificationId}/mark-seen`);
  return response.data;
}

export async function markAllNotificationsAsSeen(userId) {
  await axiosInstance.patch(`/api/notifications/user/${userId}/mark-all-seen`);
}
