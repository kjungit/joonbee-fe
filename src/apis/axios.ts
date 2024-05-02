import axios from 'axios';

export const instance = (withCredentials = true) => {
  const instance = axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
      'x-restrict-key': process.env.NEXT_PUBLIC_RESTRICT_KEY,
    },
    withCredentials,
  });

  return instance;
};
