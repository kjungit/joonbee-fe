import { useGetMyInterview } from '@/queries/interview/useGetMyInterview';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectMyInterviewAtom } from '@/recoils/user/seletMyInterview/atom';
import { useRouter, useSearchParams } from 'next/navigation';
import { MyMenuInterviewItem } from '@/types';
import { MenuInterviewItem } from '../@pages/my/menuInterviewitem';
import Image from 'next/image';
import { NavbarIsOpenAtom } from '@/recoils/responsive/navbar/atom';

export const MyInterviewMenu = () => {
  const isOpen = useRecoilValue(NavbarIsOpenAtom);

  const { interviewData, error, isFetching, isFetchingNextPage, status, setTarget } =
    useGetMyInterview();
  const [select, setSelect] = useRecoilState(selectMyInterviewAtom);

  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');
  const detailIdParams = searchParams.get('detailId');

  const handleClick = (item: MyMenuInterviewItem) => {
    setSelect(item);
    router.push(
      `/my?category=${categoryParams}&Ifield=${item.categoryName}&detailId=${item.interviewId}`,
    );
  };
  return (
    <div
      className={`flex flex-col justify-between h-full w-full ${isOpen && 'mt-10'}  md:mt-0 mt-10`}>
      {status === 'pending' ? (
        <div className="flex items-center justify-center w-full">
          <Image src={'/loginLoading.gif'} width={40} height={40} alt="loading" />
        </div>
      ) : (
        <ul className="h-full overflow-auto">
          {interviewData &&
            interviewData.map(item => (
              <MenuInterviewItem
                key={item.interviewId}
                item={item}
                onClick={handleClick}
                className={`${
                  (select.interviewId === item.interviewId ||
                    Number(detailIdParams) === item.interviewId) &&
                  'font-bold bg-blue-primary hover:text-white hover:bg-blue-primary text-white '
                }`}
              />
            ))}
          <div ref={setTarget}></div>
        </ul>
      )}

      <div>
        {isFetching && !isFetchingNextPage ? (
          <Image src={'/loginLoading.gif'} width={20} height={20} alt="loading" />
        ) : null}
      </div>
    </div>
  );
};
