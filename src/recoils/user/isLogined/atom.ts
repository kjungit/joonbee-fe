'use client';
import { atom } from 'recoil';

export const isLoginedAtom = atom({
  key: 'isLoginedAtom',
  default: false,
  effects: [
    ({ setSelf, onSet }) => {
      const savedData = typeof window !== 'undefined' ? sessionStorage.getItem('isLogin') : null;
      if (savedData) setSelf(JSON.parse(savedData));

      onSet((newValue, _, isReset) => {
        isReset
          ? sessionStorage.removeItem('isLogin')
          : sessionStorage.setItem('isLogin', JSON.stringify(newValue));
      });
    },
  ],
});
