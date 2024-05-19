import { CategoryName, ChildrenProps, SubcategoryName, ToggleItemProps } from '@/types';
import { ToggleItem } from '../@common/toggleItem';
import { toggleNavbarQuestionList, useCategoryImageList } from '@/constants/toggleNavbarItem';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter, useSearchParams } from 'next/navigation';
import { mySelectQuestionCategoryState } from '@/recoils/home/question/mySelectQuestionCategory/atom';
import Image from 'next/image';
import { GoCodeReview } from 'react-icons/go';

export const MyQuestionMenu = () => {
  const [items, setItems] = useState<ToggleItemProps[]>(toggleNavbarQuestionList);
  const [selectQuestionCategory, setSelectQuestionCategory] = useRecoilState(
    mySelectQuestionCategoryState,
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const fieldParams = searchParams.get('Qfield') as CategoryName;
  const subFieldParams = searchParams.get('subField') as SubcategoryName;
  const categoryParams = searchParams.get('category');

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
    <div className="p-4 md:mt-0 mt-10">
      {items.map(item => (
        <div key={item.id} className={`toggle-item ${fieldParams === item.id && 'font-bold'}`}>
          <ToggleItem
            item={item}
            onClickOpen={() => {
              if (item.id === fieldParams) return;
              handleClickOpen(item);
              router.push(
                `my/?category=${categoryParams}&Qfield=${item.id}&subField=${item.children[0].id}`,
              );
            }}
            className={`${
              fieldParams === item.id &&
              'font-bold bg-blue-primary hover:text-white hover:bg-blue-primary text-white '
            }`}
          />
          <div className="font-normal flex flex-col text-start w-full gap-1 text-sm px-1 py-1">
            {fieldParams === item.id &&
              item.children?.map(childItem => (
                <button
                  key={childItem.id}
                  onClick={() => {
                    handleClickChild(childItem);
                    router.push(
                      `my/?category=${categoryParams}&Qfield=${item.id}&subField=${childItem.id}`,
                    );
                  }}
                  className={`flex items-center hover:bg-blue-light py-1 rounded-md
                  ${childItem.id === subFieldParams && 'bg-blue-light'}
                  `}>
                  <div
                    className={`${
                      subFieldParams === childItem.id && 'font-bold'
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
};
