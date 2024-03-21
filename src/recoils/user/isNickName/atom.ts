import { atom } from 'recoil';

export const NickNameAtom = atom({
  key: 'NickNameAtom',
  default: {
    id: '',
    nickName: '',
  },
});
