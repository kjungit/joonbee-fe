import { atom } from 'recoil';

export const videoPermissionState = atom({
  key: 'videoPermission',
  default: true,
});
