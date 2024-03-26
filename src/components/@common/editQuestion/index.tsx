'use client';
import React, { useState, useEffect } from 'react';
import { Text } from '../text';
import { VariableIcon } from '../variableIcon';

export const EditQuestion = ({ title, question }: { title: string; question: string }) => {
  const [isOpenState, setIsOpenState] = useState(true);
  const [textareaContent, setTextareaContent] = useState(question);
  const [textareaHeight, setTextareaHeight] = useState('auto');

  const handleToggle = () => {
    setIsOpenState(!isOpenState);
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    const content = event.target.value.replace(/\s+/g, ' ');
    setTextareaContent(content);
  };

  useEffect(() => {
    const textarea = document.getElementById('myTextarea');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
      setTextareaHeight(textarea.style.height);
    }
  }, [textareaContent]);

  return (
    <div className="w-[800px]">
      <div className={` flex cursor-pointer items-center`} onClick={handleToggle}>
        <VariableIcon name="triangleRight" size={16} className={`${isOpenState && 'rotate-90'}`} />
        <Text size="lg" weight="md" className="p-1">
          {title}
        </Text>
      </div>
      {isOpenState && (
        <div className="pl-4 flex items-center">
          <textarea
            id="myTextarea"
            className="w-full resize-none border-none"
            style={{ height: textareaHeight }}
            onBlur={handleBlur}
            value={textareaContent}
            onChange={e => setTextareaContent(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};
