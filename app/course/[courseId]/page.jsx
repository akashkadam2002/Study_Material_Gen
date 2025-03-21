"use client"
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CourseIntroCard from './_components/CourseIntroCard';
import StudyMaterial from './_components/StudyMaterial';
import ChapterList from './_components/ChapterList';

const Course = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState();

    useEffect(() => {
        GetCourse();
    }, []);

    const GetCourse = async () => {
        const result = await axios.get(`/api/courses?courseId=${courseId}`);
        setCourse(result.data.result);
    }

    return (
        <div>
            <div className=''>

            <CourseIntroCard course={course} />

            <StudyMaterial courseId={courseId} course={course} />

            <ChapterList course={course} />
            </div>

        </div>
    );
}

export default Course;
