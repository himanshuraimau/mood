"use client";
import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";
import { FaRegEdit } from "react-icons/fa"; 

const NewEntryCard = () => {
  const router = useRouter();

  const handleClick = async () => {
    const data = await createNewEntry();
    router.push(`/journal/${data.id}`);
  };

  return (
    <div
      className="card cursor-pointer bg-gradient-to-br from-teal-500 to-teal-600 text-white group"
      onClick={handleClick}
    >
      <div className="px-6 py-8 flex flex-col items-center text-center">
        <div className="mb-4 p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors duration-300">
          <FaRegEdit className="text-4xl" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-2">
            New Entry
          </h3>
          <p className="text-teal-100">
            Start writing your thoughts...
          </p>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-teal-100">Create →</span>
      </div>
    </div>
  );
};

export default NewEntryCard;
