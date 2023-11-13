import { atom, useRecoilState } from 'recoil';

export const questionVideoState = atom<string[]>({
  key: 'questionVideoState',
  default: [],
});
