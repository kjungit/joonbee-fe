import { deleteQuestion } from '@/apis/services/memberApis';
import { useMutation } from '@tanstack/react-query';
import { useGetMyQuestion } from './useGetMyQuestion';
import { useRecoilState } from 'recoil';
import { isDeleteQuestion } from '@/recoils/user/isDeleteQuestion/atom';
import { isNotLogined } from '@/recoils/user/isNotLogined/atom';

export const useDeleteQuestion = (id: number) => {
  const [isOpen, setIsOpen] = useRecoilState(isDeleteQuestion);
  const [isNotLoginedOpen, setIsNotLoginedOpen] = useRecoilState(isNotLogined);

  const { refetch } = useGetMyQuestion();

  const { mutate: questionDeleteMutate } = useMutation({
    mutationKey: ['deleteQuestion', id],
    mutationFn: () => deleteQuestion(id),
    onSuccess: () => {
      refetch();
      setIsOpen(true);
    },
  });

  return { questionDeleteMutate };
};
