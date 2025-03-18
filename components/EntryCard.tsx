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
      return 'bg-teal-100 text-teal-800 border-teal-200';
    case 'sad':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'angry':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'neutral':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const EntryCard = ({ entry }: { entry: Entry }) => {
  const { createdAt, summary = 'No summary available', analysis } = entry;
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const moodClass = analysis ? getMoodColor(analysis.mood) : 'bg-gray-100 text-gray-800 border-gray-200';

  return (
    <div className={`card backdrop-blur-sm border ${moodClass}`}>
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{formattedDate}</h3>
          <p className="text-sm text-gray-600">{formattedTime}</p>
        </div>
        
        <div className="flex-grow mb-4">
          <p className="text-gray-700 line-clamp-3">{summary}</p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <span className="text-sm font-medium">
              Mood: {analysis ? analysis.mood : 'Not analyzed'}
            </span>
          </div>
          <span className="text-sm text-teal-600 hover:text-teal-800">View Details →</span>
        </div>
      </div>
    </div>
  );
};

export default EntryCard;
