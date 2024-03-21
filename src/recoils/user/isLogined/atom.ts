import { atom } from 'recoil';

export const isLoginedAtom = atom({
  key: 'isLoginedAtom',
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
