import React, { TextareaHTMLAttributes } from 'react';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  readOnly?: boolean;
  inputValue?: string;
  setInputValue?: (value: string) => void;
}

export default function TextArea({
  readOnly = true,
  className = '',
  inputValue = '',
  setInputValue,
  ...props
}: TextAreaProps) {
  const readOnlyStyles = readOnly ? 'bg-[#F8F9Fa]' : 'focus:border-blue-light ';

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setInputValue) {
      setInputValue(event.target.value);
    }
  };

  return (
    <textarea
      value={inputValue}
      readOnly={readOnly}
      onChange={onChange}
      className={`${readOnlyStyles} resize-none py-2 px-3 rounded-md border border-gray-normal text-[14px] text-black w-full min-h-[140px] h-full ${className}`}
      {...props}
    />
  );
}
