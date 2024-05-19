import { ChildrenProps, ToggleItemProps } from '@/types';
import { toggleNavbarQuestionList, useCategoryImageList } from '@/constants/toggleNavbarItem';
import { useState } from 'react';
import { ToggleItem } from '../@common/toggleItem';
import { useRecoilState } from 'recoil';
import { mySelectQuestionCategoryState } from '@/recoils/home/question/mySelectQuestionCategory/atom';
import Image from 'next/image';
import { GoCodeReview } from 'react-icons/go';

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
            className={`${
              selectQuestionCategory.category === item.id &&
              'font-bold bg-blue-primary hover:text-white hover:bg-blue-primary text-white '
            }`}
          />
          <div className="font-normal flex flex-col text-start w-full gap-1 text-sm px-1 py-1">
            {selectQuestionCategory.category === item.id &&
              item.children?.map(childItem => (
                <button
                  className={`flex items-center hover:bg-blue-light py-1 rounded-md
                ${childItem.id === selectQuestionCategory.subCategory && 'bg-blue-light'}
                `}
                  key={childItem.id}
                  onClick={() => {
                    handleClickChild(childItem);
                  }}>
                  <div
                    className={`${
                      selectQuestionCategory.subCategory === childItem.id && 'font-bold'
                    } flex pl-[50px] items-center gap-2`}>
                    {useCategoryImageList.includes(childItem.id) ? (
                      <Image
                        src={`/icons/logo/${childItem.id}.png`}
                        alt="react"
                        width={30}
                        height={30}
                      />
                    ) : (
                      <div className="w-[30px] h-[30px] flex items-center justify-center">
                        <GoCodeReview className="w-[24px] h-[24px] text-gray-light" />
                      </div>
                    )}
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
