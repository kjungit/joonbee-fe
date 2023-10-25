import { IconName } from '@/components/common/IconButton';

export const capitalizeFirstLetter = (text: IconName) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
