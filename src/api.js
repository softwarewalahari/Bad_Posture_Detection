import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000', // Match your FastAPI backend port
});

export default instance;
// src/api.js
const API_URL = "http://localhost:8000/analyze";

export const uploadVideo = async (videoFile) => {
  const formData = new FormData();
  formData.append("file", videoFile);

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  return response.json();
};
