'use client';
import { useSearchParams } from 'next/navigation';
import DetailInterviewSection from './interview/detailInterviewSection';
import { InterviewWrapper } from './interview/interviewWrapper';
import { QuestionWrapper } from './question/questionWrapper';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isNotLogined } from '@/recoils/user/isNotLogined/atom';
import ModalPortal from '@/components/@common/modalPortal';
import { CommonModal } from '@/components/@common/commonModal';
import { Text } from '@/components/@common/text';
import { NavbarIsOpenAtom } from '@/recoils/responsive/navbar/atom';

export const HomeSectionWrapper = () => {
  const isNavbarOpen = useRecoilValue(NavbarIsOpenAtom);

  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');

  const [isOpen, setIsOpen] = useRecoilState(isNotLogined);

  return (
    <div className={`w-full flex flex-col ${isNavbarOpen && 'overflow-hidden'}`}>
      <div className="flex h-full w-full">
        {categoryParams !== null && categoryParams === 'interview' && <InterviewWrapper />}
        {categoryParams !== 'question' && <DetailInterviewSection />}
        {categoryParams === 'question' && <QuestionWrapper />}
        {isOpen && (
          <ModalPortal>
            <CommonModal isModalOpen={isOpen} setIsModalOpen={setIsOpen}>
              <Text size="xl" className="text-blue-secondary w-full" weight="lg">
                로그인 후 이용해주세요.
              </Text>
            </CommonModal>
          </ModalPortal>
        )}
      </div>
    </div>
  );
};
