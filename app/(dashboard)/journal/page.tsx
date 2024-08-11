import { prisma } from "@/utils/db";
import { getUserByClerkId } from "@/utils/auth";
import NewEntryCard from "@/components/NewEntryCard"; // Corrected path
import EntryCard from "@/components/EntryCard"; // Corrected path
import Link from "next/link";
import { analyze } from "@/utils/ai";

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
    return entries;
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    return [];
  }
};

const JournalPage = async () => {
  const entries = await getEntries();
  return (
    <div className="p-10 bg-zinc-200/50 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-indigo-700">Journal</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
