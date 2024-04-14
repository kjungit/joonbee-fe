'use client';

import authApis from '@/apis/services/authApis';
import { MyInterviewSection } from '@/components/@pages/my/myInterviewSection';
import { MyQuestionSection } from '@/components/@pages/my/myQuestionSection';
import { NavbarIsOpenAtom } from '@/recoils/responsive/navbar/atom';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRecoilValue } from 'recoil';

export default function MyPage() {
  const isOpen = useRecoilValue(NavbarIsOpenAtom);
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');
  const [cookies] = useCookies(['joonbee-token']);
  const router = useRouter();

  useEffect(() => {
    if (!cookies['joonbee-token']) {
      authApis.getRefresh().then(data => {
        if (data.status !== 200) router.push('/login');
      });
    }
  }, []);
  return (
    <div className={`w-full overflow-auto questionListHeight ${isOpen && 'min-w-[320px]'}`}>
      {categoryParams === 'interview' && <MyInterviewSection />}
      {categoryParams === 'question' && <MyQuestionSection />}
    </div>
  );
}
