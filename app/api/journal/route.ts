import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { analyze } from "@/utils/ai";

export const POST = async () => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: "Write your content here",
    },
  });

  const analysisString = await analyze(entry.content);
  const analysis = analysisString ? JSON.parse(analysisString) : null; // Parse the analysis JSON string if analysisString is not undefined

  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      mood: analysis.mood || "",
      summary: analysis.summary || "",
      subject: analysis.subject || "",
      negative: analysis.negative || false,
      color: analysis.color || "#000000", 
    },
  });

  revalidatePath('/journal');
  return NextResponse.json({
    data: entry,
  });
};
