import { postInterviewLike } from '@/apis/services/memberApis';
import { useMutation } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { useGetInterview } from './useGetInterview';
import { selectInterviewCategoryState } from '@/recoils/home/interview/selectInterviewCategory/atom';
import { userInfoAtom } from '@/recoils/user/userInfo/atom';
import { isLoginedAtom } from '@/recoils/user/isLogined/atom';
import { isNotLogined } from '@/recoils/user/isNotLogined/atom';

export const usePostInterviewLike = (interviewId: number) => {
  const selectInterviewCategory = useRecoilValue(selectInterviewCategoryState);
  const resetUserInfo = useResetRecoilState(userInfoAtom);
  const [isLogined, setIsLogined] = useRecoilState(isLoginedAtom);
  const [isOpen, setIsOpen] = useRecoilState(isNotLogined);

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
        // alert('로그인 후 이용해주세요.');
        setIsOpen(true);
        resetUserInfo();
        setIsLogined(false);
      }
    },
  });

  return { interviewLikeMutate };
};
