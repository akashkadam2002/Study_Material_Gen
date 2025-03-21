import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import React from 'react';

const CourseIntroCard = ({ course }) => {

    return (
        <div className='flex items-center gap-5 p-10 border shadow-lg rounded-lg'>
            <Image src={'/know.jpg'} alt='other' height={70} width={70} />
            <div>
                <h2 className='font-bold text-2xl'>{course?.courseLayout?.course_title}</h2>
                <p>{course?.courseLayout?.description}</p>
                <Progress className='mt-4' />
                <h2 className='mt-4 text-lg text-primary'>Total Chapters: {course?.courseLayout?.chapters.length}</h2>
            </div>
        </div>
    );
}

export default CourseIntroCard;
