import React from 'react';

interface Analysis {
  mood: string;
  summary: string;
  subject: string;
  negative: boolean;
  color: string;
}

interface Entry {
  id: string;
  createdAt: string;
  summary?: string;
  analysis?: Analysis;
}

const getMoodColor = (mood: string) => {
  switch (mood.toLowerCase()) {
    case 'happy':
      return 'bg-yellow-200 text-yellow-800';
    case 'sad':
      return 'bg-blue-200 text-blue-800';
    case 'angry':
      return 'bg-red-200 text-red-800';
    case 'neutral':
      return 'bg-gray-200 text-gray-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

const EntryCard = ({ entry }: { entry: Entry }) => {
  const { createdAt, summary = 'No summary available', analysis } = entry;
  const date = new Date(createdAt);
  const formattedDate = date.toDateString();
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const moodClass = analysis ? getMoodColor(analysis.mood) : 'bg-gray-200 text-gray-800';

  return (
    <div className={`divide-y divide-gray-200 overflow-hidden rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl ${moodClass}`}>
      <div className="px-4 py-5 sm:px-6 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">{formattedDate}</h3>
        <p className="text-sm text-gray-600">{formattedTime}</p>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <p className="text-gray-700 text-base">{summary}</p>
      </div>
      <div className="px-4 py-4 sm:px-6 bg-gray-50">
        <p className="text-gray-700 text-base">{analysis ? analysis.mood : 'Mood not available'}</p>
      </div>
    </div>
  );
};

export default EntryCard;
