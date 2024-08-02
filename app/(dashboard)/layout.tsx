import { UserButton } from "@clerk/nextjs";

const DashBoardLayout = ({ children }) => {
    return( <div className="h-screen w-screen relative">
                    <aside className="absolute w-[200px] top-0 left-0 h-full border-black/10">
                         Mood
                    </aside>
                    <div className="ml-[200px] h-full">
                          <header className="h-[60px] border-b border-black/10">
                             <div className="h-full w-full px-6 flex items-center justify-end">
                                 <UserButton/>
                             </div>
                          </header>
                          <main className="h-[calc(100vh-60px)]">
                                {children}
                          </main>
                    </div>
            </div>
        )
}


export default DashBoardLayout;