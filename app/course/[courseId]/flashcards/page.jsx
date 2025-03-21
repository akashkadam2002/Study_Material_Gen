'use client'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import FlashcardItem from './_components/FlashcardItem';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const FlashCards = () => {
    const { courseId } = useParams();
    const [flashCards, setFlashCards] = useState([]);
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [api, setApi] = useState();
    const router = useRouter(); // ✅ Use router for navigation

    useEffect(() => {
        GetFlashCard()
    }, []);

    useEffect(() => {
        if (!api) return;

        // Listen to the `select` event to track the current slide
        api.on('select', () => {
            setIsFlipped(false);
            setCurrentIndex(api.selectedScrollSnap()); // Get the current slide index
        });
    }, [api]);

    const GetFlashCard = async () => {
        const result = await axios.post('/api/study-type', {
            courseId: courseId,
            studyType: 'Flashcard'
        });
        setFlashCards(result?.data);
    }

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    }

    return (
        <div>
            <h2 className='font-bold text-2xl'>Flashcards</h2>
            <p>Flashcards: The Ultimate Tool to Lock in Concepts!</p>

            <div className='mt-10'>
                <Carousel setApi={setApi}>
                    <CarouselContent>
                        {flashCards?.content?.map((flashcard, index) => (
                            <CarouselItem key={index} className='flex items-center justify-center'>
                                <FlashcardItem handleClick={handleClick} isFlipped={isFlipped} flashcard={flashcard} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

            {currentIndex === flashCards?.content?.length - 1 && (
                <div className='border p-4 bg-blue-100 rounded-lg text-center mt-5'>
                    <button
                        className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'
                        onClick={() => router.back()}
                    >
                        Go Back to Course
                    </button>
                </div>
            )}
        </div>
    );
}

export default FlashCards;
