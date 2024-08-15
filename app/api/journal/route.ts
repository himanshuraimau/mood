import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { analyze } from "@/utils/ai";

export const POST = async () => {
  try {
    const user = await getUserByClerkId();
    
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
    
    // Replace with actual content if available
    const entryContent = "Write your content here"; // This should be dynamic content
    
    // Create the journal entry
    const entry = await prisma.journalEntry.create({
      data: {
        userId: user.id,
        content: entryContent,
      },
    });

    // Analyze the journal entry content
    const analysisString = await analyze(entry.content);

    // Assuming analyze returns a JSON string, parse it
    let analysis;
    try {
      analysis = typeof analysisString === "string" ? JSON.parse(analysisString) : analysisString;
    } catch (error) {
      console.error("Failed to parse analysis result:", error);
      throw new Error("Invalid JSON format in analysis result.");
    }

    // Save the analysis to the database
    await prisma.analysis.create({
      data: {
        userId: user.id,
        entryId: entry.id,
        mood: analysis.mood || "",
        summary: analysis.summary || "",
        subject: analysis.subject || "",
        negative: analysis.negative || false,
        color: analysis.color || "#ffcc00",
        sentimentScore: String(analysis.sentimentScore),
      },
    });

    // Revalidate the journal page cache
    revalidatePath('/journal');

    // Return the created entry as a JSON response
    return NextResponse.json({ data: entry });

  } catch (error) {
    console.error("Error processing the POST request:", error);
    return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 });
  }
};
