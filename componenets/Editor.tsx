"use client";

import { updatedEntry } from '@/utils/api';
import React, { useState } from 'react';
import { useAutosave } from 'react-autosave';

const Editor = ({ entry }: any) => {
  const [content, setContent] = useState(entry.content);
  const [isLoaded, setIsLoaded] = useState(false);

  useAutosave({
    data: content,
    onSave: async (_content) => {
      setIsLoaded(true);
      await updatedEntry(entry.id, _content);
      setIsLoaded(false);
    },
  });

  return (
    <div className="w-full h-full relative">
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
  );
};

export default Editor;
