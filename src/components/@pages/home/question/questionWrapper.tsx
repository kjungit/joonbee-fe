'use client';
import { Text } from '@/components/@common/text';
import { VariableIcon } from '@/components/@common/variableIcon';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { QuestionSaveIcon } from './questionSaveIcon';
import { useGetQuestion } from '@/queries/question/useGetQuestion';
import { CenterSectionWrapper } from '@/components/wrapper/centerSectionWrapper';
import ModalPortal from '@/components/@common/modalPortal';
import { CommonModal } from '@/components/@common/commonModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isSaveQuestion } from '@/recoils/user/isSaveQuestion/atom';
import Image from 'next/image';
import { NavbarIsOpenAtom } from '@/recoils/responsive/navbar/atom';

export const QuestionWrapper = () => {
  const isNavbarOpen = useRecoilValue(NavbarIsOpenAtom);

  const [isOpen, setIsOpen] = useRecoilState(isSaveQuestion);

  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');
  const { questionData, error, isFetching, isFetchingNextPage, status, setTarget } =
    useGetQuestion();
  return (
    <div className="flex h-full w-full justify-center overflow-auto">
      <CenterSectionWrapper>
        {categoryParams === 'question' && (
          <ul
            className={`flex flex-col gap-4 interviewListHeight md:pt-14 md:px-0 px-4 pt-4 ${
              isNavbarOpen && 'w-[100px]'
            }`}>
            {questionData &&
              questionData.map((item, i) => (
                <li
                  key={item.questionId}
                  className={`flex gap-2 md:h-10 h-auto items-start justify-between md:justify-normal`}>
                  <div className="flex gap-2">
                    <VariableIcon className="min-w-[18px]" name="questionBox" size={18} />
                    <Text size="lg" className={` ${isNavbarOpen && 'whitespace-nowrap'}`}>
                      {item.questionContent}
                    </Text>
                  </div>
                  <QuestionSaveIcon
                    subcategoryName={item.subcategoryName}
                    questionContent={item.questionContent}
                  />
                </li>
              ))}
            <div ref={setTarget} className="pb-20">
              ㅤ
            </div>
          </ul>
        )}

        <div>
          {isFetching && !isFetchingNextPage ? (
            <Image src={'/loginLoading.gif'} width={20} height={20} alt="loding" />
          ) : null}
        </div>
        {isOpen && (
          <ModalPortal>
            <CommonModal isModalOpen={isOpen} setIsModalOpen={setIsOpen}>
              <Text size="xl" className="text-blue-secondary w-full" weight="lg">
                질문을 저장했습니다.
              </Text>
            </CommonModal>
          </ModalPortal>
        )}
      </CenterSectionWrapper>
    </div>
  );
};
