import { useRecoilState } from 'recoil';
import { Text } from '../@common/text/text';
import { useRouter, useSearchParams } from 'next/navigation';
import { selectInterviewCategoryState } from '@/recoils/home/interview/selectInterviewCategory/atom';
import { ToggleItemProps } from '@/types';
import { toggleNavbarIntreviewList } from '@/constants/toggleNavbarItem';

export const InterviewMenu = () => {
  const [selectInterviewCategory, setSelectInterviewCategory] = useRecoilState(
    selectInterviewCategoryState,
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const fieldParams = searchParams.get('Ifield');
  const categoryParams = searchParams.get('category');

  return (
    <div className="p-4 h-full">
      <Text size="xl" weight="lg">
        면접 보기
      </Text>
      {toggleNavbarIntreviewList.map(item => (
        <button
          key={item.id}
          className={`flex items-center ${fieldParams === item.id && 'font-bold'}`}
          onClick={() => {
            setSelectInterviewCategory({ ...selectInterviewCategory, category: item.id });
            router.push(`/?category=${categoryParams}&Ifield=${item.id}`);
          }}>
          <div>{item.value}</div>
        </button>
      ))}
    </div>
  );
};
