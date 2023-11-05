import React from 'react';
import Alarm from '../Alarm';
import { Avatar } from '../Avartar';
import Logo from '../Logo';

type HeaderProps = {
  data: any;
};

const Header = ({ data }: HeaderProps) => {
  return (
    <header className="w-screen h-[64px] shadow-sm flex justify-center items-center bg-white">
      <div className="min-w-[1240px] flex justify-between px-8 items-center">
        <div className="flex gap-4 items-center">
          <Logo />
          <h2 className="text-blue-secondary text-[24px] font-bold">JOONBEE</h2>
        </div>
        <div className="flex gap-4">
          <Alarm data={data} />
          <Avatar size="md" thunbnail="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
