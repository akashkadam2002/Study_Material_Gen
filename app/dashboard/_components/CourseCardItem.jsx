import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CourseCardItem = ({ course }) => {
    return (
        <div className='border rounded-lg shadow-lg p-5'>
            <div>
                <div className='flex justify-between items-center'>
                    <Image src={'/know.jpg'} alt='other' width={50} height={50} />
                    <h2 className='text-[10px] p-1 px-2 rounded-full bg-blue-600 text-white' >10 Feb 2025</h2>
                </div>
                <h2 className='mt-3 line-clamp-1 font-medium text-lg'>{course?.topic}</h2>
                <p className='text-sm line-clamp-2 text-grey-500 mt-2'>{course?.courseLayout?.description}</p>

                <div className='mt-4'>
                    <Progress value={0} />
                </div>
                <div className='mt-3 flex justify-end'>
                    {course?.status === "Generating" ?
                        <h2 className='text-sm p-1 px-2 flex gap-3 items-center rounded-full bg-gray-400 text-white'>
                            <RefreshCcw className='h-5 w-5 animate-spin' />
                            Generating...</h2>
                        :
                       <Link href={`/course/${course?.courseId}`}><Button>View</Button></Link>}
                </div>
            </div>
        </div>
    );
}

export default CourseCardItem;
