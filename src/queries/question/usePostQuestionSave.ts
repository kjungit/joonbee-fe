import { SavaQuestionProps, postSaveQuestion } from '@/apis/services/questionApis';
import { isSaveQuestion } from '@/recoils/user/isSaveQuestion/atom';
import { useMutation } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';

export const usePostQuestionSave = ({ subcategoryName, questionContent }: SavaQuestionProps) => {
  const [isOpen, setIsOpen] = useRecoilState(isSaveQuestion);
  const { mutate: questionSaveMutate } = useMutation({
    mutationKey: ['postInterviewLike', subcategoryName, questionContent],
    mutationFn: () => postSaveQuestion({ subcategoryName, questionContent }),
    onSuccess: () => {
      setIsOpen(true);
    },
    onError: (error: number) => {
      if (error === 401) alert('로그인 후 이용해주세요.');
    },
  });

  return { questionSaveMutate };
};
