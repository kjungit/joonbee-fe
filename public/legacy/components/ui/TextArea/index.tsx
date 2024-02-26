'use client';

type TextareaProps = {
  isDisabled?: boolean;
  inputValue?: string;
  isVoice?: boolean;
  isRead?: boolean;
  size?: 'md' | 'auto';
  setInputValue?: (value: string) => void;
};

export const TextArea = ({
  isDisabled = false,
  inputValue = '',
  setInputValue,
  isRead = true,
  size = 'md',
  isVoice = false,
}: TextareaProps) => {
  const baseStyles = `text-[16px]  border-gray-normal ${
    isDisabled ? 'text-gray-disabled' : 'text-main-primary'
  } p-5 font-bold shadow-md rounded-xl`;

  const sizeStyles = {
    md: 'h-[360px] w-[440px] text-4',
    auto: 'w-full h-auto',
  };
  const textAreaStyles = `
  ${baseStyles} ${sizeStyles[size]} 
  `;

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setInputValue) {
      setInputValue(event.target.value);
    }
  };

  return (
    <div className="relative">
      <textarea
        readOnly={isRead}
        minLength={10}
        rows={10}
        cols={20}
        className={textAreaStyles}
        placeholder="질문을 작성해주세요."
        disabled={isDisabled}
        value={inputValue}
        onChange={onChange}></textarea>
      {isVoice && <div className="voice"></div>}
    </div>
  );
};
