import { VariableIcon } from '@/components/@common/variableIcon';
import { usePostChoiceQuestionSave } from '@/queries/question/usePostChoiceQuestionSave';
import { usePostQuestionSave } from '@/queries/question/usePostQuestionSave';
import { mySelectQuestionCategoryState } from '@/recoils/home/question/mySelectQuestionCategory/atom';
import { SubcategoryName } from '@/types';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function QuestionCreateForm() {
  const [value, setValue] = useState<string>('');
  const category = useRecoilValue(mySelectQuestionCategoryState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const { questionSaveMutate } = usePostChoiceQuestionSave({
    subcategoryName: category.subCategory as SubcategoryName,
    questionContent: value,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    questionSaveMutate();
  };
  return (
    <form onSubmit={handleSubmit} className="border border-gray-light rounded-md w-[500px] p-3">
      <label htmlFor="question" className="flex justify-center items-center">
        <input
          id="question"
          placeholder="면접을 진행할 질문을 입력하세요!"
          className="w-full"
          value={value}
          onChange={onChange}
        />
        <button type="submit">
          <VariableIcon name="send" size={18} className="text-grayl-light" />
        </button>
      </label>
    </form>
  );
}
