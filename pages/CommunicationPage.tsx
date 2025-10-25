import React from 'react';
import { MessageSquare, Bell, Send } from 'lucide-react';

const CommunicationPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="flex items-center mb-6">
          <MessageSquare className="w-8 h-8 text-brand-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Communication Hub</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Send Announcement Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
                <Bell className="w-6 h-6 text-brand-blue-500 mr-3" />
                <h2 className="text-xl font-semibold text-gray-700">Send an Announcement</h2>
            </div>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Send To</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500">
                        <option>All Users</option>
                        <option>All Students</option>
                        <option>All Faculty</option>
                        <option>Class 10-A</option>
                        <option>Class 12-C</option>
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input type="text" placeholder="e.g., Holiday Notification" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea rows={5} placeholder="Compose your message here..." className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"></textarea>
                </div>
                <div className="flex justify-end">
                     <button type="submit" className="flex items-center bg-brand-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-brand-blue-700 transition-colors">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                    </button>
                </div>
            </form>
        </div>
        
        {/* Recent Announcements Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Announcements</h2>
            <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-gray-50">
                    <p className="font-semibold text-gray-800">Parent-Teacher Meeting Scheduled</p>
                    <p className="text-sm text-gray-600 mt-1">A PTM has been scheduled for all classes on Oct 28, 2025. Please check the events calendar for details.</p>
                    <p className="text-xs text-gray-400 mt-2">Sent to: All Students, All Parents | 2 days ago</p>
                </div>
                <div className="p-4 border rounded-lg bg-gray-50">
                    <p className="font-semibold text-gray-800">Diwali Break Notification</p>
                    <p className="text-sm text-gray-600 mt-1">The school will remain closed from Nov 10 to Nov 15 on account of Diwali.</p>
                    <p className="text-xs text-gray-400 mt-2">Sent to: All Users | 5 days ago</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationPage;
