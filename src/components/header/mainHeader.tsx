import { useUserInfo } from '@/queries/user/useUserInfo';
import { selectInterviewState } from '@/recoils/home/interview/selectInterview/atom';
import { userInfoAtom } from '@/recoils/user/userInfo/atom';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRecoilValue, useResetRecoilState } from 'recoil';

export const MainHeader = () => {
  const userInfo = useRecoilValue(userInfoAtom);
  const [cookies] = useCookies(['joonbee-token']);
  const { userInfoRefetch } = useUserInfo();
  const resetSelectInterview = useResetRecoilState(selectInterviewState);
  const pathName = usePathname();

  useEffect(() => {
    if (!userInfo.thumbnail) {
      userInfoRefetch();
    }
  }, []);
  return (
    <div className="flex items-center justify-between w-full px-6">
      <div className="flex gap-4 md:text-md text-sm">
        <button onClick={resetSelectInterview}>
          <Link className={`${pathName === '/' && 'font-bold'}`} href="/">
            홈
          </Link>
        </button>
        <Link
          className={`${pathName.includes('interview') && 'font-bold'}`}
          href="/interview/random">
          AI 면접
        </Link>
        {cookies['joonbee-token'] && (
          <Link
            className={`${pathName.includes('my') && 'font-bold'}`}
            href="/my?category=interview&Ifield=fe">
            마이페이지
          </Link>
        )}
        {/* <Link className={`${pathName.includes('resume') && 'font-bold'}`} href="/resume">
          이력서
        </Link> */}
      </div>
      <div className="flex justify-center items-center gap-4 md:text-md text-sm">
        {cookies['joonbee-token'] ? (
          <div className="relative">
            <Link href="/my?category=interview&Ifield=fe">
              <Image
                src={userInfo.thumbnail}
                alt={`${userInfo.nickName} profile`}
                width={26}
                height={26}
                className="rounded-full hover:outline-4 hover:outline-blue-primary/20 hover:outline "
              />
            </Link>
            <div className="absolute top-0 right-0"></div>
          </div>
        ) : (
          <Link href="/login">로그인</Link>
        )}
      </div>
    </div>
  );
};
