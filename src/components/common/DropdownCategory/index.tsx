import Dropdown from '@/components/ui/Dropdown';
import React, { useEffect, useState } from 'react';
import { questionCategory } from '@/constants/category';
import { CategoryName, SubcategoryName } from '@/types/question';
import { useRecoilState } from 'recoil';
import { selectedCategoryState, selectedSubcategoryState } from '@/recoil/select/atom';

type DropdownCategoryProps = {
  color?: 'white' | 'darkNavy';
};
export default function DropdownCategory({ color = 'white' }: DropdownCategoryProps) {
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);
  const [selectedSubcategory, setSelectedSubcategory] = useRecoilState(selectedSubcategoryState);

  const [subcategoryName, setSubcateogyName] = useState<SubcategoryName[]>([]);
  const categoryNames = questionCategory.map(item => item.category);

  useEffect(() => {
    setSubcateogyName(
      questionCategory.find(item => item.category === selectedCategory)?.subcategory || [],
    );
  }, [selectedCategory]);

  useEffect(() => {
    setSelectedSubcategory('세부 카테고리');
  }, [selectedCategory]);

  const handleCategorySelect: (item: CategoryName) => void = item => {
    setSelectedCategory(item);
  };

  return (
    <div className="flex gap-5">
      <Dropdown
        data={categoryNames}
        selected={selectedCategory}
        onSelect={handleCategorySelect}
        color={color}
      />
      <Dropdown
        data={subcategoryName}
        selected={selectedSubcategory}
        onSelect={setSelectedSubcategory}
        title="세부 카테고리"
        color={color}
      />
    </div>
  );
}
