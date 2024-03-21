import { CategoryName, InterviewType, SubcategoryName } from '@/types';
import { atom } from 'recoil';

export const selectedSubcategoryListAtom = atom<SubcategoryName[]>({
  key: 'selectedSubcategoryListAtom',
  default: [],
});

export const interviewChoiceCategoryAtom = atom({
  key: 'InterviewCategoryAtom',
  default: 'fe',
});

export const interviewRandomCategoryAtom = atom({
  key: 'InterviewRandomCategoryAtom',
  default: 'fe',
});

export const interviewRandomSubcategoryAtom = atom({
  key: 'InterviewRandomSubcategoryAtom',
  default: 'react',
});

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

export const videoPermissionAtom = atom({
  key: 'videoPermissionAtom',
  default: false,
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
