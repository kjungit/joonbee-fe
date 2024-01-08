'use client';

import PreventBackModal from '@/components/common/PreventBackModal';
import { Button } from '@/components/ui/Button';
import { interviewTypeAtom } from '@/recoil/interviewType/atom';
import { interviewVideoUrlAtom } from '@/recoil/interviewVideoUrl/atom';
import { myInterviewAtom } from '@/recoil/myInterview/atom';
import {
  selectedChocieCategoryAtom,
  selectedRandomCategoryAtom,
} from '@/recoil/selectedCategory/atom';
import { useRecoilValue } from 'recoil';
import { videoPermissionAtom } from '@/recoil/videoPermission/atom';
import { useModal } from '@/hooks/useModal';
import InterviewVideoModal from './InterviewVideoModal';

export default function InterviewResult() {
  // 인터뷰 타입
  const interviewType = useRecoilValue(interviewTypeAtom);
  // 선택 면접일 때 카테고리
  const chocieCategory = useRecoilValue(selectedChocieCategoryAtom);
  // 랜점 면접일 때 카테고리
  const randomCategory = useRecoilValue(selectedRandomCategoryAtom);
  const isVideo = useRecoilValue(videoPermissionAtom);

  const { isOpened, onClose, onOpen } = useModal();
  return (
    <>
      <Button color="blueSecondary" size="lg" text="sm" disabled={!isVideo} onClick={onOpen}>
        면접 영상 확인하기
      </Button>

      {isOpened && <InterviewVideoModal onClose={onClose} />}
      <PreventBackModal />
    </>
  );
}
