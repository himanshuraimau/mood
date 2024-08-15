"use client";

import { updatedEntry } from '@/utils/api';
import React, { useState } from 'react';
import { useAutosave } from 'react-autosave';

interface Analysis {
  mood: string;
  summary: string;
  subject: string;
  negative: boolean;
  color: string;
}

interface Entry {
  id: string;
  content: string;
  analysis: Analysis;
}

interface EditorProps {
  entry: Entry;
}

const Editor: React.FC<EditorProps> = ({ entry }) => {
  const [content, setContent] = useState(entry.content);
  const [isLoaded, setIsLoaded] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis>(entry.analysis);

  const { mood, summary, subject, negative, color } = analysis;

  const analysisData = [
    { name: "Summary", value: summary },
    { name: "Subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? 'True' : 'False' },
  ];

  useAutosave({
    data: content,
    onSave: async (_content) => {
      try {
        setIsLoaded(true);
        const updated = await updatedEntry(entry.id, _content);

        if (updated && updated.analysis) {
          const updatedAnalysis: Analysis = updated.analysis;
          setAnalysis(updatedAnalysis);
        } else {
          console.error("Analysis data is missing from the updated entry.");
        }
      } catch (error) {
        console.error("Error saving the content:", error);
      } finally {
        setIsLoaded(false);
      }
    },
  });

  return (
    <div className="w-full h-full relative grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div className="col-span-2 bg-white rounded-lg shadow-lg overflow-hidden relative">
        {isLoaded && (
          <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-70 flex items-center justify-center z-10">
            <div className="p-2 bg-gray-800 opacity-30 text-white rounded-lg shadow-lg">
              <div className="text-xl font-semibold">Saving...</div>
            </div>
          </div>
        )}
        <textarea
          className="w-full h-full p-6 text-lg border-none outline-none resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your journal entry here..."
        />
      </div>
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="px-6 py-4" style={{ backgroundColor: color }}>
          <h2 className="text-xl font-semibold text-white">Analytics</h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {analysisData.map((item) => (
            <li key={item.name} className="px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{item.name}</span>
              <span className="text-sm text-gray-500">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Editor;
