'use client'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import StepProgress from '../_components/StepProgress';
import QAItem from './_components/QAItem';

const QA = () => {
    const { courseId } = useParams();
    const router = useRouter(); // To navigate back to course

    const [qaData, setQaData] = useState(null);
    const [stepCount, setStepCount] = useState(0);
    const [qa, setQa] = useState([]);

    useEffect(() => {
        GetQA();
    }, []);

    const GetQA = async () => {

        try {
            const result = await axios.post('/api/study-type', {
                courseId: courseId,
                studyType: 'Question/Answer'
            });

            console.log(result);
            setQaData(result.data);

            // Ensure content and faqs exist before mapping
            const formattedQa = result.data?.content?.flatMap(topic =>
                topic.faqs ? topic.faqs.map(faq => faq) : []
            ) || [];

            setQa(formattedQa);
            console.log("Formatted QA Data:", formattedQa);

        } catch (error) {
            console.error("Error fetching QA data:", error);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="font-bold text-2xl text-center mb-8 text-blue-700">Questions & Answers</h2>

            <StepProgress data={qa} stepCount={stepCount} setStepCount={setStepCount} />

            <div className="mt-6">
                {stepCount < qa.length ? (
                    <QAItem qa={qa[stepCount]} />
                ) : (
                    <div className="text-center bg-green-100 p-6 rounded-lg shadow-md mt-6">
                        <h3 className="text-2xl font-semibold text-green-700">🎉 You have completed the QA!</h3>
                        <button 
                            onClick={() => router.push(`/course/${courseId}`)}
                            className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
                        >
                            Go Back to Course
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QA;
