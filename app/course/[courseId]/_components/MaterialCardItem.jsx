import { Button } from '@/components/ui/button';
import axios from 'axios';
import { RefreshCcw, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'sonner';

const MaterialCardItem = ({ item, studyTypeContent, course, refreshData }) => {

  const [loading, setLoading] = useState(false);

  const GenerateContent = async () => {
    toast('Generating Your Content...');
    setLoading(true);
  
    let chapters = '';
    course?.courseLayout.chapters.forEach((chapter) => {
      chapters = (chapter.chapter_title || chapter.chapterTitle) + ',' + chapters;
    });
  
    await axios.post('/api/study-type-content', {
      courseId: course?.courseId,
      type: item.name,
      chapters: chapters,
    });
  
    setLoading(false);
    await refreshData();  // Ensure fresh data is fetched
    toast("Your Content is Ready to View");
  };
  
  return (
    <Link href={`/course/${course?.courseId + item.path}`}>
      <div className={`border shadow-lg rounded-lg p-5 flex flex-col items-center 
  ${!studyTypeContent?.[item.type]?.length && 'grayscale'}`}>

  {!studyTypeContent?.[item.type]?.length ? (
    <h2 className='p-1 px-2 bg-gray-500 text-white rounded-full text-[10px] mb-3'>Generate</h2>
  ) : (
    <h2 className='p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-3'>Ready</h2>
  )}

  <Image src={item.icon} alt={item.name} width={50} height={50} />
  <h2 className='font-medium mt-3'>{item.name}</h2>
  <p className='text-gray-500 text-sm text-center'>{item.desc}</p>

  {!studyTypeContent?.[item.type]?.length ? (
    <Button className='mt-3 w-full border shadow-lg' variant='outline' onClick={GenerateContent}>
      {loading && <RefreshCcw className='animate-spin' />} Generate
    </Button>
  ) : (
    <Button className='mt-3 w-full border shadow-lg' variant='outline'>View</Button>
  )}
</div>

    </Link>
  );
}

export default MaterialCardItem;
