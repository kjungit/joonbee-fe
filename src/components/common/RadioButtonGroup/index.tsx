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
}

export const RadioButtonGroup = ({ data, size = 'md', onClickFunc }: RadioButtonGroupProps) => {
  const [checkedRadio, setCheckedRadio] = useState(data[0].id);

  const sizeStyles = {
    sm: 'w-[100px] h-[40px]',
    md: 'w-[110px] h-[60px]',
    lg: 'w-[300px] h-[60px]',
  };

  useEffect(() => {
    setCheckedRadio(1);
    console.log(checkedRadio);
  }, []);

  return (
    <div className="flex gap-4">
      {data.map(item => (
        <div key={item.id}>
          <label htmlFor={`default-radio-${item.id}`} className="block">
            <input
              id={`default-radio-${item.id}`}
              type="radio"
              value={'i.text'}
              name="default-radio"
              className="w-4 h-4 hidden peer"
              checked={checkedRadio === item.id}
            />
            <div
              className={`peer-checked:bg-main-primary peer-checked:text-white bg-white text-main-primary   shadow-md flex items-center justify-center font-bold text-lg rounded-lg ${
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
