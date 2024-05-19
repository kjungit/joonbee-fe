import { Text } from '@/components/@common/text';
import { VariableIcon } from '@/components/@common/variableIcon';
import { MainCategory } from '@/constants/category';
import { MyMenuInterviewItem } from '@/types';

interface MenuInterviewItemProps {
  className: string;
  item: MyMenuInterviewItem;
  onClick: (item: MyMenuInterviewItem) => void;
}

export const MenuInterviewItem = ({ className, item, onClick }: MenuInterviewItemProps) => {
  return (
    <li
      className={`flex h-[64px] p-2 cursor-pointer hover:bg-blue-light ${className}`}
      onClick={() => onClick(item)}>
      <div className="flex flex-col w-full justify-between">
        <div className="flex items-center gap-1">
          <VariableIcon name="calendar" size={14} />
          <Text>2024.02.22 14:22</Text>
        </div>
        <div className="flex items-center gap-2 justify-between w-full">
          <div className="flex items-center gap-1">
            <VariableIcon name="leftArrow" size={10} />
            <Text size="lg" weight="lg">
              {MainCategory[item.categoryName]}
            </Text>
          </div>
          <div className="flex items-center justify-start w-[90px]">
            <VariableIcon name="document" size={18} />
            <Text size="lg" weight="md" className="p-1">
              질문 {item.questionCount}개
            </Text>
          </div>
        </div>
      </div>
    </li>
  );
};
