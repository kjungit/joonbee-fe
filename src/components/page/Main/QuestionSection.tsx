'use client';
import React, { useEffect, useState } from 'react';
import Dropdown from '@/components/ui/Dropdown';
import { QuestionCard } from '@/components/common/QuestionCard';
import SlideSection from './SlideSection';
import useSWR from 'swr';
import { getQuestionList } from '@/app/apis/services/question';
import { CategoryName, QustionItem, SubcategoryName } from '@/types/question';
import { questionCategory } from '@/constants/category';
import ReactPaginate from 'react-paginate';
import SkeletonQuestion from './SkeletonQuestion';
import { CartClipboard } from '@/components/common/CartClipboard';
import useSWRMutation from 'swr/mutation';
import { postCartsave } from '@/app/apis/services/member';
interface PaginationEvent {
  selected: number;
}

export const COLOR_NUMBER = [2, 3, 6, 7, 10, 11, 14, 15];
export default function QuestionSection() {
  const [selectPage, setSelectPage] = useState(0);
  const [mainSelectCategory, setMainSelectCategory] = useState<CategoryName>('');
  const [subSelectCategory, setSubSelectCategory] = useState<CategoryName>('');
  const [isDisabled, setIsDisabled] = useState(false);
  const categoryNames = questionCategory.map(item => item.category);
  const [subCategoryNames, setSubCategoryNames] = useState<SubcategoryName[]>([]);

  const { data, isLoading } = useSWR<QustionItem[]>(
    ['/api/question/all', selectPage, mainSelectCategory, subSelectCategory],
    () =>
      getQuestionList({
        page: selectPage,
        category: mainSelectCategory,
        subcategory: subSelectCategory,
      }),
    { suspense: true },
  );

  useEffect(() => {
    if (mainSelectCategory === '') {
      setIsDisabled(true);
      setSubSelectCategory('');
    } else {
      setIsDisabled(false);
    }

    setSubCategoryNames(
      questionCategory.find(item => item.category === mainSelectCategory)?.subcategory || [],
    );

    setSelectPage(0);
  }, [mainSelectCategory]);

  const handlePageClick = (event: PaginationEvent) => {
    setSelectPage(event.selected + 1);
  };

  const onClickCart = (item: QustionItem) => {
    const { subcategoryName, questionContent } = item;
  };

  return (
    <section className="flex flex-col items-center bg-blue-light pb-[200px] ">
      <h3 className="mt-14 mb-4  text-main-primary text-center text-2xl font-bold">
        여러 언어의 질문을 찾아보세요.
      </h3>
      <SlideSection />

      <div className="max-w-[1024px] w-full mt-14 p-5">
        <div className="flex gap-6">
          <Dropdown
            data={categoryNames}
            selected={mainSelectCategory}
            onSelect={setMainSelectCategory}
            color="white"
          />
          <Dropdown
            data={subCategoryNames}
            selected={subSelectCategory === '' ? '세부 카테고리' : subSelectCategory}
            onSelect={setSubSelectCategory}
            title="세부 카테고리"
            isDisabled={isDisabled}
          />
        </div>
        {isLoading && <SkeletonQuestion />}
        <ul className="flex flex-wrap gap-4 justify-between mt-10">
          {data &&
            data.map((item, index) => (
              <QuestionCard
                key={item.questionId}
                size="md"
                color={COLOR_NUMBER.includes(index + 1) ? 'gray' : 'navy'}
                text={item.questionContent}>
                <CartClipboard
                  categoryName={mainSelectCategory}
                  item={item}
                  color={`${COLOR_NUMBER.includes(index + 1) ? 'text-black' : 'text-white'}`}
                />
              </QuestionCard>
            ))}
        </ul>
        <div className="flex justify-center mt-14">
          <ReactPaginate
            className="flex pagination gap-4"
            nextLabel=">"
            onPageChange={handlePageClick}
            pageCount={10}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            previousLabel="<"
            renderOnZeroPageCount={null}
            initialPage={0}
            pageLabelBuilder={page => page}
          />
        </div>
      </div>
    </section>
  );
}
