import {prisma} from "@/utils/db"
import {getUserByClerkId} from "@/utils/auth"
import NewEntryCard from "@/componenets/NewEntryCard"
import EntryCard from "@/componenets/EntryCard"

const getEntries = async ()=>{
     const user = await getUserByClerkId()
     const entries = await prisma.journalEntry.findMany({
        where:{
            userId: user.id
        },
        orderBy:{
            createdAt: 'desc'
        }
     })
        return entries

}



const JournalPage = async()=>{
    const entries = await getEntries()
    return( <div className="p-10 bg-zinc-200/50 h-full">
        <h2 className="text-3xl mb-8">Journal</h2>
    <div className="grid grid-cols-3 gap-4">
                <NewEntryCard/>
             {entries.map(entry=>(
                 <EntryCard key={entry.id} entry={entry}/>
             ))}
          </div>
    </div>
    )
}


export default JournalPage;