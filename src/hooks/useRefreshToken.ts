import { getLogout, getRefresh } from '@/app/apis/services/auth';
import useSWRMutation from 'swr/mutation';

export default function useRefreshToken() {
  const { trigger: logoutTrigger } = useSWRMutation('/logout', getLogout);

  const { trigger: refreshTrigger } = useSWRMutation('/auth/login/refresh', getRefresh, {
    onError: () => {
      logoutTrigger();
    },
  });
  return { refreshTrigger };
}
