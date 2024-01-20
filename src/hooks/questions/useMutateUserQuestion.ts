import { postUserQuestion } from '@/app/apis/services/question';
import { CategoryName, SubcategoryName } from '@/types/question';
import useSWRMutation from 'swr/mutation';
import useInfiniteUserQuestion from './useInfiniteUserQuestion';

export default function useMutateUserQuestion(
  category: CategoryName,
  subcategory: SubcategoryName,
  questionContent: string,
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { trigger, data } = useSWRMutation(
    '/api/cart/question/save',
    () => postUserQuestion(category, subcategory, questionContent),
    {
      onSuccess: () => {
        if (setIsOpen) setIsOpen(true);
      },
    },
  );

  return { trigger, data };
}
