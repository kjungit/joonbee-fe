import { IconName } from '@/components/common/SocialLoginButton';

export const capitalizeFirstLetter = (text: IconName) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const maskNickname = (nickname: any) => {
  if (nickname.length <= 3) {
    return nickname;
  }

  const visibleText = nickname.substring(0, 3);
  const maskedText = '*****';
  return visibleText + maskedText;
};
