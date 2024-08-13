import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";
import { qa } from "@/utils/ai";

export const POST = async (request:any) => {
    const { question } = await request.json();  // Corrected the typo here
    const user = await getUserByClerkId();

    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
        },
    });

    const answers = await qa(question, entries);

    return NextResponse.json({ data: answers });
};
