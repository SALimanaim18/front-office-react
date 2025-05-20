// src/services/api/userApi.js
import axiosInstance from '../axiosInstance';

export async function getUserProfile() {
  const response = await axiosInstance.get('/api/users/me');
  return response.data;
}

export async function updateUserProfile(updatedData) {
  const response = await axiosInstance.put('/api/users/me', updatedData);
  return response.data;
}

export async function changePassword(passwordData) {
  const response = await axiosInstance.put('/api/users/change-password', passwordData);
  return response.data;
}

export async function uploadUserPhoto(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post('/api/users/upload-photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

export async function getUserRequests() {
  const response = await axiosInstance.get('/api/demandes/user');
  return response.data;
}

export async function getAllCities() {
  const response = await axiosInstance.get('/api/cities');
  return response.data;
}