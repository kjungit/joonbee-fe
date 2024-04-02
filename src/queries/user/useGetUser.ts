import { getUserInfo } from '@/apis/services/memberApis';
import { useQuery } from '@tanstack/react-query';

const useGetInfo = () => {
  return useQuery({
    queryKey: ['useGetInfo'],
    queryFn: () => getUserInfo(),
  });
};

const userQueries = {
  useGetInfo,
};

export default userQueries;
