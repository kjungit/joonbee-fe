'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import React, { useEffect, useState } from 'react';
import DropdownCategory from '../DropdownCategory';
import { useRecoilState } from 'recoil';
import {
  selectedSubmitCategoryAtom,
  selectedSubmitSubcategoryAtom,
} from '@/recoil/selectedCategory/atom';
import useMutateUserQuestion from '@/hooks/questions/useMutateUserQuestion';

type QuestionForm = {
  type?: 'primary' | 'secondary';
  callback: () => void;
};

const QuestionForm = ({ type = 'primary', callback }: QuestionForm) => {
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedSubmitCategoryAtom);
  const [selectedSubcategory, setSelectedSubcategory] = useRecoilState(
    selectedSubmitSubcategoryAtom,
  );

  const [questionContent, setQuestionContent] = useState('');

  const { trigger: postUserQuestion } = useMutateUserQuestion(
    selectedCategory,
    selectedSubcategory,
    questionContent,
  );

  useEffect(() => {
    onDisableSubmitButton();
  }, [selectedCategory, questionContent, selectedSubcategory]);

  const onSubmitQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postUserQuestion();
    callback();
  };

  const onDisableSubmitButton = () => {
    if (selectedCategory === '' || selectedSubcategory === '세부 카테고리') {
      return true;
    }

    return !(selectedCategory && selectedSubcategory && questionContent);
  };

  const typeStyles = {
    primary: 'flex gap-5 flex-col md:flex-row',
    secondary: 'flex-col space-y-2 ',
  };

  return (
    <form className={typeStyles[type]} onSubmit={onSubmitQuestion}>
      <DropdownCategory
        size="sm"
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        setSelectedCategory={setSelectedCategory}
        setSelectedSubcategory={setSelectedSubcategory}
      />
      <div className="flex gap-5 w-full">
        <Input inputValue={questionContent} setInputValue={setQuestionContent} size="sm" />
        <Button
          type="submit"
          color="darkNavy"
          size="dropdown-sm"
          text="sm"
          disabled={onDisableSubmitButton()}>
          등록하기
        </Button>
      </div>
    </form>
  );
};

export default QuestionForm;
