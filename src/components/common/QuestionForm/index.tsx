'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import React, { useEffect, useState } from 'react';
import DropdownCategory from '../DropdownCategory';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedCategoryAtom, selectedSubcategoryAtom } from '@/recoil/selectedCategory/atom';
import { categoryNameSelector } from '@/recoil/interviewQuestion/withWriteQuestion';
import { myQuestionAddSelector } from '@/recoil/myQuestion/withAdd';

type QuestionForm = {
  type?: 'primary' | 'secondary';
};

const QuestionForm = ({ type = 'primary' }: QuestionForm) => {
  const [myQuestion, setMyQuestion] = useRecoilState(myQuestionAddSelector);
  const [categoryName, setCategoryName] = useRecoilState(categoryNameSelector);
  const selectedCategory = useRecoilValue(selectedCategoryAtom);
  const selectedSubcategory = useRecoilValue(selectedSubcategoryAtom);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    onDisableSubmitButton();
  }, [selectedCategory, question, selectedSubcategory]);

  const onSubmitQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCategoryName(selectedCategory);
    setMyQuestion([
      {
        questionId: myQuestion.length + 1,
        categoryName: selectedCategory,
        subcategoryName: selectedSubcategory,
        questionContent: question,
        isChecked: false,
      },
    ]);
    setQuestion('');
  };

  const onDisableSubmitButton = () => {
    if (selectedCategory === 'All' || selectedSubcategory === '') {
      return true;
    }

    return !(selectedCategory && selectedSubcategory && question);
  };

  const typeStyles = {
    primary: 'flex gap-5',
    secondary: 'flex-col space-y-2 ',
  };

  return (
    <form className={typeStyles[type]} onSubmit={onSubmitQuestion}>
      <DropdownCategory />
      <div className="flex gap-5 ">
        <Input inputValue={question} setInputValue={setQuestion} />
        <Button
          type="submit"
          color="darkNavy"
          size="md"
          text="md"
          disabled={onDisableSubmitButton()}>
          등록하기
        </Button>
      </div>
    </form>
  );
};

export default QuestionForm;
