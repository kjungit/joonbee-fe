'use client';
import { useSearchParams } from 'next/navigation';
import DetailInterviewSection from './interview/detailInterviewSection';
import { InterviewWrapper } from './interview/interviewWrapper';
import { QuestionWrapper } from './question/questionWrapper';
import { useRecoilState } from 'recoil';
import { isNotLogined } from '@/recoils/user/isNotLogined/atom';
import ModalPortal from '@/components/@common/modalPortal';
import { CommonModal } from '@/components/@common/commonModal';
import { Text } from '@/components/@common/text';

export const HomeSectionWrapper = () => {
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');

  const [isOpen, setIsOpen] = useRecoilState(isNotLogined);

  return (
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
  );
};
