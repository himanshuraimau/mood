"use client"
import React from 'react';
import { Line, ResponsiveContainer, XAxis, Tooltip, LineChart } from 'recharts';

const CustomTooltip = ({ payload, label, active }) => {
  if (active && payload && payload.length) {
    const analysis = payload[0].payload;
    const dateLabel = new Date(label).toLocaleString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-2 top-2 w-2 h-2 rounded-full"
          style={{ background: analysis.color }}
        ></div>
        <p className="label text-sm text-black/30">{dateLabel}</p>
        <p className="intro text-xl uppercase">{analysis.mood}</p>
      </div>
    );
  }

  return null;
};

const HistoryChart = ({ data }) => {
    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line type="monotone" dataKey="sentimentScore" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
            <XAxis dataKey="updatedAt" />
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
};
export default HistoryChart;