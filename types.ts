export type UserRole = 'Admin' | 'Faculty' | 'Student' | 'Parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  // For student/parent roles, link to studentId
  studentId?: string; 
}

export interface StatCardData {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: React.ElementType;
  color: string;
}

export interface FeeData {
  month: string;
  collected: number;
  due: number;
}

export interface AttendanceData {
  name: string;
  value: number;
  color: string;
}

export interface UpcomingEvent {
  title: string;
  date: string;
  category: 'Academic' | 'Meeting' | 'Holiday' | 'Activity';
}

export interface RecentActivity {
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  timestamp: string;
}

export interface Student {
  id: string;
  name: string;
  admissionNumber: string;
  class: string;
  section: string;
  dob: string;
  guardianName: string;
  guardianPhone: string;
  status: 'Active' | 'Inactive' | 'Graduated';
  avatar: string;
}

export interface Faculty {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  subject: string;
  joinDate: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  avatar: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacher: string;
  class: string;
}

export interface TimeTableEntry {
  period: string;
  time: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
}

export interface FeeRecord {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Due' | 'Overdue';
  paymentMethod?: string;
}

export interface AttendanceRecord {
    date: string;
    status: 'Present' | 'Absent' | 'Late' | 'Half-day';
    subject?: string;
}