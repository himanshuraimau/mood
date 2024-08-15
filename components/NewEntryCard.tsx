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
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:bg-gray-50"
      onClick={handleClick}
    >
      <div className="px-4 py-5 sm:p-6 flex items-center space-x-3">
        <FaRegEdit className="text-blue-600 text-3xl" />
        <div className="text-center">
          <span className="block text-2xl font-semibold text-gray-800 mb-1">
            New Entry
          </span>
          <span className="block text-sm text-gray-600">
            Click to create a new journal entry
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewEntryCard;
