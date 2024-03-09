'use client';

import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getCookie = (key: string) => {
  return cookies.get(key);
};

export const setCookie = (key: string, value: any, options?: any) => {
  cookies.set(key, value, options);
};

export const removeCookie = (key: string) => {
  cookies.remove(key);
};
