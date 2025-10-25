
import React from 'react';
import { RecentActivity } from '../types';

interface RecentActivitiesProps {
  activities: RecentActivity[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
      <ul className="space-y-4">
        {activities.map((activity, index) => (
          <li key={index} className="flex items-center space-x-4">
            <img 
              src={activity.user.avatar} 
              alt={activity.user.name} 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">{activity.user.name}</span> {activity.action}
              </p>
              <p className="text-xs text-gray-400">{activity.timestamp}</p>
            </div>
          </li>
        ))}
      </ul>
      <button className="mt-6 w-full text-sm font-semibold text-brand-blue-600 hover:text-brand-blue-800 transition-colors">
        View All Activities
      </button>
    </div>
  );
};

export default RecentActivities;
