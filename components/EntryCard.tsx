const EntryCard = ({ entry }:{entry:any}) => {
  const date = new Date(entry.createdAt).toDateString();
  
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
      <div className="px-4 py-5 sm:px-6 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">{date}</h3>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <p className="text-gray-700 text-base">Summary</p>
      </div>
      <div className="px-4 py-4 sm:px-6 bg-gray-50">
        <p className="text-gray-700 text-base">Analysis</p>
      </div>
    </div>
  );
}

export default EntryCard;
