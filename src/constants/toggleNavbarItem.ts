import { ToggleInterviewProps, ToggleItemProps } from '@/types';
export const useCategoryImageList = [
  'react',
  'vuejs',
  'nodejs',
  'nestjs',
  'html:css',
  'svelte',
  'nextjs',
  'redis',
  'rebbitmq',
  'java',
  'kotlin',
  'javascript',
  'typescript',
  'c_c++',
  'cHash',
  'golang',
  'swift',
  'react_native',
  'flutter',
  'ios',
  'aos',
  'git',
  'docker',
];
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
    id: 'mobile',
    value: '모바일',
  },
  {
    id: 'etc',
    value: '기타',
  },
  {
    id: 'cs',
    value: 'CS',
  },
];

export const toggleNavbarQuestionList: ToggleItemProps[] = [
  {
    id: 'fe',
    value: '프론트엔드',
    isOpen: true,
    children: [
      { id: 'react', value: '리액트' },
      { id: 'vuejs', value: '뷰' },
      { id: 'web', value: '웹 관련' },
      { id: 'html:css', value: 'HTML/CSS' },
      { id: 'nextjs', value: '넥스트' },
      { id: 'svelte', value: '스벨트' },
    ],
  },
  {
    id: 'be',
    isOpen: false,
    value: '백엔드',
    children: [
      { id: 'db', value: '데이터베이스' },
      { id: 'nestjs', value: 'NESTJS' },
      { id: 'nodejs', value: 'NODEJS' },
      { id: 'msa', value: 'MSA' },
      { id: 'rebbitmq', value: '래빗MQ' },
      { id: 'redis', value: '레디스' },
    ],
  },
  {
    id: 'language',
    isOpen: false,
    value: '언어',
    children: [
      { id: 'java', value: '자바' },
      { id: 'kotlin', value: '코틀린' },
      { id: 'javascript', value: '자바스크립트' },
      { id: 'typescript', value: '타입스크립트' },
      { id: 'delphi', value: '델파이' },
      { id: 'c_c++', value: 'C, C++' },
      { id: 'cHash', value: 'C#' },
      { id: 'golang', value: 'GO' },
      { id: 'swift', value: '스위프트' },
      { id: 'objective-c', value: '오브젝티브-C' },
    ],
  },
  {
    id: 'mobile',
    isOpen: false,
    value: '모바일',
    children: [
      { id: 'react_native', value: '리액트 네이티브' },
      { id: 'flutter', value: '플러터' },
      { id: 'ios', value: 'iOS' },
      { id: 'aos', value: '안드로이드 스튜디오' },
    ],
  },
  {
    id: 'etc',
    isOpen: false,
    value: '기타',
    children: [
      { id: 'git', value: '깃' },
      { id: 'team', value: '팀 협업' },
      { id: 'project', value: '프로젝트' },
    ],
  },
  {
    id: 'cs',
    isOpen: false,
    value: 'CS',
    children: [
      { id: 'datastructure_algorithm', value: '데이터 구조 알고리즘' },
      { id: 'docker', value: '도커' },
      { id: 'virtual_machine', value: '가상 머신' },
      { id: 'network', value: '네트워크' },
      { id: 'computer_architecture', value: '컴퓨터 알고리즘' },
    ],
  },
];
