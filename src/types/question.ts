export type CategoryName =
  | ''
  | 'fe'
  | 'be'
  | 'language'
  | 'cs'
  | 'mobile'
  | 'etc'
  | '세부 카테고리';
export type SubcategoryName =
  | '세부 카테고리'
  | 'web'
  | 'network'
  | 'react'
  | 'html/css'
  | 'nextjs'
  | 'vuejs'
  | 'svelte'
  | 'db'
  | 'spring_framework'
  | 'nestjs'
  | 'nodejs'
  | 'msa'
  | 'rebbitmq'
  | 'redis'
  | 'java'
  | 'kotlin'
  | 'typescript'
  | 'javascript'
  | 'delphi'
  | 'c_c++'
  | 'c#'
  | 'golang'
  | 'swift'
  | 'objective-c'
  | 'aos'
  | 'ios'
  | 'flutter'
  | 'react_native'
  | 'git'
  | 'team'
  | 'project'
  | 'datastructure_algorithm'
  | 'operatingSystem'
  | 'virtual_machine'
  | 'docker'
  | 'computer_architecture';

export type QuestionCategory = {
  category: CategoryName;
  subcategory: SubcategoryName[];
};

export type QustionItem = {
  questionId: number;
  categoryId: number;
  categoryName: CategoryName;
  questionContent: string;
  subcategoryName: SubcategoryName;
};

export type QuestionType = {
  result: QustionItem[];
  total: number;
};
