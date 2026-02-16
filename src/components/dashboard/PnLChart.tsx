"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// dumb data 
const data = [
  { name: 'Mon', pnl: 0 },
  { name: 'Tue', pnl: 1.2 },
  { name: 'Wed', pnl: -0.5 },
  { name: 'Thu', pnl: 2.8 },
  { name: 'Fri', pnl: 2.1 },
  { name: 'Sat', pnl: 4.5 },
];

export default function PnLChart() {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/30 p-6">
      <h3 className="text-lg font-semibold mb-6">Profit Performance (SOL)</h3>
      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}S`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
              itemStyle={{ color: '#3b82f6' }}
            />
            <Line 
              type="monotone" 
              dataKey="pnl" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              dot={{ fill: '#3b82f6', strokeWidth: 2 }} 
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}