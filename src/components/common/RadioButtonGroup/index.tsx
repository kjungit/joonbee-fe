'use client';
import React, { useEffect, useState } from 'react';

export type ItemProps = {
  id: number;
  text: string;
};

export interface RadioButtonGroupProps {
  data: ItemProps[];
  size: 'sm' | 'md' | 'lg';
  onClickFunc: (param: ItemProps) => void;
  groupName: string;
  defaultId: number;
  color?: 'navy' | 'blue';
}

export const RadioButtonGroup = ({
  data,
  size = 'md',
  onClickFunc,
  groupName,
  defaultId,
  color = 'navy',
}: RadioButtonGroupProps) => {
  const [checkedRadio, setCheckedRadio] = useState(defaultId);

  const sizeStyles = {
    sm: 'w-[100px] h-[40px] text-lg',
    md: 'w-[130px] h-[60px] text-2xl',
    lg: 'w-[300px] h-[60px]',
  };

  const colorStyles = {
    navy: 'peer-checked:bg-main-primary peer-checked:text-white bg-white text-main-primary',
    blue: 'peer-checked:bg-blue-primary peer-checked:text-white bg-white text-main-primary',
  };

  return (
    <div className="flex gap-4">
      {data.map(item => (
        <div key={item.id}>
          <label htmlFor={`${groupName}-${item.id}`} className="block">
            <input
              id={`${groupName}-${item.id}`}
              type="radio"
              value={item.text}
              name={groupName} // 여기서 groupName을 name 속성으로 사용
              className="w-4 h-4 hidden peer"
              checked={checkedRadio === item.id}
            />
            <div
              className={` ${
                colorStyles[color]
              }  shadow-md flex items-center justify-center font-bold rounded-lg ${
                checkedRadio === item.id
              } ${sizeStyles[size]}`}
              onClick={() => {
                if (item.id !== checkedRadio) {
                  setCheckedRadio(item.id);
                  onClickFunc(item);
                }
              }}>
              {item.text}
            </div>
          </label>
        </div>
      ))}
    </div>
  );
};
