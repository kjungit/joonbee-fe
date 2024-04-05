import { deleteQuestion } from '@/apis/services/memberApis';
import { useMutation } from '@tanstack/react-query';
import { useGetMyQuestion } from './useGetMyQuestion';
import { useRecoilState } from 'recoil';
import { isDeleteQuestion } from '@/recoils/user/isDeleteQuestion/atom';

export const useDeleteQuestion = (id: number) => {
  const [isOpen, setIsOpen] = useRecoilState(isDeleteQuestion);

  const { refetch } = useGetMyQuestion();

  const { mutate: questionDeleteMutate } = useMutation({
    mutationKey: ['deleteQuestion', id],
    mutationFn: () => deleteQuestion(id),
    onSuccess: () => {
      refetch();
      setIsOpen(true);
    },
    onError: (error: number) => {
      if (error === 401) alert('로그인 후 이용해주세요.');
    },
  });

  return { questionDeleteMutate };
};
