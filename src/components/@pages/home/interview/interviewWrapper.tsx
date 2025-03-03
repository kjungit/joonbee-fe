import { RadioButtonGroup } from '@/components/@common/radioButtonGroup';
import { Text } from '@/components/@common/text';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { InterviewMenuItem } from './interviewMenuItem';
import Image from 'next/image';
import { MainCategory } from '@/constants/category';
import { CategoryName, InterviewItem } from '@/types';
import { NavbarIsOpenAtom } from '@/recoils/responsive/navbar/atom';
import DetailInterviewInfoWrapper from './detailInterviewInfoWrapper';
import { useGetLikedInterview } from '@/queries/interview/useGetLikedInterview';
import { useGetLatestInterview } from '@/queries/interview/useGetLatestInterview';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface ItemProps {
  id: string;
  text: string;
}

const NoInterviewMessage = ({ category }: { category: string }) => (
  <div className="flex flex-col interviewListHeight items-center justify-center h-full pt-20">
    <Image src="/desktop.png" width={200} height={200} alt="desktop" className="ml-4" />
    <Text size="lg" weight="md">
      등록된 {category} 면접이 없습니다.
    </Text>
  </div>
);
const LoadingMessage = () => (
  <div className="flex flex-col interviewListHeight items-center justify-center h-full pt-20">
    <Image src={'/loginLoading.gif'} width={70} height={70} alt="loading" />
  </div>
);
export const InterviewWrapper = () => {
  const isNavbarOpen = useRecoilValue(NavbarIsOpenAtom);
  const queryClient = useQueryClient();
  const router = useRouter();

  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');
  const iFieldParams = searchParams.get('Ifield') as CategoryName;
  const sortParams = searchParams.get('sort') as string;

  const {
    interviewLikedData,
    setTarget: setLikedTarget,
    interviewRefetch: likedRefetch,
    isRefetching: likedFetching,
  } = useGetLikedInterview();
  const {
    interviewLatestData,
    setTarget: setLatestTarget,
    interviewRefetch: latestRefetch,
    isRefetching: latestFetching,
  } = useGetLatestInterview();

  const handleClickCategory = (item: ItemProps) => {
    queryClient.removeQueries({ queryKey: ['getInterview'] });
    router.replace(`/?category=${categoryParams}&Ifield=${iFieldParams}&sort=${item.id}`);
  };

  useEffect(() => {
    if (sortParams === 'latest') {
      latestRefetch();
    }
    if (sortParams === 'like') {
      likedRefetch();
    }
  }, [categoryParams, iFieldParams, sortParams]);

  const noInterviews =
    (sortParams === 'like' && !interviewLikedData?.length) ||
    (sortParams === 'latest' && !interviewLatestData?.length);
  const isLoading = likedFetching || latestFetching;

  return (
    <section className="md:max-w-[370px] w-full h-full effect-white ">
      {categoryParams === null ? (
        <div>면접 및 질문을 둘러보세요!</div>
      ) : (
        <div className="">
          <div className="md:hidden flex">
            {categoryParams === 'interview' && <DetailInterviewInfoWrapper />}
          </div>
          <div className="h-[70px] p-5 flex justify-between">
            <div className={`w-[140px] ${isNavbarOpen && 'hidden'}`}>
              <Text size="lg" weight="md">
                다른 사람의 면접들을 확인해보세요.
              </Text>
            </div>
            <RadioButtonGroup
              defaultId={sortParams}
              groupName="main-category"
              size="sm"
              data={[
                { id: 'latest', text: '최신순' },
                { id: 'like', text: '좋아요' },
              ]}
              onClickFunc={handleClickCategory}
            />
          </div>
          {isLoading && <LoadingMessage />}
          {!isLoading && noInterviews ? (
            <NoInterviewMessage category={MainCategory[iFieldParams]} />
          ) : (
            <>
              {sortParams === 'like' && interviewLikedData?.length && (
                <ul className="interviewListHeight overflow-auto">
                  {interviewLikedData.map((item: InterviewItem) => (
                    <InterviewMenuItem key={item.interviewId + 'like'} item={item} />
                  ))}
                  <div ref={setLikedTarget} className="pb-[90px]"></div>
                </ul>
              )}
              {sortParams === 'latest' && interviewLatestData?.length && (
                <ul className="interviewListHeight overflow-auto">
                  {interviewLatestData.map((item: InterviewItem) => (
                    <InterviewMenuItem key={item.interviewId + 'latest'} item={item} />
                  ))}
                  <div ref={setLatestTarget} className="pb-[90px]"></div>
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
};
