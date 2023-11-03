import React, { useState } from 'react';
import Dropdown from '../Dropdown';
import { Input } from '../Input';
import { Button } from '../Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedValueState } from '../../../recoil/select/atom';

const QuestionForm = () => {
  const [question, setQuestion] = useState('');
  const { selectedCategory, selectedSubcategory } = useRecoilValue(selectedValueState);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO : 질문 추가 API 요청
    //console.log(selectedCategory, selectedSubcategory, question);
  };

  return (
    <form className="flex gap-5 w-auto" onSubmit={onSubmit}>
      <Dropdown />
      <Input inputValue={question} setInputValue={setQuestion} />
      <Button type="submit" color="darkNavy" size="md" text="md">
        등록하기
      </Button>
    </form>
  );
};

export default QuestionForm;
