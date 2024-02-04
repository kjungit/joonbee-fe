import { getRefresh } from '@/app/apis/services/auth';
import { isRefreshStatus } from '@/recoil/isRefresh/atoms';
import { useRecoilState } from 'recoil';
import useSWRMutation from 'swr/mutation';

export default function useRefreshToken() {
  const [isRefresh, setIsRefresh] = useRecoilState(isRefreshStatus);

  const { trigger: refreshTrigger } = useSWRMutation('/auth/login/refresh', getRefresh, {
    onSuccess: () => {},
  });
  return { refreshTrigger };
}
