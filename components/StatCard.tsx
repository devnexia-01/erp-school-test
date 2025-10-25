
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { StatCardData } from '../types';

const StatCard: React.FC<StatCardData> = ({ title, value, change, changeType, icon: Icon, color }) => {
  const isIncrease = changeType === 'increase';
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        <div className="flex items-center mt-2">
          <span className={`flex items-center text-xs font-semibold ${isIncrease ? 'text-green-600' : 'text-red-600'}`}>
            {isIncrease ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
            {change}
          </span>
          <span className="text-xs text-gray-400 ml-1">vs last month</span>
        </div>
      </div>
      <div className={`p-3 rounded-full bg-opacity-20 ${
        isIncrease ? 'bg-green-100' : 'bg-red-100'
      }`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  );
};

export default StatCard;
