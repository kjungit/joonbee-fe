import { IconName } from '@/components/@common/socialLoginButton';

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

export const convertSecondsToMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const renmaingSeconds = seconds % 60;
  return renmaingSeconds === 0 ? minutes + '분 ' : minutes + '분 ' + renmaingSeconds + '초';
};
