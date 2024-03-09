import { IconName, IconType, VariableIconName } from '@/types';

export const VariableIconList: VariableIconName[] = [
  'emptyLike',
  'copy',
  'filledLike',
  'alarm',
  'close',
  'delete',
  'edit',
  'leftArrow',
  'send',
  'group',
  'fillCheckCir',
  'fillCheckRec',
  'checkRec',
];

export const IconList: IconName[] = [
  'kakao.png',
  'naver.png',
  'google.png',
  'meeting.png',
  'service.png',
  'check.png',
  'random.png',
  'blank.png',
  'ai_white.png',
  'checklist.png',
  'questions.svg',
  'next_arrow.png',
];

export const AllIconList: IconType[] = [...VariableIconList, ...IconList];
