'use client';
import React, { useEffect, useState } from 'react';
import Dropdown from '../../ui/Dropdown';
import { QuestionCard } from '../../common/QuestionCard';
import SlideSection from './SlideSection';
import useSWR from 'swr';
import { getQuestionList } from '../../../app/apis/services/question';
import { CategoryName, QuestionType, SubcategoryName } from '@/types/question';
import { questionCategory } from '../../../constants/category';
import ReactPaginate from 'react-paginate';
import SkeletonQuestion from './SkeletonQuestion';
import { CartClipboard } from '../../common/CartClipboard';
import ModalPortal from '../../ui/ModalPortal';
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
  const [isHover, setIsHover] = useState(false);
  const [hoverContent, setHoverContent] = useState('');
  const { data, isLoading } = useSWR<QuestionType>(
    ['/api/question/all', selectPage, mainSelectCategory, subSelectCategory],
    () =>
      getQuestionList({
        page: selectPage,
        category: mainSelectCategory,
        subcategory: subSelectCategory,
      }),
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

  useEffect(() => {
    console.log(data?.total);
  }, []);

  return (
    <section id="question" className="flex flex-col items-center bg-blue-light pb-[200px] ">
      <h3 className="mt-14 mb-4  text-main-primary text-center text-2xl font-bold">
        여러 언어의 질문을 찾아보세요.
      </h3>
      <SlideSection />

      <div className="max-w-[1024px] w-full mt-14 p-5">
        <div className="flex justify-between">
          <div className="flex gap-6 items-end">
            <Dropdown
              data={categoryNames}
              selected={mainSelectCategory}
              onSelect={setMainSelectCategory}
              color="white"
              size="md"
            />
            <Dropdown
              data={subCategoryNames}
              selected={subSelectCategory === '' ? '세부 카테고리' : subSelectCategory}
              onSelect={setSubSelectCategory}
              title="세부 카테고리"
              isDisabled={isDisabled}
              size="md"
            />
          </div>
          {/* <div className="flex items-end gap-2">
            <Image
              className="w-[30px] h-[30px]"
              width={30}
              height={30}
              src="/icons/emoji/zoom.png"
              alt="zoom"
            />
            <p className="font-bold text-main-primary text-sm">
              ... 표시의 질문은 질문 위에 커서를 놓아보세요!
            </p>
          </div> */}
        </div>
        {isLoading && <SkeletonQuestion />}
        <ul className="flex flex-wrap gap-4 justify-between mt-10">
          {data &&
            data.result.map((item, index) => (
              <button
                key={item.questionId}
                className="w-full lg:max-w-[480px]  h-full"
                onMouseOver={() => {
                  setIsHover(true), setHoverContent(item.questionContent);
                }}
                onMouseOut={() => {
                  if (!isHover || !document.querySelector('.ModalPortal')) {
                    setIsHover(false);
                  }
                }}>
                <QuestionCard
                  size="md"
                  color={COLOR_NUMBER.includes(index + 1) ? 'gray' : 'navy'}
                  text={item.questionContent}>
                  <CartClipboard
                    item={item}
                    color={`${COLOR_NUMBER.includes(index + 1) ? 'text-black' : 'text-white'}`}
                  />
                </QuestionCard>
              </button>
            ))}
        </ul>
        <div className="flex justify-center mt-14">
          {data && (
            <ReactPaginate
              className="flex pagination gap-4"
              nextLabel=">"
              onPageChange={handlePageClick}
              pageCount={Math.ceil(data?.total / 16)}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              previousLabel="<"
              renderOnZeroPageCount={null}
              initialPage={0}
              pageLabelBuilder={page => page}
            />
          )}
        </div>
      </div>

      {isHover && (
        <ModalPortal>
          <div className="fixed -translate-x-1/2 left-1/2 top-[85%]">
            <div className="p-2 font-bold border-main-primary border-4 w-full min-w-[200px] max-w-[600px] rounded-lg items-center justify-center flex text-lg h-[100px]  bg-white opacity-90 text-main-primary">
              {hoverContent}
            </div>
          </div>
        </ModalPortal>
      )}
    </section>
  );
}
