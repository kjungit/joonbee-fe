import React from 'react';

export const CenterSectionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-[800px]">{children}</div>
    </div>
  );
};
