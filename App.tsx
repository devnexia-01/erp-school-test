import React, { useState, useContext } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import StudentsPage from './pages/StudentsPage';
import FacultyPage from './pages/FacultyPage';
import AcademicsPage from './pages/AcademicsPage';
import FeeManagementPage from './pages/FeeManagementPage';
import AttendancePage from './pages/AttendancePage';
import ReportsPage from './pages/ReportsPage';
import CommunicationPage from './pages/CommunicationPage';
import LoginPage from './pages/LoginPage';
import { AuthContext } from './contexts/AuthContext';
import { UserRole } from './types';

export type Page = 'Dashboard' | 'Students' | 'Faculty' | 'Academics' | 'Fee Management' | 'Attendance' | 'Reports' | 'Communication';

const adminPages: Page[] = ['Dashboard', 'Students', 'Faculty', 'Academics', 'Fee Management', 'Attendance', 'Reports', 'Communication'];
const facultyPages: Page[] = ['Dashboard', 'Students', 'Academics', 'Attendance', 'Communication'];
const studentPages: Page[] = ['Dashboard', 'Academics', 'Fee Management', 'Attendance', 'Reports'];
const parentPages: Page[] = ['Dashboard', 'Academics', 'Fee Management', 'Attendance', 'Reports'];


const pagePermissions: Record<UserRole, Page[]> = {
    Admin: adminPages,
    Faculty: facultyPages,
    Student: studentPages,
    Parent: parentPages,
};


const App: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard');
  const [initialAction, setInitialAction] = useState<string | null>(null);

  const navigateTo = (page: Page, action: string | null = null) => {
    if (user && pagePermissions[user.role].includes(page)) {
      setCurrentPage(page);
      setInitialAction(action);
      if(sidebarOpen) {
        setSidebarOpen(false);
      }
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard navigateTo={navigateTo} />;
      case 'Students':
        return <StudentsPage initialAction={initialAction} setInitialAction={setInitialAction}/>;
      case 'Faculty':
        return <FacultyPage />;
      case 'Academics':
        return <AcademicsPage />;
      case 'Fee Management':
        return <FeeManagementPage />;
      case 'Attendance':
        return <AttendancePage />;
      case 'Reports':
        return <ReportsPage />;
      case 'Communication':
        return <CommunicationPage />;
      default:
        return <Dashboard navigateTo={navigateTo} />; // Fallback to dashboard
    }
  };

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        currentPage={currentPage}
        navigateTo={navigateTo}
        userRole={user.role}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
            setSidebarOpen={setSidebarOpen} 
            navigateTo={navigateTo}
            logout={logout}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;