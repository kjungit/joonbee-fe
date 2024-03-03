import { atom } from 'recoil';

export const interviewVideoUrlAtom = atom<string>({
  key: 'interviewVideoUrlAtom',
  default: '',
});
