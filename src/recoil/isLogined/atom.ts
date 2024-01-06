'use client';
import { atom } from 'recoil';

export const isLoginedStatus = atom({
  key: 'isLoginedStatus',
  default: false,
});
