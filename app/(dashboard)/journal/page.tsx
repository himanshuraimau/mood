import { prisma } from "@/utils/db";
import { getUserByClerkId } from "@/utils/auth";
import NewEntryCard from "@/components/NewEntryCard"; 
import EntryCard from "@/components/EntryCard";
import Link from "next/link";
import Question from "@/components/Question";

const getEntries = async () => {
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
};

const JournalPage = async () => {
  const entries = await getEntries();

  return (
    <div className="p-6 md:p-8 min-h-screen bg-gradient-to-br from-teal-50 via-teal-100/30 to-teal-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold heading-gradient mb-4 text-center">Your Journal</h2>
          <p className="text-gray-600 text-center max-w-2xl">
            Capture your thoughts, track your emotions, and discover insights about yourself.
          </p>
        </div>

        <div className="mb-12 animate-fadeIn">
          <Question />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn delay-1">
          <div className="transform hover:scale-102 transition-transform duration-300">
            <NewEntryCard />
          </div>
          
          {entries.length > 0 ? (
            entries.map((entry) => (
              <Link href={`/journal/${entry.id}`} key={entry.id} className="transform hover:scale-102 transition-transform duration-300">
                <EntryCard entry={entry} />
              </Link>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <div className="card text-center py-12">
                <h3 className="text-2xl font-semibold text-teal-800 mb-4">Start Your Journey</h3>
                <p className="text-gray-600 mb-8">Create your first journal entry and begin tracking your emotional journey.</p>
                <Link href="/new-entry" className="btn-primary inline-block">
                  Create First Entry
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
