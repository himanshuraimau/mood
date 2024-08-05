import Editor from "@/componenets/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getEntry = async (id: any) => {
    const user = await getUserByClerkId();
    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id
            }
        }
    });
    return entry;
};

const EntryPage = async ({ params }:{params:any}) => {
    const entry = await getEntry(params.id);
    const analysisData = [
        { name: "Summary", value: "This is a summary" },
        { name: "Subject", value: "This is an insight" },
        { name: "Mood", value: "This is an insight" },
        { name: "Negative", value: "This is an insight" },
    ];

    return (
        <div className="h-full w-full grid grid-cols-3">
            <div className="col-span-2">
                <Editor entry={entry} />
            </div>
            <div className="border-l border-black/10">
                <div className="bg-blue-300 px-6 py-10">
                    <h2 className="text-2xl">Analytics</h2>
                    </div>
                    <div>
                        <ul>
                            {analysisData.map((item) => (
                                <li key={item.name} className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10">
                                    <span className="text-lg font-semibold">{item.name}</span>
                                    <span>{item.value}</span>
                                </li>
                            ))}
                        </ul>
                    
                </div>
            </div>
        </div>
    );
};

export default EntryPage;
