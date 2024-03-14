'use client';

import { MyInterviewSection } from '@/components/@pages/my/myInterviewSection';
import { MyQuestionSection } from '@/components/@pages/my/myQuestionSection';
import { useSearchParams } from 'next/navigation';

export default function MyPage() {
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');

  return (
    <div className="w-full overflow-auto questionListHeight">
      {categoryParams === 'interview' && <MyInterviewSection />}
      {categoryParams === 'question' && <MyQuestionSection />}
    </div>
  );
}
