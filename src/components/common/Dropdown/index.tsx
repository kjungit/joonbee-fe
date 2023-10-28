import { categoryState, selectedValueState } from '../../../recoil/select/atom';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Item from './Item';
import List from './List';

type DropdownProps = {
  size: 'sm' | 'md';
};

const Dropdown = ({ size = 'sm' }: DropdownProps) => {
  const categoryData = useRecoilValue(categoryState);
  const categories = Object.keys(categoryData).map(key => key);
  const { selectedCategory } = useRecoilValue(selectedValueState);

  //@ts-ignore
  const subcategories: string[] = categoryData[selectedCategory]?.subcategories || [];

  return (
    <>
      <Dropdown.List name="category" size={size}>
        <Dropdown.Item size={size}>카테고리</Dropdown.Item>
        {categories.map(category => (
          <Dropdown.Item size={size} key={category}>
            {category}
          </Dropdown.Item>
        ))}
      </Dropdown.List>
      {selectedCategory !== '카테고리' && (
        <Dropdown.List name="subcategory" size={size}>
          <Dropdown.Item size={size}>카테고리</Dropdown.Item>
          {subcategories.map(subcategory => (
            <Dropdown.Item size={size} key={subcategory}>
              {subcategory}
            </Dropdown.Item>
          ))}
        </Dropdown.List>
      )}
    </>
  );
};
Dropdown.Item = Item;
Dropdown.List = List;

export default Dropdown;
