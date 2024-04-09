import { useState } from 'react';
import { VariableIcon } from '../variableIcon';
import { Text } from '../text';

export const Accordion = ({
  title,
  children,
  onClick,
  isBorder = false,
  isMain = false,
  isOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  onClick?: () => void;
  isBorder?: boolean;
  isMain?: boolean;
  isOpen?: boolean;
}) => {
  const [isOpenState, setIsOpenState] = useState(isOpen);

  const handleToggle = () => {
    setIsOpenState(!isOpenState);
  };

  return (
    <div className={`${isBorder && 'border-b-[1px]'} pb-2 border-gray-normal`}>
      <div
        className={`${isMain ? 'pl-4 py-2 ' : 'pl-10'} flex cursor-pointer items-start`}
        onClick={onClick || handleToggle}>
        <VariableIcon
          name="triangleRight"
          size={16}
          className={`${(isOpen || isOpenState) && 'rotate-90'} min-w-[18px] mt-[6px]`}
        />
        <Text size="lg" weight="md" className="p-1">
          {title}
        </Text>
      </div>
      {(isOpen || isOpenState) && <>{children}</>}
    </div>
  );
};
