import { QuestionCategory } from '@/types/question';

export const questionCategory: QuestionCategory[] = [
  { category: '', subcategory: [] },
  { category: 'fe', subcategory: ['react', 'vue', 'nextjs'] },
  { category: 'be', subcategory: ['db', 'spring_framework', 'msa'] },
  { category: 'language', subcategory: ['javascript', 'typescript'] },
  { category: 'cs', subcategory: ['docker', 'operatingSystem', 'computerArchitecture'] },
  { category: 'mobile', subcategory: ['aos', 'ios', 'flutter'] },
  { category: 'etc', subcategory: ['git'] },
];
export const MainCategory: {
  [key: string]: string;
} = {
  '': '카테고리',
  fe: '프론트엔드',
  be: '백엔드',
  language: '언어',
  mobile: '모바일',
  etc: '기타',
  cs: 'CS',
};

export const SubCategory: {
  [key: string]: string;
} = {
  web: '웹',
  network: '네트워크',
  react: '리액트',
  nextjs: 'NEXT.js',
  'html/css': 'HTML/CSS',
  vue: 'VUE',
  svelte: 'SVELTE',
  db: '데이터베이스',
  spring_framework: '스프링',
  nest: 'NEST',
  node: 'NODE',
  msa: 'MSA',
  rabbit_mq: 'RabbitMQ',
  redis: '레디스',
  java: 'JAVA',
  kotlin: '코틀린',
  typescript: '타입스크립트',
  javascript: '자바스크립트',
  delphi: '델파이',
  'cC++': 'C, C++',
  'c#': 'C#',
  golang: 'GO',
  swift: '스위프트',
  objective_c: '오브젝티브-C',
  aos: '안드로이드',
  ios: 'IOS',
  flutter: '플러터',
  react_native: '리엑트 네이티브',
  git: '깃',
  team: '팀 협업',
  project: '프로젝트',
  cs_network: 'CS 네트워크',
  datastructure_algorithm: '자료구조/알고리즘',
  operating_system: '운영 체제',
  virtual_machine: '가상 머신',
  docker: '도커',
  computer_architecture: '컴퓨터 구조',
};

export const Category: {
  [key: string]: string;
} = {
  '': '카테고리',
  fe: '프론트엔드',
  be: '백엔드',
  language: '언어',
  mobile: '모바일',
  etc: '기타',
  cs: 'CS',
  web: '웹',
  network: '네트워크',
  react: '리액트',
  nextjs: 'NEXT.js',
  'html/css': 'HTML/CSS',
  vue: 'VUE',
  svelte: 'SVELTE',
  db: '데이터베이스',
  spring_framework: '스프링',
  nest: 'NEST',
  node: 'NODE',
  msa: 'MSA',
  rabbit_mq: 'RabbitMQ',
  redis: '레디스',
  java: 'JAVA',
  kotlin: '코틀린',
  typescript: '타입스크립트',
  javascript: '자바스크립트',
  delphi: '델파이',
  'cC++': 'C, C++',
  'c#': 'C#',
  golang: 'GO',
  swift: '스위프트',
  objective_c: '오브젝티브-C',
  aos: '안드로이드',
  ios: 'IOS',
  flutter: '플러터',
  react_native: '리엑트 네이티브',
  git: '깃',
  team: '팀 협업',
  project: '프로젝트',
  cs_network: 'CS 네트워크',
  datastructure_algorithm: '자료구조/알고리즘',
  operating_system: '운영 체제',
  virtual_machine: '가상 머신',
  docker: '도커',
  computer_architecture: '컴퓨터 구조',
};
