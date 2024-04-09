import { CategoryName, ChildrenProps, SubcategoryName, ToggleItemProps } from '@/types';
import { toggleNavbarQuestionList } from '@/constants/toggleNavbarItem';
import { useState } from 'react';
import { ToggleItem } from '../@common/toggleItem';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { mySelectQuestionCategoryState } from '@/recoils/home/question/mySelectQuestionCategory/atom';

export default function ChoiceSettingMenu() {
  const [items, setItems] = useState<ToggleItemProps[]>(toggleNavbarQuestionList);

  const [selectQuestionCategory, setSelectQuestionCategory] = useRecoilState(
    mySelectQuestionCategoryState,
  );

  const handleClickChild = (childItem: ChildrenProps) => {
    setSelectQuestionCategory({
      ...selectQuestionCategory,
      subCategory: childItem.id,
    });
  };

  const handleClickOpen = (clickedItem: ToggleItemProps) => {
    const foundItem = items.find(item => item.id === clickedItem.id);

    if (foundItem && foundItem.isOpen) {
      return;
    }
    const updatedItems = items.map(item => {
      if (item.id === clickedItem.id) {
        return { ...item, isOpen: !item.isOpen };
      }
      return { ...item, isOpen: false };
    });
    setSelectQuestionCategory({
      category: clickedItem.id,
      subCategory: clickedItem.children[0].id,
    });
    setItems(updatedItems);
  };

  return (
    <div className="p-4">
      {items.map(item => (
        <div
          key={item.id}
          className={`toggle-item ${selectQuestionCategory.category === item.id && 'font-bold '}`}>
          <ToggleItem
            item={item}
            onClickOpen={() => {
              if (item.id === selectQuestionCategory.category) return;
              handleClickOpen(item);
            }}
          />
          <div className="font-normal flex flex-col text-start w-full gap-1 text-sm px-1 py-1">
            {selectQuestionCategory.category === item.id &&
              item.children?.map(childItem => (
                <button
                  className="flex items-center"
                  key={childItem.id}
                  onClick={() => {
                    handleClickChild(childItem);
                  }}>
                  <div
                    className={`${
                      selectQuestionCategory.subCategory === childItem.id && 'font-bold'
                    } flex pl-[50px]`}>
                    {childItem.value}
                  </div>
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
