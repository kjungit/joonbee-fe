import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { mainCategoryList, questionCategory } from '@/constants/category';
import { CategoryName, SubcategoryName } from '@/types/question';
import { ButtonColors } from '../button/button';
import Dropdown from '../dropdown/dropdown';

interface DropdownCategoryProps {
  color?: ButtonColors;
  size?: 'sm' | 'md';
  selectedCategory: string;
  selectedSubcategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  setSelectedSubcategory: Dispatch<SetStateAction<string>>;
  callback?: () => void;
}
export default function CategoryDropdown({
  color = 'white',
  size = 'sm',
  selectedCategory,
  selectedSubcategory,
  setSelectedCategory,
  setSelectedSubcategory,
  callback,
}: DropdownCategoryProps) {
  const [selectedSubcategoryList, setSelectedSubcategoryList] = useState<string[]>([]);

  const [disabled, setIsDisabled] = useState(false);

  useEffect(() => {
    selectedCategory === '' ? setIsDisabled(true) : setIsDisabled(false);

    // setSelectedSubcategoryList(
    //   mainCategoryList.find(item => item === selectedCategory)?.subcategory || [],
    // );
  }, [selectedCategory]);

  useEffect(() => {
    const changedSubcategoryList =
      questionCategory.find(item => item.category === selectedCategory)?.subcategory || [];
    console.log('changedSubcategoryList', changedSubcategoryList);

    setSelectedSubcategoryList(changedSubcategoryList);

    if (callback) callback();
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSubcategoryList.length) setSelectedSubcategory(selectedSubcategoryList[0]);
  }, [selectedSubcategoryList]);

  const handleCategorySelect = (item: string) => {
    setSelectedCategory(item);
  };

  const handleSubCategorySelect = (item: string) => {
    setSelectedSubcategory(item);
  };

  return (
    <div className="flex gap-5 relative z-10">
      <Dropdown
        size={size}
        data={mainCategoryList}
        selected={selectedCategory}
        onSelect={handleCategorySelect}
        color={color}
      />
      <Dropdown
        size={size}
        data={selectedSubcategoryList}
        selected={selectedSubcategory}
        onSelect={handleSubCategorySelect}
        color={color}
        disabled={disabled}
      />
    </div>
  );
}
