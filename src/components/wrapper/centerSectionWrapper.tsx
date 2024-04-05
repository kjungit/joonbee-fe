import React from 'react';

export const CenterSectionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center h-full">
      <div className="w-[800px] h-full">{children}</div>
    </div>
  );
};
