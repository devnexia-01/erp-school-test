import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { AttendanceData } from '../types';

interface AttendanceChartProps {
  data: AttendanceData[];
  title?: string;
}

const AttendanceChart: React.FC<AttendanceChartProps> = ({ data, title = "Today's Attendance" }) => {
    const total = data.reduce((acc, curr) => acc + curr.value, 0);
    const avgAttendance = data.length > 0 ? (total / data.length).toFixed(1) : 0;
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">Overall attendance summary.</p>
      <div className="flex-grow flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data as any}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
                formatter={(value: number) => [`${value}%`, 'Attendance']}
                cursor={{fill: 'transparent'}}
                contentStyle={{
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                }}
            />
            <Legend iconType="circle" iconSize={10} verticalAlign="bottom" align="center" wrapperStyle={{paddingTop: '20px'}}/>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <span className="text-3xl font-bold text-gray-800">{avgAttendance}%</span>
            <p className="text-sm text-gray-500">Average</p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;