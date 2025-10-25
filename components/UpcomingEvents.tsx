
import React from 'react';
import { Calendar, UserCheck, PartyPopper, School } from 'lucide-react';
import { UpcomingEvent } from '../types';

interface UpcomingEventsProps {
  events: UpcomingEvent[];
}

const categoryIcons: Record<UpcomingEvent['category'], React.ElementType> = {
  Academic: School,
  Meeting: UserCheck,
  Holiday: PartyPopper,
  Activity: PartyPopper,
};

const categoryColors: Record<UpcomingEvent['category'], string> = {
  Academic: 'bg-blue-100 text-blue-600',
  Meeting: 'bg-purple-100 text-purple-600',
  Holiday: 'bg-yellow-100 text-yellow-600',
  Activity: 'bg-green-100 text-green-600',
};

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h3>
      <ul className="space-y-4">
        {events.map((event, index) => {
          const Icon = categoryIcons[event.category];
          const colorClass = categoryColors[event.category];
          return (
            <li key={index} className="flex items-start space-x-4">
              <div className={`p-3 rounded-full flex-shrink-0 ${colorClass}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-gray-700">{event.title}</p>
                <p className="text-sm text-gray-500 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  {event.date}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      <button className="mt-6 w-full text-sm font-semibold text-brand-blue-600 hover:text-brand-blue-800 transition-colors">
        View Full Calendar
      </button>
    </div>
  );
};

export default UpcomingEvents;
