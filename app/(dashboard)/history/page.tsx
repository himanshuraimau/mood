import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import HistoryChart  from "@/components/HistoryChart";

const getData = async () => {
    const user = await getUserByClerkId();
    const analyses = await prisma.analysis.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    const sum = analyses.reduce((acc, curr) => acc + Number(curr.sentimentScore), 0);
    const avg = analyses.length ? sum / analyses.length : 0;
    return { analyses, avg };
  };
  
  const History = async () => {
    const { avg, analyses } = await getData();
    return (
      <div className="w-full h-full">
        {`Average sentiment score: ${avg}`}
        <div className="w-full h-full">
          <HistoryChart data={analyses} />
        </div>
      </div>
    );
  };
  
  export default History;