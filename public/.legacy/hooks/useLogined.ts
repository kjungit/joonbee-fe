import { getUserInfo } from '../app/apis/services/member';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export const useMe = () => {
  const { data: userInfo } = useSWR('/auth/member/info', getUserInfo, {});

  return { userInfo };
};
