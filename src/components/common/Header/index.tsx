import React from 'react';
import Alarm from '../Alarm';
import { Avatar } from '@/components/ui/Avartar';
import { alarmData } from '@/constants/alarm';
import LogoText from '@/components/ui/LogoText';

const Header = () => {
  const data = alarmData;

  return (
    <header className="w-screen h-[64px] shadow-sm flex justify-center items-center bg-white">
      <div className="min-w-[1200px] flex justify-between items-center">
        <LogoText/>
        <div className="flex gap-4">
          <Alarm data={data} />
          <Avatar size="md" thunbnail="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
