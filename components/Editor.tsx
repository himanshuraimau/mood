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
    <div className="w-full h-full relative grid grid-cols-3">
      <div className="col-span-2">
        {isLoaded && (
          <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center z-10">
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <div className="text-lg font-semibold">Saving...</div>
            </div>
          </div>
        )}
        {!isLoaded && (
          <textarea
            className="w-full h-full p-8 text-xl outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}
      </div>
      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
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

export default Editor;
