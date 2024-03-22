import { OpenAiContent } from '@/apis/services/openAiApis';
import { atom } from 'recoil';

export const myInterviewAtom = atom<OpenAiContent>({
  key: 'myInterviewAtom',
  default: {
    userName: '테스트',
    categoryName: 'fe',
    questions: [],
  },
});
