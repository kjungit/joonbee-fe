import { atom } from 'recoil';

export const interviewTimeAtom = atom<number>({
  key: 'interviewTimeAtom',
  default: 60,
});

export const questionCountAtom = atom<number>({
  key: 'questionCountAtom',
  default: 10,
});
