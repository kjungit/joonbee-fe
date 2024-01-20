import React from 'react';

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex justify-center items-center bg-main-primary ">
      <section className="px-5 max-w-[1024px] w-full h-full max-h-[580px] ">{children}</section>
    </div>
  );
}
