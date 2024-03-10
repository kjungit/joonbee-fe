import { atom } from 'recoil';

export const selectMenuState = atom({
  key: 'selectMenuState',
  default: 'interview',
});
