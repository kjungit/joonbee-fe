import { useState } from 'react';
import { VariableIcon } from '../variableIcon/variableIcon';
import { Text } from '../text/text';

export const Accordion = ({ title, description }: { title: string; description: string }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b-[1px] pb-4 border-gray-normal">
      <div className="px-4 py-2 flex cursor-pointer items-center" onClick={handleToggle}>
        <VariableIcon name="tringleRight" size={16} className={`${isOpen && 'rotate-90'}`} />
        <Text size="lg" weight="md" className="p-1">
          {title}
        </Text>
      </div>
      {isOpen && (
        <Text size="lg" weight="sm" className="px-11">
          {description}
        </Text>
      )}
    </div>
  );
};
