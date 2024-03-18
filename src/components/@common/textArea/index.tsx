import React, { TextareaHTMLAttributes } from 'react';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  readOnly?: boolean;
}

export default function TextArea({ readOnly = true, className = '', ...props }: TextAreaProps) {
  const readOnlyStyles = readOnly ? 'bg-[#F8F9Fa] text-gray-disabled' : 'focus:border-blue-light';

  return (
    <textarea
      rows={8}
      cols={80}
      readOnly={readOnly}
      className={`${readOnlyStyles} py-2 px-3 rounded-md border border-gray-normal ${className}`}
      {...props}
    />
  );
}
