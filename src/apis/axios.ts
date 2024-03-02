import axios from 'axios';

export const instance = (withCredentials = true) => {
  const instance = axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials,
  });

  return instance;
};
