import React from 'react';

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="origin-h w-full flex justify-center items-center bg-main-primary ">
      <section className="px-5 max-w-[1024px] w-full h-full max-h-[650px] flex items-center justify-center">
        {children}
      </section>
    </div>
  );
}
