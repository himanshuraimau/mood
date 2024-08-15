import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";
import { analyze } from "@/utils/ai";

export const PATCH = async (request: Request, { params }: { params: any }) => {
  try {
    const { content } = await request.json();
    const user = await getUserByClerkId();

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Update the journal entry with the new content
    const updatedEntry = await prisma.journalEntry.update({
      where: {
        id: params.id,
        userId: user.id,
      },
      data: {
        content,
      },
    });

    // Analyze the updated content
    const analysis = await analyze(updatedEntry.content);

    let analysisData;
    try {
      analysisData = analysis;
    } catch (error) {
      console.error("Failed to parse analysis result:", error);
      throw new Error("Invalid JSON format in analysis result.");
    }
    
    if (!analysisData) {
      return NextResponse.json(
        { error: "Analysis data is missing or invalid." },
        { status: 400 }
      );
    }
    
    // Upsert the analysis data into the database
    const updatedAnalysis = await prisma.analysis.upsert({
      where: {
        entryId: updatedEntry.id,
      },
      update: {
        mood: analysisData.mood || "",
        summary: analysisData.summary || "",
        subject: analysisData.subject || "",
        negative: analysisData.negative || false,
        color: analysisData.color || "#000000",
        sentimentScore: analysisData.sentimentScore || 0,
      },
      create: {
        userId: user.id,
        entryId: updatedEntry.id,
        mood: analysisData.mood || "",
        summary: analysisData.summary || "",
        subject: analysisData.subject || "",
        negative: analysisData.negative || false,
        color: analysisData.color || "#000000",
        sentimentScore: analysisData.sentimentScore || 0,
      },
      include: {
        entry: true, // Include related journal entry data if needed
      },
    });
    

    // Return the updated journal entry and analysis as JSON
    return NextResponse.json({
      data: {
        entry: updatedEntry,
        analysis: updatedAnalysis,
      },
    });
  } catch (error) {
    console.error("Error processing the PATCH request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
};
