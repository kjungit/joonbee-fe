import { deleteQuestion } from '../../../app/apis/services/member';
import { LineQuestrionCard } from '../../common/LineQuestionCard';
import { Button } from '../../ui/Button';
import Dropdown from '../../ui/Dropdown';
import { Input } from '../../ui/Input';
import { VariableIcon } from '../../ui/VariableIcon';
import { questionCategory } from '../../../constants/category';
import useInfiniteUserQuestion from '../../../hooks/questions/useInfiniteUserQuestion';
import useMutateUserQuestion from '../../../hooks/questions/useMutateUserQuestion';
import { CategoryName, SubcategoryName } from '@/types/question';
import React, { useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';

export default function QuestionComponent() {
  const [selectPage, setSelectPage] = useState(0);
  const [mainSelectCategory, setMainSelectCategory] = useState<CategoryName>('');
  const [subSelectCategory, setSubSelectCategory] = useState<SubcategoryName>('세부 카테고리');
  const [subCategoryNames, setSubCategoryNames] = useState<SubcategoryName[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [question, setQuestion] = useState('');
  const categoryNames = questionCategory.map(item => item.category);

  const {
    newData: myQuestions,
    setTarget,
    mutate,
  } = useInfiniteUserQuestion(mainSelectCategory, subSelectCategory);

  const { trigger: postUserQuestion } = useMutateUserQuestion(subSelectCategory, question);

  const { trigger: deleteTrigger } = useSWRMutation('api/member/cart/delete', deleteQuestion, {
    onSuccess: () => {
      mutate();
    },
  });

  const onDisableSubmitButton = () => {
    if (mainSelectCategory === '' || subSelectCategory === '세부 카테고리') {
      return true;
    }

    return !(mainSelectCategory && subSelectCategory && question);
  };
  const onSubmitQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postUserQuestion();
    mutate();
  };
  useEffect(() => {
    setSubSelectCategory('세부 카테고리');
    if (mainSelectCategory === '') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }

    setSubCategoryNames(
      questionCategory.find(item => item.category === mainSelectCategory)?.subcategory || [],
    );
    setSelectPage(0);
  }, [mainSelectCategory]);
  return (
    <>
      <div className="flex gap-6 flex-col">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Dropdown
                data={categoryNames}
                selected={mainSelectCategory}
                onSelect={setMainSelectCategory}
                color="white"
              />
              <Dropdown
                data={subCategoryNames}
                selected={
                  subSelectCategory === '세부 카테고리' ? '세부 카테고리' : subSelectCategory
                }
                onSelect={setSubSelectCategory}
                title="세부 카테고리"
                isDisabled={isDisabled}
              />
            </div>
            <p className="items-end flex justify-end text-sm text-status-alert font-bold">
              카테고리를 선택하고 질문을 등록해주세요.
            </p>
          </div>
          <form onSubmit={onSubmitQuestion} className="flex gap-4 w-full">
            <Input size="sm" inputValue={question} setInputValue={setQuestion} />
            <Button size="3md" text="sm" type="submit" disabled={onDisableSubmitButton()}>
              등록하기
            </Button>
          </form>
        </div>

        <ul className="gap-4 flex flex-col max-h-[380px] overflow-y-scroll py-2">
          {myQuestions &&
            myQuestions.map(question => (
              <LineQuestrionCard
                key={question.questionId}
                size="xs"
                text={question.questionContent}>
                <button
                  onClick={() => {
                    deleteTrigger(question.questionId);
                    console.log(question.questionId);
                  }}>
                  <VariableIcon name="delete" size={20} />
                </button>
              </LineQuestrionCard>
            ))}
          <div ref={setTarget}></div>
        </ul>
      </div>
    </>
  );
}
