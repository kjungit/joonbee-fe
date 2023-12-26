import { DefaultValue, selector } from 'recoil';
import { myInterviewAtom } from './atom';

export const myInterviewEditSelector = selector({
  key: 'myInterviewEditSelector',
  get: ({ get }) => {
    return get(myInterviewAtom);
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) return;

    const myInterview = get(myInterviewAtom);

    const updatedInterview = myInterview.map(item => {
      const foundItem = newValue.find(newItem => newItem.questionId === item.questionId);
      if (foundItem) {
        return {
          ...item,
          answerContent: foundItem.answerContent,
        };
      }
      return item;
    });

    // 수정된 상태로 업데이트합니다.
    set(myInterviewAtom, updatedInterview);
  },
});
