'use client';
import React, { useEffect, useState } from 'react';
import { ToggleItem } from '../toggleItem/toggleItem';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectMenuState } from '@/recoils/home/selectMenu/atom';
import { Text } from '../text/text';
import { useRouter, useSearchParams } from 'next/navigation';
import { toggleNavbarQuestionList } from '@/constants/toggleNavbarItem';
import { InterviewMenu } from '@/components/navbar/interviewMenu';
import { CategoryName, ChildrenProps, SubcategoryName, ToggleItemProps } from '@/types';
import { selectQuestionCategoryState } from '@/recoils/home/question/selectQuestionCategory/atom';

export const ToggleItemList = () => {
  const [items, setItems] = useState<ToggleItemProps[]>(toggleNavbarQuestionList);
  const [selectQuestionCategory, setSelectQuestionCategory] = useRecoilState(
    selectQuestionCategoryState,
  );

  const selectMenu = useRecoilValue(selectMenuState);
  const searchParams = useSearchParams();
  const router = useRouter();
  const fieldParams = searchParams.get('Qfield') as CategoryName;
  const subFieldParams = searchParams.get('subField') as SubcategoryName;
  const categoryParams = searchParams.get('category');

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

  const handleClickChild = (childItem: ChildrenProps) => {
    setSelectQuestionCategory({
      ...selectQuestionCategory,
      subCategory: childItem.id,
    });
  };

  useEffect(() => {
    setSelectQuestionCategory({
      category: fieldParams || 'fe',
      subCategory: subFieldParams || 'react',
    });
  }, [selectMenu]);

  useEffect(() => {
    console.log(fieldParams, subFieldParams);
  }, []);

  return (
    <div className="p-4">
      <div>
        {categoryParams === 'interview' ? (
          <InterviewMenu />
        ) : (
          <div>
            <Text size="xl" weight="lg">
              질문 보기
            </Text>
            {items.map(item => (
              <div
                key={item.id}
                className={`toggle-item ${fieldParams === item.id && 'font-bold'}`}>
                <ToggleItem
                  item={item}
                  onClickOpen={() => {
                    if (item.id === fieldParams) return;
                    handleClickOpen(item);
                    router.push(
                      `/?category=${categoryParams}&Qfield=${item.id}&subField=${item.children[0].id}`,
                    );
                  }}
                />
                <div className="font-normal flex flex-col text-start w-full gap-2">
                  {fieldParams === item.id &&
                    item.children?.map(childItem => (
                      <button
                        key={childItem.id}
                        onClick={() => {
                          handleClickChild(childItem);
                          router.push(
                            `/?category=${categoryParams}&Qfield=${item.id}&subField=${childItem.id}`,
                          );
                        }}>
                        <div className={`${subFieldParams === childItem.id && 'font-bold'}`}>
                          {childItem.value}
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
