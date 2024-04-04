import React from 'react';

export const CenterSectionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center">
      <div className="w-[800px]">{children}</div>
    </div>
  );
};
