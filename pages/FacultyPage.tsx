import React, { useState, useMemo, useContext } from 'react';
import { Plus, Search } from 'lucide-react';
import { Faculty } from '../types';
import { mockFaculty } from '../data/mockData';
import FacultyTable from '../components/faculty/FacultyTable';
import FacultyForm from '../components/faculty/FacultyForm';
import { AuthContext } from '../contexts/AuthContext';

const FacultyPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [faculty, setFaculty] = useState<Faculty[]>(mockFaculty);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);

  const handleAddFaculty = () => {
    setEditingFaculty(null);
    setIsModalOpen(true);
  };

  const handleEditFaculty = (facultyMember: Faculty) => {
    setEditingFaculty(facultyMember);
    setIsModalOpen(true);
  };

  const handleDeleteFaculty = (facultyId: string) => {
    if (window.confirm('Are you sure you want to delete this faculty member? This action cannot be undone.')) {
      setFaculty(faculty.filter(f => f.id !== facultyId));
    }
  };

  const handleSaveFaculty = (facultyData: Faculty) => {
    if (editingFaculty) {
      setFaculty(faculty.map(f => f.id === facultyData.id ? facultyData : f));
    } else {
      setFaculty([facultyData, ...faculty]);
    }
    setIsModalOpen(false);
    setEditingFaculty(null);
  };

  const filteredFaculty = useMemo(() => {
    return faculty.filter(f =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [faculty, searchTerm]);

  const canEdit = user?.role === 'Admin';

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Faculty</h1>
        {canEdit && (
            <button
            onClick={handleAddFaculty}
            className="flex items-center bg-brand-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-brand-blue-700 transition-colors"
            >
            <Plus className="w-5 h-5 mr-2" />
            Add Faculty
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
                placeholder="Search by name, ID or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-brand-blue-500"
              />
            </div>
        </div>

        <FacultyTable
          faculty={filteredFaculty}
          onEdit={handleEditFaculty}
          onDelete={handleDeleteFaculty}
          canEdit={canEdit}
        />
      </div>
      
      {canEdit && (
        <FacultyForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveFaculty}
            facultyMember={editingFaculty}
        />
       )}
    </div>
  );
};

export default FacultyPage;
