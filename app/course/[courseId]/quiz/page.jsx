'use client'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import StepProgress from '../_components/StepProgress';
import QuizCardItem from './_components/QuizCardItem';

const Quiz = () => {
    const [quizData, setQuizData] = useState(null);
    const [quiz, setQuiz] = useState([]); // ✅ Ensure quiz is initialized as an empty array
    const [stepCount, setStepCount] = useState(0);
    const { courseId } = useParams();
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
    const [correctAns, setCorrectAns] = useState(null);
    const router = useRouter(); // ✅ Use router for navigation

    useEffect(() => {
        GetQuiz();
    }, []);

    const GetQuiz = async () => {
        try {
            const result = await axios.post('/api/study-type', {
                courseId: courseId,
                studyType: 'Quiz'
            });
            setQuizData(result.data);
            setQuiz(result?.data?.content || []); // ✅ Ensure quiz is always an array
        } catch (error) {
            console.error('Error fetching quiz:', error);
            setQuiz([]); // ✅ Prevent undefined issue
        }
    };

    const checkAnswer = (userAnswer, currentQuestion) => {
        setCorrectAns(currentQuestion?.correct_answer); 
        
        if (userAnswer === currentQuestion?.correct_answer) {
            setIsCorrectAnswer(true);
        } else {
            setIsCorrectAnswer(false);
        }
    };

    useEffect(() => {
        setCorrectAns(null);
        setIsCorrectAnswer(null);
    }, [stepCount]);

    return (
        <div>
            <h2 className='font-bold text-2xl text-center mb-6'>Quiz</h2>

            {quiz?.length > 0 && ( // ✅ Only render StepProgress when quiz data is available
                <StepProgress data={quiz} stepCount={stepCount} setStepCount={setStepCount} />
            )}

            {quiz?.length > 0 && stepCount < quiz.length ? ( // ✅ Ensure quiz is not undefined before accessing length
                <div>
                    <QuizCardItem 
                        quiz={quiz[stepCount]} 
                        userSelectedoption={(v) => checkAnswer(v, quiz[stepCount])} 
                    />
                </div>
            ) : quiz?.length === 0 ? (
                <div className="text-center text-gray-600">
                    <p>Loading quiz or no quiz data available...</p>
                </div>
            ) : (
                <div className='border p-4 bg-blue-100 rounded-lg text-center mt-5'>
                    <h2 className='font-bold text-lg text-blue-600'>🎉 Your Quiz is Over! 🎉</h2>
                    <p className='text-blue-600 mt-2'>Great job! You've completed the quiz.</p>
                    <button 
                        className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'
                        onClick={() => router.back()} // ✅ Go back to course
                    >
                        Go Back to Course
                    </button>
                </div>
            )}

            {isCorrectAnswer === false && correctAns && (
                <div className='border p-3 border-red-700 bg-red-300 rounded-lg'>
                    <h2 className='font-bold text-lg text-red-600'>Incorrect</h2>
                    <p className='text-red-600'>Correct Answer is: {correctAns}</p>
                </div>
            )}

            {isCorrectAnswer === true && (
                <div className='border p-3 border-green-700 bg-green-300 rounded-lg'>
                    <h2 className='font-bold text-lg text-green-600'>Correct</h2>
                    <p className='text-green-600'>Your Answer is Correct</p>
                </div>
            )}
        </div>
    );
}

export default Quiz;
