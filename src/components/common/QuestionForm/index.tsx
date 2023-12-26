'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import React, { useEffect, useState } from 'react';
import DropdownCategory from '../DropdownCategory';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedCategoryAtom, selectedSubcategoryAtom } from '@/recoil/selectedCategory/atom';
import { categoryNameSelector } from '@/recoil/interviewQuestion/withWriteQuestion';
import { myQuestionAddSelector } from '@/recoil/myQuestion/withAdd';
import useMutateUserQuestion from '@/hooks/questions/useMutateUserQuestion';

type QuestionForm = {
  type?: 'primary' | 'secondary';
};

const QuestionForm = ({ type = 'primary' }: QuestionForm) => {
  const selectedCategory = useRecoilValue(selectedCategoryAtom);
  const selectedSubcategory = useRecoilValue(selectedSubcategoryAtom);
  const [questionContent, setQuestionContent] = useState('');

  const { trigger: postUserQuestion } = useMutateUserQuestion(
    selectedCategory,
    selectedSubcategory,
    questionContent,
  );

  useEffect(() => {
    onDisableSubmitButton();
  }, [selectedCategory, questionContent, selectedSubcategory]);

  const onSubmitQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postUserQuestion();
  };

  const onDisableSubmitButton = () => {
    if (selectedCategory === 'All' || selectedSubcategory === '') {
      return true;
    }

    return !(selectedCategory && selectedSubcategory && questionContent);
  };

  const typeStyles = {
    primary: 'flex gap-5',
    secondary: 'flex-col space-y-2 ',
  };

  return (
    <form className={typeStyles[type]} onSubmit={onSubmitQuestion}>
      <DropdownCategory size="xs" />
      <div className="flex gap-5 ">
        <Input inputValue={questionContent} setInputValue={setQuestionContent} size="sm" />
        <Button
          type="submit"
          color="darkNavy"
          size="dropdown-xs"
          text="xs"
          disabled={onDisableSubmitButton()}>
          등록하기
        </Button>
      </div>
    </form>
  );
};

export default QuestionForm;
