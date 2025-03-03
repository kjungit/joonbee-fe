import authApis from '@/apis/services/authApis';
import { getUserInfo } from '@/apis/services/memberApis';
import { SavaQuestionProps, postSaveQuestion } from '@/apis/services/questionApis';
import { isNotLogined } from '@/recoils/user/isNotLogined/atom';
import { isSaveQuestion } from '@/recoils/user/isSaveQuestion/atom';
import { userInfoAtom } from '@/recoils/user/userInfo/atom';
import { useMutation } from '@tanstack/react-query';
import { useRecoilState, useResetRecoilState } from 'recoil';

export const usePostQuestionSave = ({ subcategoryName, questionContent }: SavaQuestionProps) => {
  const [isOpen, setIsOpen] = useRecoilState(isSaveQuestion);
  const [isNotLoginedOpen, setIsNotLoginedOpen] = useRecoilState(isNotLogined);

  const { mutate: questionSaveMutate } = useMutation({
    mutationKey: ['postInterviewLike', subcategoryName, questionContent],
    mutationFn: () => postSaveQuestion({ subcategoryName, questionContent }),
    onSuccess: () => {
      setIsOpen(true);
    },
    onError: (error: number) => {
      if (error === 401) {
        setIsNotLoginedOpen(true);
      }
    },
  });

  return { questionSaveMutate };
};
