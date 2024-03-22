import { useState } from 'react';
import { VariableIcon } from '../variableIcon';
import { Text } from '../text';

export const Accordion = ({
  title,
  children,
  onClick,
  isBorder = false,
  isMain = false,
}: {
  title: string;
  children: React.ReactNode;
  onClick?: () => void;
  isBorder?: boolean;
  isMain?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${isBorder && 'border-b-[1px]'} pb-2 border-gray-normal`}>
      <div
        className={`${isMain ? 'pl-4 py-2 ' : 'pl-10'} flex cursor-pointer items-center`}
        onClick={onClick || handleToggle}>
        <VariableIcon name="triangleRight" size={16} className={`${isOpen && 'rotate-90'}`} />
        <Text size="lg" weight="md" className="p-1">
          {title}
        </Text>
      </div>
      {isOpen && <>{children}</>}
    </div>
  );
};
