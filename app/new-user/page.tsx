import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user = await currentUser()
  
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string,
    },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user?.id,
        email: user?.emailAddresses[0].emailAddress,
      },
    })
  }

  redirect('/journal')
}

const NewUser = async () => {
  await createNewUser()
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-200 to-teal-600 flex items-center justify-center">
      <div className="card animate-fadeIn p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <h2 className="mt-6 text-2xl font-semibold heading-gradient">Setting Up Your Journal</h2>
          <p className="mt-2 text-gray-600 text-center">Please wait while we prepare your personal space...</p>
        </div>
      </div>
    </div>
  )
}

export default NewUser