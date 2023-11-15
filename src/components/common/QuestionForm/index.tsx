'use client';

import { Button } from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';
import { Input } from '@/components/ui/Input';
import React, { useEffect, useState } from 'react';

type QuestionFormProps = {
  data: any;
};

const QuestionForm = ({ data }: QuestionFormProps) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [subcategoryName, setSubcateogyName] = useState([]);
  const [question, setQuestion] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const categoryNames = data.map((item: any) => item.category);

  useEffect(() => {
    setSubcateogyName(
      data.find((item: any) => item.category === selectedCategory)?.subcategory || [],
    );
  }, [selectedCategory]);

  useEffect(() => {
    onDisableSubmitButton();
  }, [selectedCategory, question, selectedSubcategory]);

  const onSubmitQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onDisableSubmitButton = () => {
    Boolean(selectedCategory && selectedSubcategory && question)
      ? setIsDisabled(false)
      : setIsDisabled(true);
  };

  return (
    <form className="flex gap-5 w-auto" onSubmit={onSubmitQuestion}>
      <Dropdown data={categoryNames} onSelect={setSelectedCategory} color="white" />
      <Dropdown
        data={subcategoryName}
        onSelect={setSelectedSubcategory}
        title="세부 카테고리"
        color="white"
      />
      <Input inputValue={question} setInputValue={setQuestion} />
      <Button type="submit" color="darkNavy" size="md" text="md" disabled={isDisabled}>
        등록하기
      </Button>
    </form>
  );
};

export default QuestionForm;
