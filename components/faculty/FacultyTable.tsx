import React, { useState, useMemo } from 'react';
import { Faculty } from '../../types';
import { Edit, Trash2, ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react';

interface FacultyTableProps {
  faculty: Faculty[];
  onEdit: (facultyMember: Faculty) => void;
  onDelete: (facultyId: string) => void;
  canEdit: boolean;
}

type SortKey = keyof Faculty;

const FacultyTable: React.FC<FacultyTableProps> = ({ faculty, onEdit, onDelete, canEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const rowsPerPage = 10;

  const sortedFaculty = useMemo(() => {
    return [...faculty].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [faculty, sortKey, sortOrder]);
  
  const paginatedFaculty = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedFaculty.slice(startIndex, startIndex + rowsPerPage);
  }, [currentPage, sortedFaculty]);

  const totalPages = Math.ceil(faculty.length / rowsPerPage);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };
  
  const getStatusBadge = (status: Faculty['status']) => {
    const colors = {
      Active: 'bg-green-100 text-green-800',
      Inactive: 'bg-yellow-100 text-yellow-800',
      'On Leave': 'bg-blue-100 text-blue-800'
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}>{status}</span>;
  }

  const SortableHeader: React.FC<{ aKey: SortKey, label: string }> = ({ aKey, label }) => (
    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort(aKey)}>
      <div className="flex items-center">
        {label}
        {sortKey === aKey ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : <ChevronsUpDown className="w-4 h-4 ml-1 opacity-30" />}
      </div>
    </th>
  );

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
              <SortableHeader aKey="employeeId" label="Employee ID"/>
              <SortableHeader aKey="subject" label="Subject"/>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <SortableHeader aKey="status" label="Status"/>
              {canEdit && <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedFaculty.length > 0 ? paginatedFaculty.map(f => (
              <tr key={f.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full object-cover" src={f.avatar} alt={f.name}/>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{f.name}</div>
                            <div className="text-sm text-gray-500">{f.department}</div>
                        </div>
                    </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{f.employeeId}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{f.subject}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{f.email}</div>
                    <div className="text-sm text-gray-500">{f.phone}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">{getStatusBadge(f.status)}</td>
                {canEdit && (
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => onEdit(f)} className="text-brand-blue-600 hover:text-brand-blue-900 mr-4"><Edit size={18}/></button>
                    <button onClick={() => onDelete(f.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18}/></button>
                  </td>
                )}
              </tr>
            )) : (
              <tr>
                <td colSpan={canEdit ? 6 : 5} className="text-center py-8 text-gray-500">No faculty found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between py-3 px-4 border-t">
          <span className="text-sm text-gray-700">
            Showing <span className="font-semibold">{(currentPage - 1) * rowsPerPage + 1}</span> to <span className="font-semibold">{Math.min(currentPage * rowsPerPage, faculty.length)}</span> of <span className="font-semibold">{faculty.length}</span> results
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm font-medium">{currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyTable;