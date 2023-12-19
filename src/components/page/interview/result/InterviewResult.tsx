'use client';

import useVideo from '@/hooks/useVideo';
import { interviewVideoUrlAtom } from '@/recoil/interviewVideoUrl/atom';
import { myInterviewAtom } from '@/recoil/myInterview/atom';
import { selectedCategoryAtom } from '@/recoil/selectedCategory/atom';
import { useRecoilValue } from 'recoil';

export default function InterviewResult() {
  const category = useRecoilValue(selectedCategoryAtom);
  const interview = useRecoilValue(myInterviewAtom);
  const videoUrl = useRecoilValue(interviewVideoUrlAtom);

  const { onDownload } = useVideo();

  console.log('내가 본 면접', category, interview);

  return (
    <>
      <button onClick={() => onDownload(videoUrl)}>테스트 다운로드</button>
    </>
  );
}
