import { IconName } from '@/components/ui/Icon';

export const capitalizeFirstLetter = (text: IconName) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const maskNickname = (nickname: string) => {
  if (nickname.length <= 3) {
    return nickname;
  }
  const visibleText = nickname.substring(0, 3);
  const maskedText = new Array(nickname.length - 3).fill('*');
  return visibleText + maskedText.join('');
};
