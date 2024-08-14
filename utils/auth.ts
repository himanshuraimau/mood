import { auth } from "@clerk/nextjs/server"
import { prisma } from "./db"

export const getUserByClerkId = async (opts={}) => {
          const {userId}  = await auth()

        const user = await prisma.user.findUniqueOrThrow({
            where:{
                clerkId: userId ?? ""
            }
        })
            return user
        }