import React, { useEffect, useState } from 'react';
import MaterialCardItem from './MaterialCardItem';
import axios from 'axios';
import Link from 'next/link';

const StudyMaterial = ({ courseId, course }) => {

  const [studyTypeContent, setStudyTypeContent] = useState();

  const MaterialList = [
    {
      name: 'Notes/Chapters',
      desc: "Read notes to prepare it",
      icon: '/notes.png',
      path: "/notes",
      type: "notes"
    },
    {
      name: 'Flashcard',
      desc: "Flashcard helps to remember the concept",
      icon: '/knowledge.png',
      path: "/flashcards",
      type: "flashcard"
    },
    {
      name: 'Quiz',
      desc: "Great way to test your knowledge",
      icon: '/quiz.jpg',
      path: "/quiz",
      type: "quiz"
    },
    {
      name: 'Question/Answer',
      desc: "Helps to practise your learning",
      icon: '/qa.png',
      path: "/qa",
      type: "qa"
    },
  ]

  useEffect(() => {
    GetStudyMaterial();
  }, []);

  const GetStudyMaterial = async () => {
    try {
      const result = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: "ALL"
      });
  
      // Ensure state updates with the correct structure
      setStudyTypeContent({
        notes: result.data.notes,
        flashcard: result.data.flashcard ? [result.data.flashcard] : [],
        quiz: result.data.quiz ? [result.data.quiz] : [],
        qa: result.data.qa ? [result.data.qa] : [],
      });
    } catch (error) {
      console.error("Error fetching study materials:", error);
    }
  };  
  
  return (
    <div className='mt-5'>
      <h2 className='font-medium text-xl'>Study Material</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-5'>
        {MaterialList.map((item, index) => (
            <MaterialCardItem item={item} key={index}
              studyTypeContent={studyTypeContent}
              course={course}
              refreshData={GetStudyMaterial}
            />
        ))}
      </div>
    </div>
  );
}

export default StudyMaterial;