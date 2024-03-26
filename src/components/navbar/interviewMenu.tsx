import { useRecoilState } from 'recoil';
import { useRouter, useSearchParams } from 'next/navigation';
import { selectInterviewCategoryState } from '@/recoils/home/interview/selectInterviewCategory/atom';
import { toggleNavbarIntreviewList } from '@/constants/toggleNavbarItem';
import { VariableIcon } from '../@common/variableIcon';

export const InterviewMenu = () => {
  const [selectInterviewCategory, setSelectInterviewCategory] = useRecoilState(
    selectInterviewCategoryState,
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const fieldParams = searchParams.get('Ifield');
  const categoryParams = searchParams.get('category');

  return (
    <div className="p-4 h-full flex flex-col gap-2">
      {toggleNavbarIntreviewList.map(item => (
        <button
          key={item.id}
          className={`flex items-center ${fieldParams === item.id && 'font-bold'}`}
          onClick={() => {
            setSelectInterviewCategory({ ...selectInterviewCategory, category: item.id });
            router.push(`/?category=${categoryParams}&Ifield=${item.id}`);
          }}>
          <div className="w-4">
            {item.id === fieldParams && <VariableIcon name="leftArrow" size={14} />}
          </div>
          <div>{item.value}</div>
        </button>
      ))}
    </div>
  );
};
