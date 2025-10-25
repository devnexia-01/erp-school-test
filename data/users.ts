import { User } from '../types';

// Omit password from the User type, but include it here for authentication simulation
type MockUser = User & { password?: string };

export const mockUsers: MockUser[] = [
  {
    id: 'user-1',
    name: 'Admin User',
    email: 'admin@school.com',
    password: 'admin123',
    role: 'Admin',
    avatar: 'https://i.pravatar.cc/150?u=admin',
  },
  {
    id: 'user-2',
    name: 'Dr. Ramesh Kumar',
    email: 'faculty@school.com',
    password: 'faculty123',
    role: 'Faculty',
    avatar: 'https://i.pravatar.cc/150?u=F202001',
  },
  {
    id: 'user-3',
    name: 'Aarav Sharma',
    email: 'student@school.com',
    password: 'student123',
    role: 'Student',
    avatar: 'https://i.pravatar.cc/150?u=S2023001',
    studentId: 'student-1'
  },
  {
    id: 'user-4',
    name: 'Rakesh Sharma',
    email: 'parent@school.com',
    password: 'parent123',
    role: 'Parent',
    avatar: 'https://i.pravatar.cc/150?u=parent-rakesh',
    studentId: 'student-1'
  },
];