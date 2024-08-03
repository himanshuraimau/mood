import { getUserByClerkId } from "@/utils/auth"
import {prisma } from "@/utils/db"
import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export const POST = async () => {
    const user = await getUserByClerkId()
    const entry = await prisma.journalEntry.create({
        data:{
            userId:user.id,
            content: "Write your content here",
        }
    })
    revalidatePath('/journal')
    return NextResponse.json({
        data: entry
    })
}