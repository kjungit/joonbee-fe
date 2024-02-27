import { atom } from 'recoil';

export const isNickNameStatus = atom({
  key: 'isNickNameStatus',
  default: {
    id: '',
    nickName: '',
    isNickStatus: false,
  },
});
