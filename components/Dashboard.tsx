import React, { useContext } from 'react';
import StatCard from './StatCard';
import AttendanceChart from './AttendanceChart';
import FeeChart from './FeeChart';
import UpcomingEvents from './UpcomingEvents';
import RecentActivities from './RecentActivities';
import { Users, User, Banknote, FilePlus, BellPlus, UserPlus, CreditCard, BarChart3, BookOpen, CalendarCheck, FileText } from 'lucide-react';
import { initialStatCards, adminAttendanceData, initialFeeData, upcomingEvents, initialRecentActivities, facultyStatCards, studentStatCards, studentAttendanceData, parentStatCards } from '../data/mockData';
import { Page } from '../App';
import { AuthContext } from '../contexts/AuthContext';
import { StatCardData } from '../types';

interface DashboardProps {
  navigateTo: (page: Page, action?: string) => void;
}

const QuickActionButton: React.FC<{ icon: React.ElementType; label: string; onClick?: () => void; }> = ({ icon: Icon, label, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center space-y-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition-all text-center">
        <div className="p-3 bg-brand-blue-100 rounded-full">
            <Icon className="w-6 h-6 text-brand-blue-600" />
        </div>
        <span className="text-sm font-medium text-gray-600">{label}</span>
    </button>
);

const AdminDashboard: React.FC<{ navigateTo: (page: Page, action?: string) => void }> = ({ navigateTo }) => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {initialStatCards.map((stat) => <StatCard key={stat.title} {...stat} />)}
    </div>
    <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <QuickActionButton icon={UserPlus} label="Add Student" onClick={() => navigateTo('Students', 'add')}/>
            <QuickActionButton icon={FilePlus} label="New Admission" onClick={() => alert('New Admission Clicked!')}/>
            <QuickActionButton icon={CreditCard} label="Collect Fees" onClick={() => navigateTo('Fee Management')}/>
            <QuickActionButton icon={BellPlus} label="Send Notice" onClick={() => navigateTo('Communication')}/>
            <QuickActionButton icon={BarChart3} label="View Reports" onClick={() => navigateTo('Reports')}/>
            <QuickActionButton icon={Users} label="Manage Staff" onClick={() => navigateTo('Faculty')}/>
        </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2"><FeeChart data={initialFeeData} /></div>
        <div><AttendanceChart data={adminAttendanceData} /></div>
    </div>
  </>
);

const FacultyDashboard: React.FC<{ navigateTo: (page: Page) => void }> = ({ navigateTo }) => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {facultyStatCards.map((stat) => <StatCard key={stat.title} {...stat} />)}
      </div>
      <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <QuickActionButton icon={CalendarCheck} label="Take Attendance" onClick={() => navigateTo('Attendance')}/>
              <QuickActionButton icon={FileText} label="Enter Marks" onClick={() => alert('Enter Marks Clicked!')}/>
              <QuickActionButton icon={BookOpen} label="Upload Material" onClick={() => navigateTo('Academics')}/>
              <QuickActionButton icon={BellPlus} label="Send to Class" onClick={() => navigateTo('Communication')}/>
          </div>
      </div>
    </>
);

const StudentParentDashboard: React.FC<{ navigateTo: (page: Page) => void, stats: StatCardData[] }> = ({ navigateTo, stats }) => (
    <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat) => <StatCard key={stat.title} {...stat} />)}
        </div>
        <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Links</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <QuickActionButton icon={BookOpen} label="Timetable" onClick={() => navigateTo('Academics')}/>
                <QuickActionButton icon={FileText} label="View Results" onClick={() => navigateTo('Reports')}/>
                <QuickActionButton icon={CreditCard} label="Pay Fees" onClick={() => navigateTo('Fee Management')}/>
                <QuickActionButton icon={CalendarCheck} label="Attendance" onClick={() => navigateTo('Attendance')}/>
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-3"><AttendanceChart data={studentAttendanceData} title="My Attendance" /></div>
        </div>
    </>
);


const Dashboard: React.FC<DashboardProps> = ({ navigateTo }) => {
  const { user } = useContext(AuthContext);

  const renderDashboardContent = () => {
    switch(user?.role) {
      case 'Admin':
        return <AdminDashboard navigateTo={navigateTo} />;
      case 'Faculty':
        return <FacultyDashboard navigateTo={navigateTo} />;
      case 'Student':
        return <StudentParentDashboard navigateTo={navigateTo} stats={studentStatCards} />;
      case 'Parent':
        return <StudentParentDashboard navigateTo={navigateTo} stats={parentStatCards} />;
      default:
        return <p>No dashboard view available for this role.</p>;
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{user?.role} Dashboard</h1>
      {renderDashboardContent()}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingEvents events={upcomingEvents} />
        <RecentActivities activities={initialRecentActivities} />
      </div>
    </div>
  );
};

export default Dashboard;