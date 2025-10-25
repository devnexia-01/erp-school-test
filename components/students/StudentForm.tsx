
import React, { useState, useEffect } from 'react';
import { Student } from '../../types';
import { X } from 'lucide-react';

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: Student) => void;
  student: Student | null;
}

const initialFormState: Omit<Student, 'id' | 'avatar'> = {
  name: '',
  admissionNumber: '',
  class: '',
  section: '',
  dob: '',
  guardianName: '',
  guardianPhone: '',
  status: 'Active',
};

const StudentForm: React.FC<StudentFormProps> = ({ isOpen, onClose, onSave, student }) => {
  const [formData, setFormData] = useState(initialFormState);
  const isEditing = !!student;

  useEffect(() => {
    if (student) {
      setFormData(student);
    } else {
      setFormData(initialFormState);
    }
  }, [student, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.class || !formData.admissionNumber) {
        alert('Please fill in all required fields: Name, Admission Number, and Class.');
        return;
    }

    const studentToSave: Student = {
      ...formData,
      id: isEditing ? student.id : new Date().toISOString(), // Use existing ID or generate a new one
      avatar: isEditing ? student.avatar : `https://i.pravatar.cc/150?u=${new Date().toISOString()}`,
    };
    onSave(studentToSave);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-title"
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4"
        onClick={e => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center p-4 border-b">
                <h2 id="form-title" className="text-xl font-semibold text-gray-800">
                {isEditing ? 'Edit Student' : 'Add New Student'}
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
                {/* Form fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500" required/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Admission Number</label>
                        <input type="text" name="admissionNumber" value={formData.admissionNumber} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500" required/>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                        <input type="text" name="class" value={formData.class} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500" required/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                        <input type="text" name="section" value={formData.section} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"/>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"/>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Guardian's Name</label>
                        <input type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Guardian's Phone</label>
                        <input type="tel" name="guardianPhone" value={formData.guardianPhone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"/>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500">
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Graduated</option>
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
                Save Student
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
