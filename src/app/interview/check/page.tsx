'use client';
import InterviewCheck from '@/components/page/interview/check/InterviewCheck';
import { Button } from '@/components/ui/Button';
import ContentLayout from '@/components/common/layouts/ContentLayout';
import Link from 'next/link';
import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useModal } from '@/hooks/useModal';
import { useRouter } from 'next/navigation';
import Modal from '@/components/ui/Modal';

const InterviewCheckPage = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { isOpened, onClose, onOpen } = useModal();

  const router = useRouter();

  const onConfirm = () => {
    router.push('/interview/result');
  };

  return (
    <ContentLayout>
      <div className="flex flex-col gap-5 w-full h-full bg-background-lightgray p-8 rounded-2xl relative">
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold text-[20px]">답변 확인하기</h2>
            <p className="text-sm text-gray-dark font-bold">답변을 확인하고 수정할 수 있어요!</p>
          </div>

          <TypeAnimation
            sequence={[
              '답변을 작성하지 않으면 AI가 피드백을 줄 수 없어요!',
              1000,
              '최대한 알고있는 정보들을 입력해주세요.',
              1000,
            ]}
            speed={20}
            className="text-main-primary font-bold text-xl"
            repeat={Infinity}
          />
        </div>
        <InterviewCheck disableBtn={setIsDisabled} />
        <Button
          color="blueSecondary"
          size="lg"
          text="sm"
          className="absolute bottom-8 right-8"
          onClick={onOpen}
          disabled={isDisabled}>
          면접 결과 보기
        </Button>
      </div>
      {isOpened && (
        <Modal isOpened={isOpened} onClose={onClose}>
          <Modal.Title>알림</Modal.Title>
          <Modal.Body>답변을 모두 확인하셨을까요? 답변을 최대한 작성해주세요.</Modal.Body>
          <Modal.CloseButton onClick={onClose}>다시 확인하기</Modal.CloseButton>
          <Modal.ConfirmButton onClick={onConfirm}>결과보기</Modal.ConfirmButton>
        </Modal>
      )}
    </ContentLayout>
  );
};

export default InterviewCheckPage;
