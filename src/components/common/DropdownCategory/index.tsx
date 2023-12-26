import Dropdown from '@/components/ui/Dropdown';
import React, { useEffect, useState } from 'react';
import { questionCategory } from '@/constants/category';
import { CategoryName, SubcategoryName } from '@/types/question';
import { useRecoilState } from 'recoil';
import { selectedCategoryAtom, selectedSubcategoryAtom } from '@/recoil/selectedCategory/atom';

type DropdownCategoryProps = {
  color?: 'white' | 'darkNavy';
};
export default function DropdownCategory({ color = 'white' }: DropdownCategoryProps) {
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryAtom);
  const [selectedSubcategory, setSelectedSubcategory] = useRecoilState(selectedSubcategoryAtom);
  const [isDisabled, setIsDisabled] = useState(false);

  const [subcategoryName, setSubcateogyName] = useState<SubcategoryName[]>([]);
  const categoryNames = questionCategory.map(item => item.category);

  useEffect(() => {
    selectedCategory === '' ? setIsDisabled(true) : setIsDisabled(false);

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
        title=""
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
        isDisabled={isDisabled}
      />
    </div>
  );
}
