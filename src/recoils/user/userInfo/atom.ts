import { atom } from 'recoil';

export const userInfoAtom = atom({
  key: 'userInfoAtom',
  default: {
    email: '',
    id: '',
    interviewCount: 0,
    nickName: '',
    questionCount: 0,
    thumbnail: '',
    categoryInfo: [
      {
        categoryName: '',
        categoryCount: 0,
      },
    ],
  },
  effects: [
    ({ setSelf, onSet }) => {
      const savedData = sessionStorage.getItem('userInfo');
      if (savedData) setSelf(JSON.parse(savedData));

      onSet((newValue, _, isReset) => {
        isReset
          ? sessionStorage.removeItem('userInfo')
          : sessionStorage.setItem('userInfo', JSON.stringify(newValue));
      });
    },
  ],
});
