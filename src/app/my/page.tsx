'use client';

import authApis from '@/apis/services/authApis';
import { MyInterviewSection } from '@/components/@pages/my/myInterviewSection';
import { MyQuestionSection } from '@/components/@pages/my/myQuestionSection';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export default function MyPage() {
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');
  const [cookies] = useCookies(['joonbee-token']);
  const router = useRouter();

  useEffect(() => {
    if (!cookies['joonbee-token']) {
      router.push('/login');
    }
  }, []);
  return (
    <div className={`w-full overflow-auto questionListHeight `}>
      {categoryParams === 'interview' && <MyInterviewSection />}
      {categoryParams === 'question' && <MyQuestionSection />}
    </div>
  );
}
