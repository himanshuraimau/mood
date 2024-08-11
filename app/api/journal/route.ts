import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { analyze } from "@/utils/ai";

export const POST = async () => {
  const user = await getUserByClerkId();
  
  // Replace with actual content if available
  const entryContent = "Write your content here";

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: entryContent,
    },
  });

  // Analyze the journal entry content
  const analysisString = await analyze(entry.content);

  try {
    const analysis = analysisString;

    await prisma.analysis.create({
      data: {
        entryId: entry.id,
        mood: analysis.mood || "",
        summary: analysis.summary || "",
        subject: analysis.subject || "",
        negative: analysis.negative || false,
        color: analysis.color || "#000000", // Default to black if no color is provided
      },
    });
  } catch (error) {
    console.error("Failed to parse analysis result:", error);
    throw new Error("Invalid JSON format in analysis result.");
  }

  revalidatePath('/journal');
  return NextResponse.json({
    data: entry,
  });
};
