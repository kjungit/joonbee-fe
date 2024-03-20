import { OpenAiContent } from '@/apis/services/openAiApis';
import { atom } from 'recoil';

export const myInterviewState = atom<OpenAiContent>({
  key: 'myInterviewState',
  default: {
    userName: '테스트',
    categoryName: 'fe',
    questions: [],
  },
});
