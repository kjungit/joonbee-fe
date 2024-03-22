// isAllowedVideoSelector.js
import { selector } from 'recoil';
import { selectedDeviceIdAtom } from './atom';

export const isAllowedVideoSelector = selector({
  key: 'isAllowedVideoSelector',
  get: ({ get }) => {
    const { videoId } = get(selectedDeviceIdAtom);
    return videoId && videoId !== '1';
  },
});
