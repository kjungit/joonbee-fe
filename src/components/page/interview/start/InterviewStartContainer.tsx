'use client';

import { InterviewStartBox } from '@/components/common/InterviewStartBox';
import InterviewLoading from '@/components/ui/InterviewLoading';
import { Category } from '@/constants/category';
import useBeforeUnload from '@/hooks/useBeforeUnload';
import { interviewTimeAtom, questionCountAtom } from '@/recoil/interviewSetting/atoms';
import { interviewTypeAtom } from '@/recoil/interviewType/atom';
import { myQuestionAtom } from '@/recoil/myQuestion/atom';
import {
  selectedChocieCategoryAtom,
  selectedRandomCategoryAtom,
} from '@/recoil/selectedCategory/atom';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function InterviewStartContainer() {
  const [isPressedBtn, setIsPressedBtn] = useState<boolean>(false);
  const type = useRecoilValue(interviewTypeAtom);

  const randomCategory = useRecoilValue(selectedRandomCategoryAtom);
  const choiceCategory = useRecoilValue(selectedChocieCategoryAtom);
  const category = type === 'random' ? randomCategory : choiceCategory;
  const questionSec = useRecoilValue(interviewTimeAtom);
  const questions = useRecoilValue(myQuestionAtom);
  const router = useRouter();

  useEffect(() => {
    if (isPressedBtn) {
      setTimeout(() => {
        router.push('/interview/progress');
      }, 3000);
    }
  }, [isPressedBtn]);

  const onNavigate = () => {
    setIsPressedBtn(true);
  };

  useBeforeUnload();

  return (
    <>
      {!isPressedBtn ? (
        <InterviewStartBox
          onClick={onNavigate}
          category={Category[category]}
          questionCount={questions.length}
          questionSec={questionSec}
        />
      ) : (
        <div className="flex flex-col items-center gap-5">
          <InterviewLoading interviewType="chocie" />
          <h2 className="text-white font-bold text-[20px]">면접을 준비중입니다.</h2>
        </div>
      )}
    </>
  );
}
