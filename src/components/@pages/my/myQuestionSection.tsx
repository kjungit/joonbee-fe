'use client';
import { Text } from '@/components/@common/text';
import { VariableIcon } from '@/components/@common/variableIcon';
import { useGetMyQuestion } from '@/queries/question/useGetMyQuestion';
import { QuestionDeleteIcon } from '../home/question/questionDeleteIcon';
import { CenterSectionWrapper } from '@/components/wrapper/centerSectionWrapper';
import Image from 'next/image';
import ModalPortal from '@/components/@common/modalPortal';
import { CommonModal } from '@/components/@common/commonModal';
import { useRecoilState } from 'recoil';
import { isDeleteQuestion } from '@/recoils/user/isDeleteQuestion/atom';

export const MyQuestionSection = () => {
  const [isOpen, setIsOpen] = useRecoilState(isDeleteQuestion);
  const { questionData, error, isFetching, isFetchingNextPage, status, setTarget } =
    useGetMyQuestion();

  return (
    <CenterSectionWrapper>
      <div className="questionListHeight p-5">
        {questionData?.length === 0 && (
          <div className="flex flex-col items-center justify-center interviewListHeight pt-20">
            <Image src="/desktop.png" width={200} height={200} alt="desktop" className="ml-4" />
            <Text size="lg" weight="md">
              저장된 질문이 없습니다.
            </Text>
          </div>
        )}
        {status === 'pending' ? (
          <div className=" flex items-center justify-center interviewListHeight ">
            <Image src={'/loginLoading.gif'} width={100} height={100} alt="loading" />
          </div>
        ) : (
          <ul className=" flex flex-col gap-4 interviewListHeight overflow-auto">
            {questionData &&
              questionData?.map(item => (
                <li key={item.questionId} className="flex gap-4">
                  <div className="flex gap-2">
                    <VariableIcon name="questionBox" size={18} />
                    <Text size="lg">{item.questionContent}</Text>
                  </div>
                  <QuestionDeleteIcon id={Number(item.questionId)} />
                </li>
              ))}
            <div ref={setTarget}></div>
          </ul>
        )}

        {isOpen && (
          <ModalPortal>
            <CommonModal isModalOpen={isOpen} setIsModalOpen={setIsOpen}>
              <Text size="xl" className="text-blue-secondary w-full" weight="lg">
                질문을 삭제했습니다.
              </Text>
            </CommonModal>
          </ModalPortal>
        )}
      </div>
    </CenterSectionWrapper>
  );
};
