import { useState } from 'react';
import { VariableIcon } from '../variableIcon/variableIcon';
import { Text } from '../text/text';

export const ListAccordion = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className="bg-gray-200 px-4 py-2 flex cursor-pointer items-center"
        onClick={handleToggle}>
        <VariableIcon name="tringleRight" size={16} className={`${isOpen && 'rotate-90'}`} />
      </div>
    </div>
  );
};
