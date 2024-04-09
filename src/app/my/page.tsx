'use client';

import { MyInterviewSection } from '@/components/@pages/my/myInterviewSection';
import { MyQuestionSection } from '@/components/@pages/my/myQuestionSection';
import { NavbarIsOpenAtom } from '@/recoils/responsive/navbar/atom';
import { useSearchParams } from 'next/navigation';
import { useRecoilValue } from 'recoil';

export default function MyPage() {
  const isOpen = useRecoilValue(NavbarIsOpenAtom);
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');

  return (
    <div className={`w-full overflow-auto questionListHeight ${isOpen && 'min-w-[320px]'}`}>
      {categoryParams === 'interview' && <MyInterviewSection />}
      {categoryParams === 'question' && <MyQuestionSection />}
    </div>
  );
}
