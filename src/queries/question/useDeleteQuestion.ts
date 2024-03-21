import { deleteQuestion } from '@/apis/services/memberApis';
import { useMutation } from '@tanstack/react-query';
import { useGetMyQuestion } from './useGetMyQuestion';

export const useDeleteQuestion = (id: number) => {
  const { refetch } = useGetMyQuestion();

  const { mutate: questionDeleteMutate } = useMutation({
    mutationKey: ['deleteQuestion', id],
    mutationFn: () => deleteQuestion(id),
    onSuccess: () => {
      refetch();
      alert('질문을 삭제했습니다.');
    },
    onError: (error: number) => {
      if (error === 401) alert('로그인 후 이용해주세요.');
    },
  });

  return { questionDeleteMutate };
};
