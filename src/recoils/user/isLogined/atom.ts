import { atom } from 'recoil';

export const isLoginedStatus = atom({
  key: 'isLoginedStatus',
  default: false,
  effects: [
    ({ setSelf, onSet }) => {
      const savedData = sessionStorage.getItem('isLogin');
      if (savedData) setSelf(JSON.parse(savedData));

      onSet((newValue, _, isReset) => {
        isReset
          ? sessionStorage.removeItem('isLogin')
          : sessionStorage.setItem('isLogin', JSON.stringify(newValue));
      });
    },
  ],
});
