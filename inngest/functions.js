import { db } from "@/config/db";
import { inngest } from "./client";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from "@/config/schema";
import { eq } from "drizzle-orm";
import { generateNotesAiModel, GenerateQAAiModel, GenerateQuizAiModel, GenerateStudyTypeContents } from "@/config/AiModel";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { message: `Hello ${event.data.email}!` };
    },
);

export const CreateNewUser = inngest.createFunction(
    { id: 'create-user' },
    { event: 'user.create' },
    async ({ event, step }) => {
        const { user } = event.data;
        const result = await step.run('Check User and create New if Not in DB', async () => {
            if (!user) return;

            const userEmail = user?.primaryEmailAddress?.emailAddress;
            const userName = user?.fullName || "Unknown User"; // Provide a default name

            const result = await db.select().from(USER_TABLE)
                .where(eq(USER_TABLE.email, userEmail));


            if (result?.length === 0) {
                const userRes = await db.insert(USER_TABLE).values({
                    name: userName,
                    email: userEmail
                }).returning({ id: USER_TABLE.id });

                return userRes;
            }
            return result;
        })

        return 'Success';
    }
);

export const GenerateNotes = inngest.createFunction(
    { id: 'generate-course' },
    { event: 'notes.generate' },
    async ({ event, step }) => {
        const { course } = event.data;

        const notesResult = await step.run('Generate Chapter Notes', async () => {
            const Chapters = course?.courseLayout?.chapters;
            let index = 0;
            Chapters.forEach(async (chapter) => {
                const PROMPT = `Generate exam material detail content for each chapter , Make sure to includes all topic point in the content, Make sure to give content in HTML format (Do not add HTML, Head, Body,title tag), The chapters :  ${JSON.stringify(chapter)}`;
                const result = await generateNotesAiModel.sendMessage(PROMPT);
                const aiRes = result.response.text();

                await db.insert(CHAPTER_NOTES_TABLE).values({
                    chapterId: index,
                    courseId: course?.courseId,
                    notes: aiRes
                })
                index++;
            });
            return 'Completed'
        })


        const updateCourseStatus = await step.run('Update Course Status to Ready', async () => {
            const result = await db.update(STUDY_MATERIAL_TABLE).set({
                status: "Ready"
            }).where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId))

            return "Success";
        });
    }
)

export const GenerateStudyTypeContent = inngest.createFunction(
    { id: 'Generate Study Type Content' },
    { event: 'StudyType.content' },

    async ({ event, step }) => {
        const { studyType, prompt, courseId, recordId } = event.data;

        const AiResult = await step.run('Generating AI Content', async () => {
            const result =
                studyType === 'Flashcard' ? 
                    await GenerateStudyTypeContents.sendMessage(prompt) :
                studyType === 'Quiz' ? 
                    await GenerateQuizAiModel.sendMessage(prompt) :
                studyType === 'Question/Answer' ? 
                    await GenerateQAAiModel.sendMessage(prompt) : null;
        
            if (!result) {
                throw new Error("Invalid study type or missing AI model.");
            }
        
            const AIResult = JSON.parse(result.response.text());
            return AIResult;
        });
        

        const DBResult = await step.run('Save Result to DB', async () => {
            const result = await db.update(STUDY_TYPE_CONTENT_TABLE)
                .set({
                    content: AiResult,
                    status: 'Ready'
                }).where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId))

            return 'Data Inserted';
        })
    }
)




