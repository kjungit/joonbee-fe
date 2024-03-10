import { atom } from 'recoil';

export const selectInterviewState = atom({
  key: 'selectInterviewState',
  default: {
    interviewId: 0,
    categoryName: '',
    likeCount: 0,
    memberId: '',
    liked: false,
    nickname: '',
    questions: [{ questionId: 0, questionContent: '' }],
    thumbnail: '',
  },
});
