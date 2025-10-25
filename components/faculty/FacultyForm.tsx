import React, { useState, useEffect } from 'react';
import { Faculty } from '../../types';
import { X } from 'lucide-react';

interface FacultyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (faculty: Faculty) => void;
  facultyMember: Faculty | null;
}

const initialFormState: Omit<Faculty, 'id' | 'avatar'> = {
  name: '',
  employeeId: '',
  department: '',
  subject: '',
  joinDate: '',
  email: '',
  phone: '',
  status: 'Active',
};

const FacultyForm: React.FC<FacultyFormProps> = ({ isOpen, onClose, onSave, facultyMember }) => {
  const [formData, setFormData] = useState(initialFormState);
  const isEditing = !!facultyMember;

  useEffect(() => {
    if (facultyMember) {
      setFormData(facultyMember);
    } else {
      setFormData(initialFormState);
    }
  }, [facultyMember, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.employeeId || !formData.subject) {
        alert('Please fill in all required fields: Name, Employee ID, and Subject.');
        return;
    }

    const facultyToSave: Faculty = {
      ...formData,
      id: isEditing ? facultyMember.id : new Date().toISOString(),
      avatar: isEditing ? facultyMember.avatar : `https://i.pravatar.cc/150?u=${new Date().toISOString()}`,
    };
    onSave(facultyToSave);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="faculty-form-title"
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4"
        onClick={e => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center p-4 border-b">
                <h2 id="faculty-form-title" className="text-xl font-semibold text-gray-800">
                {isEditing ? 'Edit Faculty' : 'Add New Faculty'}
                </h2>
                <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close"
                >
                <X size={24} />
                </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500" required/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                        <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500" required/>
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <input type="text" name="department" value={formData.department} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Primary Subject</label>
                        <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500" required/>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
                    <input type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"/>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"/>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500">
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>On Leave</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end items-center p-4 border-t bg-gray-50 rounded-b-lg">
                <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 mr-2"
                >
                Cancel
                </button>
                <button
                type="submit"
                className="px-4 py-2 bg-brand-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-brand-blue-700"
                >
                Save Faculty
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default FacultyForm;