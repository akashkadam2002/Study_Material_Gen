import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

const QuizCardItem = ({ quiz, userSelectedoption }) => {
    const [selectedOption, setselectedOption] = useState();
    return quiz&&(
        <div className='mt-10 p-5'>
            <h2 className='font-medium text-3xl text-center'>{quiz?.question}</h2>

            <div className='grid grid-cols-2 gap-5 mt-6'>
                {quiz?.options.map((option, index) => (
                    <h2
                    onClick={()=>{setselectedOption(option);
                        userSelectedoption(option);
                    }}
                     key={index} variant='outline' className={`w-full rounded-full border text-center p-3 text-lg hover:bg-gray-300 cursor-pointer ${selectedOption==option&& 'bg-primary text-white hover:bg-primary'}`}>{option}</h2>
                ))}
            </div>
        </div>
    );
}

export default QuizCardItem;
