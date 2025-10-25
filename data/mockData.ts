import { StatCardData, FeeData, AttendanceData, UpcomingEvent, RecentActivity, Student, Faculty, Subject, TimeTableEntry, FeeRecord, AttendanceRecord } from '../types';
import { Users, User, Banknote, BookCopy, CheckCircle, Percent } from 'lucide-react';

// =================================================================
// Dashboard Data
// =================================================================

// Admin Stats
export const initialStatCards: StatCardData[] = [
  { title: 'Total Students', value: '2,450', change: '+2.5%', changeType: 'increase', icon: Users, color: 'text-blue-500' },
  { title: 'Total Faculty', value: '125', change: '+1.2%', changeType: 'increase', icon: User, color: 'text-green-500' },
  { title: 'Fees Collected (Month)', value: '₹45.6L', change: '+10.2%', changeType: 'increase', icon: Banknote, color: 'text-yellow-500' },
  { title: 'Pending Fees (Month)', value: '₹2.3L', change: '-1.5%', changeType: 'decrease', icon: Banknote, color: 'text-red-500' },
];

export const adminAttendanceData: AttendanceData[] = [
  { name: 'Students', value: 92, color: '#3b82f6' },
  { name: 'Staff', value: 98, color: '#10b981' },
];

export const initialFeeData: FeeData[] = [
  { month: 'Apr', collected: 8.2, due: 9.5 },
  { month: 'May', collected: 8.9, due: 9.5 },
  { month: 'Jun', collected: 9.1, due: 9.5 },
  { month: 'Jul', collected: 8.5, due: 9.5 },
  { month: 'Aug', collected: 9.2, due: 9.5 },
  { month: 'Sep', collected: 8.8, due: 9.5 },
  { month: 'Oct', collected: 4.5, due: 9.5 },
];

// Faculty Stats
export const facultyStatCards: StatCardData[] = [
    { title: 'Assigned Classes', value: '4', icon: BookCopy, color: 'text-blue-500' },
    { title: 'Total Students', value: '128', icon: Users, color: 'text-green-500' },
    { title: 'Avg. Attendance', value: '94%', icon: CheckCircle, color: 'text-yellow-500' },
    { title: 'Assignments Due', value: '3', icon: Banknote, color: 'text-red-500' },
];

// Student & Parent Stats
export const studentStatCards: StatCardData[] = [
    { title: 'Overall Attendance', value: '93%', icon: CheckCircle, color: 'text-green-500' },
    { title: 'Current Grade', value: '88.5%', icon: Percent, color: 'text-blue-500' },
    { title: 'Fees Due', value: '₹2,500', icon: Banknote, color: 'text-red-500' },
    { title: 'Assignments', value: '2 Pending', icon: BookCopy, color: 'text-yellow-500' },
];

export const parentStatCards: StatCardData[] = [
    { title: 'Child\'s Attendance', value: '93%', icon: CheckCircle, color: 'text-green-500' },
    { title: 'Child\'s Grade', value: '88.5%', icon: Percent, color: 'text-blue-500' },
    { title: 'Fees Due', value: '₹2,500', icon: Banknote, color: 'text-red-500' },
    { title: 'Upcoming PTM', value: 'Oct 28', icon: Users, color: 'text-yellow-500' },
];


export const studentAttendanceData: AttendanceData[] = [
    { name: 'Present', value: 93, color: '#3b82f6' },
    { name: 'Absent', value: 7, color: '#ef4444' },
];


// Common Data
export const upcomingEvents: UpcomingEvent[] = [
    { title: 'Parent-Teacher Meeting', date: 'Oct 28, 2025', category: 'Meeting' },
    { title: 'Mid-Term Examinations', date: 'Nov 05, 2025', category: 'Academic' },
    { title: 'Annual Sports Day', date: 'Nov 20, 2025', category: 'Activity' },
    { title: 'Diwali Break', date: 'Nov 10-15, 2025', category: 'Holiday' },
];

const sampleUsers = [
    { name: 'Admin', avatar: 'https://i.pravatar.cc/150?u=admin' },
    { name: 'Mrs. Gita Singh', avatar: 'https://i.pravatar.cc/150?u=gita' },
    { name: 'Accounts Dept.', avatar: 'https://i.pravatar.cc/150?u=accounts' },
    { name: 'Mr. Vivek Sharma', avatar: 'https://i.pravatar.cc/150?u=vivek' },
];

export const initialRecentActivities: RecentActivity[] = [
  { user: { name: 'Admin', avatar: sampleUsers[0].avatar }, action: 'Added a new student: Rohan Sharma.', timestamp: '2 hours ago' },
  { user: { name: 'Mrs. Gita Singh', avatar: sampleUsers[1].avatar }, action: 'Published results for Class 10th.', timestamp: '5 hours ago' },
  { user: { name: 'Accounts Dept.', avatar: sampleUsers[2].avatar }, action: 'Sent fee reminders for October.', timestamp: '1 day ago' },
  { user: { name: 'Admin', avatar: sampleUsers[0].avatar }, action: 'Updated the school event calendar.', timestamp: '2 days ago' },
];

// =================================================================
// Student Data
// =================================================================
const studentsData: Omit<Student, 'id'>[] = [
  { name: 'Aarav Sharma', admissionNumber: 'S2023001', class: '10', section: 'A', dob: '2008-05-15', guardianName: 'Rakesh Sharma', guardianPhone: '9876543210', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=S2023001' },
  { name: 'Vihaan Singh', admissionNumber: 'S2023002', class: '9', section: 'B', dob: '2009-02-20', guardianName: 'Sunita Singh', guardianPhone: '9876543211', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=S2023002' },
  { name: 'Aanya Gupta', admissionNumber: 'S2023003', class: '11', section: 'C', dob: '2007-11-30', guardianName: 'Manoj Gupta', guardianPhone: '9876543212', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=S2023003' },
  { name: 'Advik Patel', admissionNumber: 'S2023004', class: '10', section: 'A', dob: '2008-08-12', guardianName: 'Jignesh Patel', guardianPhone: '9876543213', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?u=S2023004' },
];
export const mockStudents: Student[] = studentsData.map((s, i) => ({ ...s, id: `student-${i + 1}` }));


// =================================================================
// Faculty Data
// =================================================================
const facultyData: Omit<Faculty, 'id'>[] = [
  { name: 'Dr. Ramesh Kumar', employeeId: 'F202001', department: 'Science', subject: 'Physics', joinDate: '2020-07-15', email: 'ramesh.k@school.com', phone: '9123456780', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=F202001' },
  { name: 'Mrs. Sunita Sharma', employeeId: 'F201802', department: 'Mathematics', subject: 'Mathematics', joinDate: '2018-03-10', email: 'sunita.s@school.com', phone: '9123456781', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=F201802' },
  { name: 'Mr. Anil Verma', employeeId: 'F202103', department: 'Humanities', subject: 'History', joinDate: '2021-08-01', email: 'anil.v@school.com', phone: '9123456782', status: 'On Leave', avatar: 'https://i.pravatar.cc/150?u=F202103' },
  { name: 'Ms. Priya Singh', employeeId: 'F201904', department: 'Languages', subject: 'English', joinDate: '2019-06-20', email: 'priya.s@school.com', phone: '9123456783', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=F201904' },
];
export const mockFaculty: Faculty[] = facultyData.map((f, i) => ({ ...f, id: `faculty-${i + 1}` }));


// =================================================================
// Academics Data
// =================================================================
export const mockSubjects: Subject[] = [
    { id: 'sub-1', name: 'Physics', code: 'PHY101', teacher: 'Dr. Ramesh Kumar', class: '10' },
    { id: 'sub-2', name: 'Mathematics', code: 'MAT101', teacher: 'Mrs. Sunita Sharma', class: '10' },
    { id: 'sub-3', name: 'English', code: 'ENG101', teacher: 'Ms. Priya Singh', class: '10' },
    { id: 'sub-4', name: 'History', code: 'HIS101', teacher: 'Mr. Anil Verma', class: '10' },
    { id: 'sub-5', name: 'Chemistry', code: 'CHE101', teacher: 'Dr. Ramesh Kumar', class: '10' },
    { id: 'sub-6', name: 'Biology', code: 'BIO101', teacher: 'Dr. Ramesh Kumar', class: '10' },
];

export const mockTimeTable: TimeTableEntry[] = [
    { period: '1', time: '09:00 - 09:45', monday: 'Mathematics', tuesday: 'Physics', wednesday: 'English', thursday: 'History', friday: 'Mathematics' },
    { period: '2', time: '09:45 - 10:30', monday: 'Physics', tuesday: 'English', wednesday: 'Mathematics', thursday: 'Physics', friday: 'English' },
    { period: '3', time: '10:45 - 11:30', monday: 'English', tuesday: 'History', wednesday: 'Chemistry', thursday: 'Mathematics', friday: 'Physics' },
    { period: '4', time: '11:30 - 12:15', monday: 'History', tuesday: 'Chemistry', wednesday: 'Biology', thursday: 'English', friday: 'History' },
    { period: '5', time: '01:00 - 01:45', monday: 'Chemistry', tuesday: 'Biology', wednesday: 'Physics', thursday: 'Biology', friday: 'Chemistry' },
];

// =================================================================
// Fee Management Data
// =================================================================
export const mockFeeRecords: FeeRecord[] = [
    { id: 'fee-1', invoiceNumber: 'INV20231001', date: '2025-10-05', amount: 12500, status: 'Paid', paymentMethod: 'Credit Card' },
    { id: 'fee-2', invoiceNumber: 'INV20230901', date: '2025-09-05', amount: 12500, status: 'Paid', paymentMethod: 'UPI' },
    { id: 'fee-3', invoiceNumber: 'INV20230801', date: '2025-08-06', amount: 12500, status: 'Paid', paymentMethod: 'Net Banking' },
    { id: 'fee-4', invoiceNumber: 'INV20231101', date: '2025-11-05', amount: 12500, status: 'Due' },
];

// =================================================================
// Attendance Data
// =================================================================
export const mockAttendanceRecords: AttendanceRecord[] = [
    { date: '2025-10-23', status: 'Present', subject: 'All' },
    { date: '2025-10-22', status: 'Present', subject: 'All' },
    { date: '2025-10-21', status: 'Absent', subject: 'All' },
    { date: '2025-10-20', status: 'Present', subject: 'All' },
    { date: '2025-10-19', status: 'Late', subject: 'Mathematics' },
];