import { UserQuestionsResponseData, getUserQuestions } from '@/app/apis/services/cart';
import { selectedCategoryAtom, selectedSubcategoryAtom } from '@/recoil/selectedCategory/atom';
import { CategoryName, SubcategoryName } from '@/types/question';
import { useRecoilValue } from 'recoil';
import useSWRInfinite from 'swr/infinite';
import { useIntersectionObserver } from '../useInterSectionObserver';
import { useEffect, useState } from 'react';

export default function useInfiniteUserQuestion(
  category: CategoryName,
  subcategory: SubcategoryName,
) {
  const [newData, setNewData] = useState<UserQuestionsResponseData[]>([]);

  const getKey = (page: number, previousPageData: UserQuestionsResponseData[]) => {
    // console.log('pp', page);
    // console.log('data', previousPageData);
    const newPage = page + 1;
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    const newCategory = category === 'All' ? '' : category;
    return `/api/cart/questions?page=${newPage}&category=${newCategory}&subcategory=${subcategory}`;
  };

  const { data, error, size, setSize, isValidating, isLoading } = useSWRInfinite<
    UserQuestionsResponseData[]
  >(getKey, url => getUserQuestions(url), { revalidateFirstPage: false });

  //   useEffect(() => {
  //     // 데이터를 통합
  //     if (data) {
  //       const allData = data.flatMap((pageData: UserQuestionsResponseData[]) => pageData);
  //       console.log(allData);
  //       setNewData(allData);
  //     }
  //   }, [data]);

  console.log('new', newData);

  const { setTarget } = useIntersectionObserver(setSize, true);

  return { newData, error, size, setSize, isValidating, setTarget };
}
