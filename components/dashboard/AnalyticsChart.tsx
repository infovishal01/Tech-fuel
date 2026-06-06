'use client';

import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    month: 'Jan',
    users: 400,
  },

  {
    month: 'Feb',
    users: 900,
  },

  {
    month: 'Mar',
    users: 1400,
  },

  {
    month: 'Apr',
    users: 2200,
  },

  {
    month: 'May',
    users: 3400,
  },

  {
    month: 'Jun',
    users: 4800,
  },
];

export default function AnalyticsChart() {
  return (
    <div
      className="
      border
      border-zinc-800
      bg-zinc-950
      rounded-3xl
      p-8
    "
    >
      {/* Heading */}
      <div className="mb-10">
        <p className="text-zinc-400">User Growth</p>

        <h2 className="text-3xl font-black mt-3">Analytics Overview</h2>
      </div>

      {/* Chart */}
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" stroke="#71717a" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="users"
              stroke="#22c55e"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
