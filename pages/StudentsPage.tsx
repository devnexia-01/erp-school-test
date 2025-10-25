import React, { useState, useMemo, useEffect, useContext } from 'react';
import { Plus, Search, User } from 'lucide-react';
import { Student } from '../types';
import { mockStudents } from '../data/mockData';
import StudentTable from '../components/students/StudentTable';
import StudentForm from '../components/students/StudentForm';
import { AuthContext } from '../contexts/AuthContext';

interface StudentsPageProps {
  initialAction: string | null;
  setInitialAction: (action: string | null) => void;
}

const StudentsPage: React.FC<StudentsPageProps> = ({ initialAction, setInitialAction }) => {
  const { user } = useContext(AuthContext);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  useEffect(() => {
    if (initialAction === 'add' && user?.role === 'Admin') {
      handleAddStudent();
      setInitialAction(null);
    }
  }, [initialAction, setInitialAction, user]);

  const handleAddStudent = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleDeleteStudent = (studentId: string) => {
    if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      setStudents(students.filter(s => s.id !== studentId));
    }
  };

  const handleSaveStudent = (studentData: Student) => {
    if (editingStudent) {
      setStudents(students.map(s => s.id === studentData.id ? studentData : s));
    } else {
      setStudents([studentData, ...students]);
    }
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  const filteredStudents = useMemo(() => {
    if (user?.role === 'Student' || user?.role === 'Parent') {
        return students.filter(s => s.id === user.studentId);
    }
    return students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm, user]);

  if (user?.role === 'Student' || user?.role === 'Parent') {
      const studentProfile = students.find(s => s.id === user.studentId);
      if (!studentProfile) return <div className="text-center p-8 text-red-500">Could not find student profile.</div>;
      
      return (
          <div className="container mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                      <img src={studentProfile.avatar} alt={studentProfile.name} className="w-32 h-32 rounded-full object-cover ring-4 ring-brand-blue-200" />
                      <div className="text-center md:text-left">
                          <h2 className="text-2xl font-bold text-gray-900">{studentProfile.name}</h2>
                          <p className="text-md text-gray-500">Admission No: {studentProfile.admissionNumber}</p>
                          <p className="text-md text-gray-500">Class: {studentProfile.class}-{studentProfile.section}</p>
                          <span className={`mt-2 inline-block px-3 py-1 text-sm font-medium rounded-full ${studentProfile.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{studentProfile.status}</span>
                      </div>
                  </div>
                   <div className="border-t my-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div><strong>Date of Birth:</strong> {studentProfile.dob}</div>
                        <div><strong>Guardian:</strong> {studentProfile.guardianName}</div>
                        <div><strong>Guardian Phone:</strong> {studentProfile.guardianPhone}</div>
                    </div>
              </div>
          </div>
      )
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Students</h1>
        {user?.role === 'Admin' && (
            <button
            onClick={handleAddStudent}
            className="flex items-center bg-brand-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-brand-blue-700 transition-colors"
            >
            <Plus className="w-5 h-5 mr-2" />
            Add Student
            </button>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center mb-4">
            <div className="relative w-full max-w-sm">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search by name or admission no..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-brand-blue-500"
              />
            </div>
        </div>

        <StudentTable
          students={filteredStudents}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
          canEdit={user?.role === 'Admin'}
        />
      </div>
      
      {user?.role === 'Admin' && (
        <StudentForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveStudent}
            student={editingStudent}
        />
      )}
    </div>
  );
};

export default StudentsPage;