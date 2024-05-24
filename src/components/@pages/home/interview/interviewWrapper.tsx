import { RadioButtonGroup } from '@/components/@common/radioButtonGroup';
import { Text } from '@/components/@common/text';
import { useSearchParams } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';
import { InterviewMenuItem } from './interviewMenuItem';
import { selectInterviewCategoryState } from '@/recoils/home/interview/selectInterviewCategory/atom';
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

export const InterviewWrapper = () => {
  const isNavbarOpen = useRecoilValue(NavbarIsOpenAtom);
  const queryClient = useQueryClient();

  const [selectInterviewCategory, setSelectInterviewCategory] = useRecoilState(
    selectInterviewCategoryState,
  );

  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');
  const iFieldParams = searchParams.get('Ifield') as CategoryName;

  const {
    interviewLikedData,
    setTarget: setLikedTarget,
    interviewRefetch: likedRefetch,
  } = useGetLikedInterview({
    selectCategory: iFieldParams,
  });

  const {
    interviewLatestData,
    setTarget: setLatestTarget,
    interviewRefetch: latestRefetch,
  } = useGetLatestInterview({
    selectCategory: iFieldParams,
  });

  const handleClickCategory = (item: ItemProps) => {
    queryClient.removeQueries({ queryKey: ['getInterview'] });
    setSelectInterviewCategory({
      ...selectInterviewCategory,
      sort: item.id,
    });
  };

  useEffect(() => {
    if (selectInterviewCategory.sort === 'latest') {
      latestRefetch();
    }
    if (selectInterviewCategory.sort === 'like') {
      likedRefetch();
    }
  }, [selectInterviewCategory]);

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
              defaultId={selectInterviewCategory.sort}
              groupName="main-category"
              size="sm"
              data={[
                { id: 'latest', text: '최신순' },
                { id: 'like', text: '좋아요' },
              ]}
              onClickFunc={handleClickCategory}
            />
          </div>
          {selectInterviewCategory.sort === 'like' && interviewLikedData && (
            <ul className="interviewListHeight overflow-auto">
              {interviewLikedData &&
                interviewLikedData.map((item: InterviewItem) => (
                  <InterviewMenuItem key={item.interviewId + 'like'} item={item} />
                ))}
              <div ref={setLikedTarget} className="pb-[90px]"></div>
            </ul>
          )}
          {selectInterviewCategory.sort === 'latest' && interviewLatestData && (
            <ul className="interviewListHeight overflow-auto">
              {interviewLatestData &&
                interviewLatestData.map((item: InterviewItem) => (
                  <InterviewMenuItem key={item.interviewId + 'latest'} item={item} />
                ))}
              <div ref={setLatestTarget} className="pb-[90px]"></div>
            </ul>
          )}
          {(selectInterviewCategory.sort === 'like' && interviewLikedData?.length === 0) ||
            (selectInterviewCategory.sort === 'latest' && interviewLatestData?.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full pt-20">
                <Image src="/desktop.png" width={200} height={200} alt="desktop" className="ml-4" />
                <Text size="lg" weight="md">
                  등록된 {MainCategory[iFieldParams]} 면접이 없습니다.
                </Text>
              </div>
            ))}
        </div>
      )}
    </section>
  );
};
