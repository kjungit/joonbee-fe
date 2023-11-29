'use client';

import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getCookie = (key: string) => {
  return cookies.get(key);
};

export const setCookie = () => {};
