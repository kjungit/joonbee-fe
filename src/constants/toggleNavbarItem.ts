import { ToggleInterviewProps, ToggleItemProps } from '@/types';

export const toggleNavbarIntreviewList: ToggleInterviewProps[] = [
  {
    id: 'fe',
    value: '프론트엔드',
  },
  {
    id: 'be',
    value: '백엔드',
  },
  {
    id: 'language',
    value: '언어',
  },
  {
    id: 'etc',
    value: '기타',
  },
];

export const toggleNavbarQuestionList: ToggleItemProps[] = [
  {
    id: 'fe',
    value: '프론트엔드',
    isOpen: true,
    children: [
      { id: 'react', value: '리액트' },
      { id: 'vuejs', value: 'VUE' },
      { id: 'nextjs', value: 'NEXT.js' },
    ],
  },
  {
    id: 'be',
    isOpen: false,
    value: '백엔드',
    children: [
      { id: 'nest', value: 'Nest' },
      { id: 'db', value: '데이터베이스' },
      { id: 'java', value: '자바' },
    ],
  },
  {
    id: 'language',
    isOpen: false,
    value: '언어',
    children: [
      { id: 'typescript', value: '타입스크립트' },
      { id: 'javascript', value: '자바스크립트' },
    ],
  },
  {
    id: 'etc',
    isOpen: false,
    value: '기타',
    children: [
      { id: 'network', value: '네트워크' },
      { id: 'docker', value: '도커' },
    ],
  },
];
