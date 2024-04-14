import { getUserInfo, postInterviewLike } from '@/apis/services/memberApis';
import { useMutation } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { useGetInterview } from './useGetInterview';
import { selectInterviewCategoryState } from '@/recoils/home/interview/selectInterviewCategory/atom';
import { userInfoAtom } from '@/recoils/user/userInfo/atom';
import { isLoginedAtom } from '@/recoils/user/isLogined/atom';
import { isNotLogined } from '@/recoils/user/isNotLogined/atom';
import authApis from '@/apis/services/authApis';

export const usePostInterviewLike = (interviewId: number) => {
  const selectInterviewCategory = useRecoilValue(selectInterviewCategoryState);
  const resetUserInfo = useResetRecoilState(userInfoAtom);
  const [isLogined, setIsLogined] = useRecoilState(isLoginedAtom);
  const [isOpen, setIsOpen] = useRecoilState(isNotLogined);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  const { interviewRefetch } = useGetInterview({
    selectCategory: selectInterviewCategory.category,
    sort: selectInterviewCategory.sort,
  });
  const { mutate: interviewLikeMutate } = useMutation({
    mutationKey: ['postInterviewLike', interviewId],
    mutationFn: () => postInterviewLike(interviewId),
    onSuccess: () => {
      interviewRefetch();
    },
    onError: (error: number) => {
      if (error === 401) {
        authApis.getRefresh().then(() => {
          getUserInfo()
            .then(data => {
              setUserInfo(data);
            })
            .catch(() => {
              setIsOpen(true);
              resetUserInfo();
              setIsLogined(false);
            });
        });
      }
    },
  });

  return { interviewLikeMutate };
};
