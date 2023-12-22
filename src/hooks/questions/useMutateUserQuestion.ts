import { ResponseData, postUserQuestion } from '@/app/apis/services/cart';
import { selectedCategoryAtom, selectedSubcategoryAtom } from '@/recoil/selectedCategory/atom';
import React from 'react';
import { useRecoilValue } from 'recoil';
import useSWRMutation from 'swr/mutation';

export default function useMutateUserQuestion(category, subcategory, questionContent) {
  const { trigger, data } = useSWRMutation('/api/cart/question/save', () =>
    postUserQuestion({ category, subcategory, questionContent }),
  );

  return { trigger, data };
}
