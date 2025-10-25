
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FeeData } from '../types';

interface FeeChartProps {
  data: FeeData[];
}

const FeeChart: React.FC<FeeChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">Fee Collection Trend</h3>
      <p className="text-sm text-gray-500 mb-4">Monthly fee collection vs. total dues (in Lakhs).</p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: -10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} unit="L" />
            <Tooltip 
              cursor={{fill: 'rgba(239, 246, 255, 0.5)'}}
              contentStyle={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
              }}
              formatter={(value: number) => [`₹${value}L`, '']}
            />
            <Legend iconSize={10} wrapperStyle={{paddingTop: '20px'}}/>
            <Bar dataKey="due" fill="#dbeafe" name="Total Due" radius={[4, 4, 0, 0]} />
            <Bar dataKey="collected" fill="#3b82f6" name="Collected" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FeeChart;
