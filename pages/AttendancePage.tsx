import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { mockAttendanceRecords, mockStudents } from '../data/mockData';
import { AttendanceRecord, Student } from '../types';
import { Calendar, Check, X, Clock } from 'lucide-react';

const FacultyAttendanceView: React.FC = () => {
    const [selectedClass, setSelectedClass] = useState('10-A');
    // In a real app, this would be a map of studentId -> status
    const [attendance, setAttendance] = useState<Record<string, AttendanceRecord['status']>>({});

    const studentsInClass = mockStudents.filter(s => `${s.class}-${s.section}` === selectedClass);
    
    const handleStatusChange = (studentId: string, status: AttendanceRecord['status']) => {
        setAttendance(prev => ({...prev, [studentId]: status}));
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Mark Attendance</h2>
            <div className="flex items-center space-x-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Class</label>
                    <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500">
                        <option>10-A</option>
                        <option>9-B</option>
                        <option>11-C</option>
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input type="date" defaultValue={new Date().toISOString().substring(0, 10)} className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"/>
                </div>
            </div>

             <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {studentsInClass.map(student => (
                    <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <img className="h-10 w-10 rounded-full object-cover" src={student.avatar} alt={student.name}/>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                    <div className="text-sm text-gray-500">{student.admissionNumber}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                            <div className="flex justify-center space-x-2">
                                {(['Present', 'Absent', 'Late', 'Half-day'] as const).map(status => (
                                     <button key={status} onClick={() => handleStatusChange(student.id, status)}
                                      className={`px-3 py-1 text-sm rounded-full transition-colors ${attendance[student.id] === status ? 'bg-brand-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                     >
                                        {status}
                                     </button>
                                ))}
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            <div className="mt-6 flex justify-end">
                <button className="px-6 py-2 bg-brand-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-brand-blue-700">Submit Attendance</button>
            </div>
        </div>
    );
}

const StudentParentAttendanceView: React.FC = () => {
    const getStatusIcon = (status: AttendanceRecord['status']) => {
        const icons = {
            Present: <Check className="w-5 h-5 text-green-600" />,
            Absent: <X className="w-5 h-5 text-red-600" />,
            Late: <Clock className="w-5 h-5 text-yellow-600" />,
            'Half-day': <Clock className="w-5 h-5 text-blue-600" />,
        };
        const colors = {
            Present: 'bg-green-100',
            Absent: 'bg-red-100',
            Late: 'bg-yellow-100',
            'Half-day': 'bg-blue-100',
        }
        return <div className={`p-2 rounded-full ${colors[status]}`}>{icons[status]}</div>;
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">My Attendance Log</h2>
            <div className="space-y-4">
                {mockAttendanceRecords.map(record => (
                     <div key={record.date} className="flex items-center justify-between p-3 border rounded-lg">
                         <div className="flex items-center space-x-4">
                            {getStatusIcon(record.status)}
                            <div>
                                <p className="font-semibold text-gray-800">{record.status}</p>
                                <p className="text-sm text-gray-500 flex items-center">
                                    <Calendar className="w-4 h-4 mr-1.5" />
                                    {record.date}
                                </p>
                            </div>
                         </div>
                         {record.subject && record.subject !== 'All' && (
                             <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{record.subject}</span>
                         )}
                     </div>
                ))}
            </div>
        </div>
    );
};

const AttendancePage: React.FC = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Attendance</h1>
            {user?.role === 'Faculty' ? <FacultyAttendanceView /> : <StudentParentAttendanceView />}
        </div>
    );
};

export default AttendancePage;