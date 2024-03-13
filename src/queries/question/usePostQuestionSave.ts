import { SavaQuestionProps, postSaveQuestion } from '@/apis/services/questionApis';
import { useMutation } from '@tanstack/react-query';

export const usePostQuestionSave = ({ subcategoryName, questionContent }: SavaQuestionProps) => {
  const { mutate: questionSaveMutate } = useMutation({
    mutationKey: ['postInterviewLike', subcategoryName, questionContent],
    mutationFn: () => postSaveQuestion({ subcategoryName, questionContent }),
    onSuccess: () => {
      alert('질문을 저장했습니다.');
    },
    onError: (error: number) => {
      if (error === 401) alert('로그인 후 이용해주세요.');
    },
  });

  return { questionSaveMutate };
};
