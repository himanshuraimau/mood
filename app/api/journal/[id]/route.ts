import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";
import { analyze } from "@/utils/ai";

export const PATCH = async (request: Request, { params }: { params: any }) => {
  const { content } = await request.json();
  const user = await getUserByClerkId();

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      id: params.id,
      userId: user.id,
    },
    data: {
      content,
    },
  });

  const analysis = await analyze(updatedEntry.content);

  // Ensure analysis is a JSON object
  let analysisData;
  try {
    analysisData = analysis;
  } catch (error) {
    console.error("Failed to parse analysis result:", error);
    throw new Error("Invalid JSON format in analysis result.");
  }

  await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    update: {
      mood: analysisData.mood || "",
      summary: analysisData.summary || "",
      subject: analysisData.subject || "",
      negative: analysisData.negative || false,
      color: analysisData.color || "#000000", // Default to black if no color is provided
    },
    create: {
      entryId: updatedEntry.id,
      mood: analysisData.mood || "",
      summary: analysisData.summary || "",
      subject: analysisData.subject || "",
      negative: analysisData.negative || false,
      color: analysisData.color || "#000000",
    },
  });

  return NextResponse.json({ data: updatedEntry });
};
