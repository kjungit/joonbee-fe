'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import React, { useEffect, useState } from 'react';
import DropdownCategory from '../DropdownCategory';
import { useRecoilValue } from 'recoil';
import { selectedCategoryState, selectedSubcategoryState } from '@/recoil/select/atom';

type QuestionForm = {
  type?: 'primary' | 'secondary';
};

const QuestionForm = ({ type = 'primary' }: QuestionForm) => {
  const selectedCategory = useRecoilValue(selectedCategoryState);
  const selectedSubcategory = useRecoilValue(selectedSubcategoryState);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    onDisableSubmitButton();
  }, [selectedCategory, question, selectedSubcategory]);

  const onSubmitQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onDisableSubmitButton = () => {
    return !(selectedCategory && selectedSubcategory && question);
  };

  const typeStyles = {
    primary: 'flex gap-5',
    secondary: 'flex-col space-y-2 ',
  };

  return (
    <form className={typeStyles[type]} onSubmit={onSubmitQuestion}>
      <DropdownCategory />
      <div className="flex gap-5">
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
