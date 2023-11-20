import { atom } from 'recoil';

export const interviewTimeAtom = atom<number>({
  key: 'interviewTimeAtom',
  default: 60,
});
