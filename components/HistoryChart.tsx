"use client";

import React from 'react';
import { Line, ResponsiveContainer, XAxis, Tooltip, LineChart, TooltipProps } from 'recharts';

interface Analysis {
  mood: string;
  summary: string;
  subject: string;
  negative: boolean;
  color: string;
}

interface DataPoint {
  sentimentScore: number;
  updatedAt: string;
  analysis: Analysis;
}

interface CustomTooltipProps extends TooltipProps<any, any> {}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload, label, active }) => {
  if (active && payload && payload.length) {
    const analysis = payload[0].payload as Analysis;
    const dateLabel = new Date(label).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

    return (
      <div className="p-6 bg-white shadow-lg border border-gray-300 rounded-lg relative max-w-xs">
        <div
          className="absolute top-2 left-2 w-4 h-4 rounded-full"
          style={{ backgroundColor: analysis.color }}
        ></div>
        <p className="text-xs text-gray-500">{dateLabel}</p>
        <p className="text-lg font-semibold text-gray-800 mt-2">{analysis.mood}</p>
        <p className="text-sm text-gray-600 mt-1">Summary: {analysis.summary}</p>
        <p className="text-sm text-gray-600 mt-1">Subject: {analysis.subject}</p>
      </div>
    );
  }

  return null;
};

interface HistoryChartProps {
  data: DataPoint[];
}

const HistoryChart: React.FC<HistoryChartProps> = ({ data }) => {
  return (
    <div className="w-full h-80 bg-gradient-to-r from-blue-50 to-indigo-100 shadow-lg rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mood Analysis Over Time</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="sentimentScore"
            stroke="#4F46E5"
            strokeWidth={3}
            dot={{ stroke: '#4F46E5', strokeWidth: 2, r: 5 }}  // Enhanced dot styling
            activeDot={{ r: 8, stroke: '#4F46E5', strokeWidth: 3 }}
          />
          <XAxis
            dataKey="updatedAt"
            tick={{ fill: '#6B7280' }}
            tickFormatter={(value) => new Date(value).toLocaleDateString()}  // Formatting for readability
            axisLine={{ stroke: '#E5E7EB' }}  // Light gray axis line
            tickLine={{ stroke: '#E5E7EB' }}  // Light gray tick lines
          />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoryChart;
