import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

const SelectOption = ({selectStudyType}) => {
  const Options = [
    {
      name: "Exam",
      icon: '/exam1.png'
    },
    {
      name: "Job Interview",
      icon: '/job.jpg'
    },
    {
      name: "Practice",
      icon: '/exam.png'
    },
    {
      name: "Coding Preparation",
      icon: '/code1.png'
    },
    {
      name: "Other",
      icon: '/know.jpg'
    },
  ]

  const [selectedOption, setSelectedOption] = useState();
  return (
    <div>
      <h2 className='text-center mb-3 text-lg'>For Which you want to create your personal study material?</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7 mt-5'>
        {
          Options.map((options, index) => (
            <div key={index} className={`p-4 flex flex-col items-center justify-center border rounded-xl shadow-lg cursor-pointer hover:border-primary ${options?.name === selectedOption && 'border-primary'}`} onClick={() => {setSelectedOption(options.name); selectStudyType(options.name)}} >
              <Image src={options.icon} alt={options.name} width={50} height={50} />
              <h2 className='text-sm mt-3'>{options.name}</h2>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default SelectOption;
