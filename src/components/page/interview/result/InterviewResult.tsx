'use client';

import useVideo from '@/hooks/useVideo';
import { interviewVideoUrlAtom } from '@/recoil/interviewVideoUrl/atom';
import { myInterviewAtom } from '@/recoil/myInterview/atom';
import {
  selectedChocieCategoryAtom,
  selectedRandomCategoryAtom,
} from '@/recoil/selectedCategory/atom';
import { useRef } from 'react';
import { useRecoilValue } from 'recoil';

export default function InterviewResult() {
  // 선택 면접일 때 카테고리
  const chocieCategory = useRecoilValue(selectedChocieCategoryAtom);
  // 랜점 면접일 때 카테고리
  const randomCategory = useRecoilValue(selectedRandomCategoryAtom);
  const interview = useRecoilValue(myInterviewAtom);
  const videoUrl = useRecoilValue(interviewVideoUrlAtom);

  const { onDownload } = useVideo();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  console.log('내가 본 면접', interview);

  return (
    <>
      <button onClick={() => onDownload(videoUrl)}>영상 다운로드</button>
      <button onClick={videoPlay}>영상 재생</button>
      <video width="320" height="240" controls ref={videoRef}>
        <source src={videoUrl} type="video/webm" />
        브라우저가 비디오를 지원하지 않습니다.
      </video>
    </>
  );
}
