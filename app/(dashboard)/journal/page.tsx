import { prisma } from "@/utils/db";
import { getUserByClerkId } from "@/utils/auth";
import NewEntryCard from "@/components/NewEntryCard"; 
import EntryCard from "@/components/EntryCard";
import Link from "next/link";
import Question from "@/components/Question";

const getEntries = async () => {
  try {
    const user = await getUserByClerkId();
    const entries = await prisma.journalEntry.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Ensure entries include the necessary properties
    console.log("Fetched Entries:", entries); // Debug logging
    return entries;
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    return [];
  }
};

const JournalPage = async () => {
  const entries = await getEntries();

  return (
    <div className="p-8 min-h-screen bg-gradient-to-r from-gray-50 via-blue-50 to-gray-200">
      <h2 className="text-4xl font-bold mb-8 text-indigo-800 text-center">Journal</h2>
      <div className="my-8">
        <Question />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NewEntryCard />
        {entries.length > 0 ? (
          entries.map((entry) => (
            <Link href={`/journal/${entry.id}`} key={entry.id}>
            
                <EntryCard entry={entry} />
              
            </Link>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-600">
            <p className="text-xl">No entries found. Start by creating a new entry!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalPage;
