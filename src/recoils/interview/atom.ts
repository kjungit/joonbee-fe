import { CategoryName, InterviewType, SubcategoryName } from '@/types';
import { atom } from 'recoil';

export const interviewQuestionCountAtom = atom<number>({
  key: 'interviewQuestionCountAtom',
  default: 2,
});
export const interviewTimeAtom = atom<number>({
  key: 'interviewTimeAtom',
  default: 60,
});

export const interviewVideoUrlAtom = atom<string>({
  key: 'interviewVideoUrlAtom',
  default: '',
});

export const interviewTypeAtom = atom<InterviewType>({
  key: 'interviewTypeAtom',
  default: 'random',
});

export const selectedDeviceIdAtom = atom<{
  videoId: string;
  audioId: string;
}>({
  key: 'selectedDeviceIdAtom',
  default: { videoId: '', audioId: '' },
});

export const currentCountAtom = atom({
  key: 'currentCountAtom',
  default: 1, // 초기값
});
