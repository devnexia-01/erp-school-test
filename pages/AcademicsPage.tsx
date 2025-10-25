import React from 'react';
import { mockSubjects, mockTimeTable } from '../data/mockData';

const AcademicsPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Academics</h1>

      {/* Timetable Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Class Timetable (Class 10 - Section A)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monday</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tuesday</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wednesday</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thursday</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Friday</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockTimeTable.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{row.time}<br/><span className="text-xs text-gray-400">Period {row.period}</span></td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{row.monday}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{row.tuesday}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{row.wednesday}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{row.thursday}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{row.friday}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subjects Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Subjects Offered (Class 10)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockSubjects.map(subject => (
            <div key={subject.id} className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-800">{subject.name} ({subject.code})</h3>
              <p className="text-sm text-gray-500">Teacher: {subject.teacher}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicsPage;