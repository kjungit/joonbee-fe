import { RadioButtonGroup } from '@/components/@common/radioButtonGroup/radioButtonGroup';
import { Text } from '@/components/@common/text/text';
import { useSearchParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { InterviewMenuItem } from './interviewMenuItem';
import { selectInterviewCategoryState } from '@/recoils/home/interview/selectInterviewCategory/atom';
import { useGetInterview } from '@/queries/interview/useGetInterview';
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
          <div className="h-[70px] p-5 flex">
            <Text size="lg" weight="md">
              다른 사람의 면접들을 확인해보세요.
            </Text>
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
          <ul className="interviewListHeight overflow-scroll ">
            {interviewData ? (
              interviewData.map(item => <InterviewMenuItem key={item.interviewId} item={item} />)
            ) : (
              <div>등록 된 질문이 없습니다.</div>
            )}
          </ul>
        </div>
      )}
    </section>
  );
};
