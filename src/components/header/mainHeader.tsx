import { selectInterviewState } from '@/recoils/home/interview/selectInterview/atom';
import { isLoginedAtom } from '@/recoils/user/isLogined/atom';
import { userInfoAtom } from '@/recoils/user/userInfo/atom';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import ThemeSwitch from '../themeSwitch/themeSwitch';

export const MainHeader = () => {
  const isLogined = useRecoilValue(isLoginedAtom);
  const userInfo = useRecoilValue(userInfoAtom);

  const resetSelectInterview = useResetRecoilState(selectInterviewState);
  const pathName = usePathname();
  return (
    <div className="flex items-center justify-between w-full px-4">
      <div className="flex gap-4">
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
        <Link
          className={`${pathName.includes('my') && 'font-bold'}`}
          href="/my?category=interview&Ifield=fe">
          마이페이지
        </Link>
        {/* <Link className={`${pathName.includes('resume') && 'font-bold'}`} href="/resume">
          이력서
        </Link> */}
      </div>
      <div className="flex justify-center items-center gap-4">
        {isLogined ? (
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
        <div className="min-w-[40px">
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
};
