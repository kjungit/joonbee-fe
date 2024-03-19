import authApis from '@/apis/services/authApis';
import { userInfoState } from '@/recoils/user/userInfo/atom';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';

export const useLogout = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const router = useRouter();

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authApis.getLogout(),
    onSuccess: () => {
      setUserInfo({
        email: '',
        id: '',
        interviewCount: 0,
        nickName: '',
        questionCount: 0,
        thumbnail: '',
        categoryInfo: [
          {
            categoryName: '',
            categoryCount: 0,
          },
        ],
      });
      router.push('/');
    },
  });

  return { logoutMutate };
};
