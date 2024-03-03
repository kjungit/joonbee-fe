import React from 'react';
import ThemeSwitch from '../themeSwitch/themeSwitch';

export default function Header() {
  return (
    <header className="w-screen sticky top-0 z-50 h-[60px] border-b dark:border-b dark:border-gray-600 flex justify-center items-center ">
      <ThemeSwitch />
    </header>
  );
}
