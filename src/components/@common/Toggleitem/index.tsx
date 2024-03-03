'use client';
import React, { useEffect, useState } from 'react';
import { VariableIcon } from '../VariableIcon';
export type ToggleItemProps = {};
// export const questionCategory: QuestionCategory[] = [
//   { category: 'fe', subcategory: ['react', 'vuejs', 'nextjs'] },
//   { category: 'be', subcategory: ['db', 'spring_framework', 'msa'] },
//   { category: 'language', subcategory: ['javascript', 'typescript'] },
//   { category: 'cs', subcategory: ['docker', 'operatingSystem', 'computerArchitecture'] },
//   { category: 'mobile', subcategory: ['aos', 'ios', 'flutter'] },
//   { category: 'etc', subcategory: ['git'] },
// ];
const data = [
  {
    id: 'fe',
    value: '프론트엔드',
    isOpen: false,
    children: [
      { id: 'react', value: '리액트' },
      { id: 'vuejs', value: 'VUE' },
      { id: 'nextjs', value: 'NEXT.js' },
    ],
  },
  {
    id: 'backend',
    isOpen: false,
    value: '백엔드',
    children: [
      { id: 'html', value: 'HTML' },
      { id: 'css', value: 'CSS' },
      { id: 'javascript', value: 'JAVASCRIPT' },
    ],
  },
  {
    id: 'language',
    isOpen: false,
    value: '언어',
    children: [
      { id: 'java', value: 'JAVA' },
      { id: 'css', value: 'CSS' },
      { id: 'javascript', value: 'JAVASCRIPT' },
    ],
  },
  {
    id: 'ect',
    isOpen: false,
    value: '기타',
    children: [
      { id: 'html', value: 'HTML' },
      { id: 'css', value: 'CSS' },
      { id: 'javascript', value: 'JAVASCRIPT' },
    ],
  },
];
export const ToggleItem = ({}: ToggleItemProps) => {
  const [items, setItems] = useState(data);

  const onClickOpen = (clickedItem: any) => {
    console.log(clickedItem.id);
    const updatedItems = items.map(item => {
      console.log(item.id === clickedItem.id);
      if (item.id === clickedItem.id) {
        return { ...item, isOpen: !item.isOpen };
      }
      return item;
    });
    setItems(updatedItems);
  };

  useEffect(() => {
    console.log(items);
  }, [items]);
  return (
    <div>
      {items.map(item => (
        <div key={item.id} className={`toggle-item ${item.isOpen ? 'open' : ''}`}>
          <button className="flex items-center" onClick={() => onClickOpen(item)}>
            <VariableIcon
              name="leftArrow"
              size={14}
              className={`${item.isOpen ? 'rotate-90' : ''}`}
            />
            <div>{item.value}</div>
          </button>
          <div className="ml-10">
            {item.isOpen &&
              item.children?.map(childItem => (
                <div key={childItem.id}>
                  <button> {childItem.value}</button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
