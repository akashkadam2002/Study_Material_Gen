import { db } from "@/config/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/config/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { chapters, courseId, type } = await req.json();

    const PROMPT = type === 'Flashcard'
        ? `Generate the flashcard on topic:${chapters} in JSON format front back content Maximum 15`
        : type === 'Quiz'
            ? `Generate Quiz on topic:${chapters} with Question and options along with correct answer in JSON format (Max 15)`
            : type === 'Question/Answer'
                ? `Generate a list of frequently asked questions (FAQs) along with answers for the topic: ${chapters}. Include a mix of short-answer and long-answer questions in JSON format (Max 15).
Example format:
[
  {
    "topic": "name of topic",
    "faqs": [
      {
        "question": "Question 1?",
        "answer": "Answer 1."
      },
      {
        "question": "Question 2?",
        "answer": "Answer 2."
      }
    ]
  }
]`
                : null;

    const result = await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
        courseId: courseId,
        type: type,
        content: null
    }).returning({ id: STUDY_TYPE_CONTENT_TABLE.id });

    inngest.send({
        name: 'StudyType.content',
        data: {
            studyType: type,
            prompt: PROMPT,
            courseId: courseId,
            recordId: result[0].id
        }
    })
    return NextResponse.json(result[0].id);
}