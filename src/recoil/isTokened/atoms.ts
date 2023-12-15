import { atom } from 'recoil';

export const isTokenedState = atom({
  key: 'isTokenedState',
  default: {
    id: '',
    isLogined: false,
  },
});
