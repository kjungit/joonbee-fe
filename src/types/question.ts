export type CategoryName = '' | 'All' | 'fe' | 'be' | 'cs' | 'mobile' | 'ect' | 'language';
export type SubcategoryName =
  | ''
  | 'fe'
  | 'be'
  | 'language'
  | 'mobile'
  | 'etc'
  | 'cs'
  | 'web'
  | 'network'
  | 'react'
  | 'html/css'
  | 'nextjs'
  | 'vue'
  | 'svelte'
  | 'db'
  | 'spring'
  | 'nest'
  | 'node'
  | 'msa'
  | 'rabbitmq'
  | 'redis'
  | 'java'
  | 'kotlin'
  | 'typescript'
  | 'javascript'
  | 'delphi'
  | 'cC++'
  | 'c#'
  | 'golang'
  | 'swift'
  | 'objective-c'
  | 'aos'
  | 'ios'
  | 'flutter'
  | 'reactNative'
  | 'git'
  | 'team'
  | 'project'
  | 'datastructureAlgorithms'
  | 'operatingSystem'
  | 'virtualMachine'
  | 'docker'
  | 'computerArchitecture';

export type QuestionCategory = {
  category: CategoryName;
  subcategory: SubcategoryName[];
};

export type AllCategory = {
  category: CategoryName;
  subcategory: SubcategoryName;
};
