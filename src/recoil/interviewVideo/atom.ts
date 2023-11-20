import { atom, useRecoilState } from 'recoil';

export const interviewVideoAtom = atom<string[]>({
  key: 'interviewVideoAtom',
  default: [],
});
