import { courseOutline } from "@/config/AiModel";
import { db } from "@/config/db";
import { STUDY_MATERIAL_TABLE } from "@/config/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req){
    const {courseId, topic, courseType, difficultyLevel,createdBy} = await req.json();

    const PROMPT=`Generate a study material for ${topic} for ${courseType} and Level of difficulty will be ${difficultyLevel}  with summary of course, list of Chapters along with Summary and Emoji(seperate) for each chapter, Topic list in each chapter in JSON format`
    const aiRes = await courseOutline.sendMessage(PROMPT);
    const aiResult = JSON.parse(aiRes.response.text());

    const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId:courseId,
        courseType:courseType,
        createdBy:createdBy,
        topic:topic,
        courseLayout:aiResult
    }).returning({res:STUDY_MATERIAL_TABLE})

    const result = await inngest.send({
        name:'notes.generate',
        data:{
            course:dbResult[0].res
        }
    });    

    return NextResponse.json({result:dbResult[0]});
}