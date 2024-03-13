import { useGetMyInterview } from '@/queries/interview/useGetMyInterview';
import { PolarChart } from '../@common/polarChart/polarChart';
import { MainCategory } from '@/constants/category';
import { Text } from '../@common/text/text';
import { VariableIcon } from '../@common/variableIcon/variableIcon';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectMyInterviewState } from '@/recoils/user/seletMyInterview/atom';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CategoryName, MyMenuInterviewItem, SubcategoryName } from '@/types';
import { MenuInterviewItem } from '../@pages/my/menuInterviewitem';

export const MyInterviewMenu = () => {
  const { interviewData, error, isFetching, isFetchingNextPage, status, setTarget } =
    useGetMyInterview();
  const [select, setSelect] = useRecoilState(selectMyInterviewState);

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
    <div className="flex flex-col justify-between h-full w-full ">
      {status === 'pending' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <p>Error: {error?.message}</p>
      ) : (
        <ul className="h-full">
          {interviewData &&
            interviewData.map(item => (
              <MenuInterviewItem
                key={item.interviewId}
                detailIdParams={Number(detailIdParams)}
                item={item}
                onClick={handleClick}
              />
            ))}
          <div ref={setTarget}></div>
        </ul>
      )}

      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      <PolarChart />
    </div>
  );
};
