import { CategoryName, SubcategoryName } from '@/types/question';
import useSWRInfinite from 'swr/infinite';
import { useIntersectionObserver } from '../useInterSectionObserver';
import { QuestionResponse, getUserQuestions } from '../../app/apis/services/question';

export default function useInfiniteUserQuestion(
  category: CategoryName,
  subcategory: SubcategoryName,
) {
  const getKey = (page: number, previousPageData: QuestionResponse[]) => {
    const newPage = page + 1;
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    const newSubcategory = subcategory === '세부 카테고리' ? '' : subcategory;
    return `/api/cart/questions?page=${newPage}&category=${category}&subcategory=${newSubcategory}`;
  };

  const { data, error, size, setSize, isValidating, mutate } = useSWRInfinite<QuestionResponse[]>(
    getKey,
    url => getUserQuestions(url),
    {
      revalidateFirstPage: false,
    },
  );

  const newData = data ? ([] as QuestionResponse[]).concat(...data) : [];

  const { setTarget } = useIntersectionObserver(setSize);
  return { newData, error, size, isValidating, setTarget, setSize, mutate };
}
