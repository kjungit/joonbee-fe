import { postUserQuestion } from '@/app/apis/services/question';
import { CategoryName, SubcategoryName } from '@/types/question';
import React from 'react';
import { useRecoilValue } from 'recoil';
import useSWRMutation from 'swr/mutation';

export default function useMutateUserQuestion(
  category: CategoryName,
  subcategory: SubcategoryName,
  questionContent: string,
) {
  const { trigger, data } = useSWRMutation('/api/cart/question/save', () =>
    postUserQuestion( category, subcategory, questionContent ),
  );

  return { trigger, data };
}
