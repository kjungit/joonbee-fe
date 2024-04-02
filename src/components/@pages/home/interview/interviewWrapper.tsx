import { RadioButtonGroup } from '@/components/@common/radioButtonGroup';
import { Text } from '@/components/@common/text';
import { useSearchParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { InterviewMenuItem } from './interviewMenuItem';
import { selectInterviewCategoryState } from '@/recoils/home/interview/selectInterviewCategory/atom';
import { useGetInterview } from '@/queries/interview/useGetInterview';
import Image from 'next/image';
import { MainCategory } from '@/constants/category';
interface ItemProps {
  id: string;
  text: string;
}

export const InterviewWrapper = () => {
  const [selectInterviewCategory, setSelectInterviewCategory] = useRecoilState(
    selectInterviewCategoryState,
  );

  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');
  const iFieldParams = searchParams.get('Ifield') as string;

  const { interviewData } = useGetInterview({
    selectCategory: selectInterviewCategory.category,
    sort: selectInterviewCategory.sort,
  });

  const handleClickCategory = (item: ItemProps) => {
    setSelectInterviewCategory({
      ...selectInterviewCategory,
      sort: item.id,
    });
  };

  return (
    <section className="min-w-[370px] h-full effect-white">
      {categoryParams === null ? (
        <div>면접 및 질문을 둘러보세요!</div>
      ) : (
        <div>
          <div className="h-[70px] p-5 flex justify-between">
            <div className="w-[140px]">
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
          <ul className="interviewListHeight overflow-scroll flex flex-col items-center ">
            {interviewData ? (
              interviewData.map(item => <InterviewMenuItem key={item.interviewId} item={item} />)
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <Image src="/desktop.png" width={200} height={200} alt="desktop" className="ml-4" />
                <Text size="lg" weight="md">
                  등록된 {MainCategory[iFieldParams]} 면접이 없습니다.
                </Text>
              </div>
            )}
          </ul>
        </div>
      )}
    </section>
  );
};
