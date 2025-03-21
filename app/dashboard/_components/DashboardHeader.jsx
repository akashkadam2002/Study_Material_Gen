import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';

const DashboardHeader = () => {
  return (
    <div className='p-10 shadow-lg flex justify-end'>
       
      <UserButton />
    </div>
  );
}

export default DashboardHeader;
