import axios from 'axios';

export const instance = (withCredentials = false) => {
  const instance = axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials,
  });

  return instance;
};
