import { useRouter, useSearchParams } from 'next/navigation';
import { toggleNavbarIntreviewList } from '@/constants/toggleNavbarItem';
import { VariableIcon } from '../@common/variableIcon';
import { useQueryClient } from '@tanstack/react-query';

export const InterviewMenu = () => {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const router = useRouter();
  const fieldParams = searchParams.get('Ifield');
  const categoryParams = searchParams.get('category');
  const sortParams = (searchParams.get('sort') as 'latest') || 'like';

  return (
    <div className="p-4 h-full flex flex-col gap-2 md:mt-0 mt-10">
      {toggleNavbarIntreviewList.map(item => (
        <button
          key={item.id}
          className={`flex items-center gap-2 px-2 ${
            fieldParams === item.id &&
            'font-bold bg-blue-primary hover:text-white hover:bg-blue-primary text-white '
          }
            hover:bg-blue-light py-2 rounded-md hover:font-bold`}
          onClick={() => {
            queryClient.removeQueries({ queryKey: ['getInterview'] });
            router.replace(`/?category=${categoryParams}&Ifield=${item.id}&sort=${sortParams}`);
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
