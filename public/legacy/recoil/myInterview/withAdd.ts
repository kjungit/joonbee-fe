import { DefaultValue, selector } from 'recoil';
import { MyInterview, myInterviewAtom } from './atom'; // Assuming MyInterview type is imported

export const myInterviewAddSelector = selector({
  key: 'MyInterviewAddSelector',
  get: ({ get }) => {
    return get(myInterviewAtom);
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) return;

    const prevInterview = get(myInterviewAtom);
    const updatedInterview = [...prevInterview, ...newValue];

    set(myInterviewAtom, updatedInterview);
  },
});
