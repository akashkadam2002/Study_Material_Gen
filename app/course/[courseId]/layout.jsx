import DashboardHeader from '@/app/dashboard/_components/DashboardHeader';
import Image from 'next/image';
import React from 'react';

const CourseViewLayout = ({ children }) => {
    return (
        <div>
            <div className="flex items-center justify-between p-4">
                <Image src={'/logo.webp'} alt='logo' width={120} height={50} />

                <DashboardHeader />
            </div>


            <div className='mx-10 md:mx-36 lg:mx-60 mt-10'>
                {children}
            </div>
        </div>
    );
}

export default CourseViewLayout;
