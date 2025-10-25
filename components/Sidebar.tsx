import React, { useContext } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  User, 
  BookOpen, 
  CreditCard, 
  CalendarCheck, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  LogOut,
  GraduationCap,
  X
} from 'lucide-react';
import { Page } from '../App';
import { AuthContext } from '../contexts/AuthContext';
import { UserRole } from '../types';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentPage: Page;
  navigateTo: (page: Page) => void;
  userRole: UserRole;
}

const navItems: { icon: React.ElementType; label: Page, roles: UserRole[] }[] = [
  { icon: LayoutDashboard, label: 'Dashboard', roles: ['Admin', 'Faculty', 'Student', 'Parent'] },
  { icon: Users, label: 'Students', roles: ['Admin', 'Faculty'] },
  { icon: User, label: 'Faculty', roles: ['Admin'] },
  { icon: BookOpen, label: 'Academics', roles: ['Admin', 'Faculty', 'Student', 'Parent'] },
  { icon: CreditCard, label: 'Fee Management', roles: ['Admin', 'Student', 'Parent'] },
  { icon: CalendarCheck, label: 'Attendance', roles: ['Admin', 'Faculty', 'Student', 'Parent'] },
  { icon: BarChart3, label: 'Reports', roles: ['Admin', 'Student', 'Parent'] },
  { icon: MessageSquare, label: 'Communication', roles: ['Admin', 'Faculty'] },
];

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen, currentPage, navigateTo, userRole }) => {
  const { user, logout } = useContext(AuthContext);

  const NavLink: React.FC<{ icon: React.ElementType; label: Page; active?: boolean }> = ({ icon: Icon, label, active }) => (
    <button
      onClick={() => navigateTo(label)}
      className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 text-left ${
        active
          ? 'bg-brand-blue-600 text-white shadow-md'
          : 'text-gray-200 hover:bg-brand-blue-900 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span>{label}</span>
    </button>
  );
  
  const visibleNavItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)}></div>
      <aside className={`fixed lg:relative inset-y-0 left-0 bg-brand-blue-950 text-white w-64 space-y-6 py-7 px-2 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 flex flex-col`}>
        <div className="px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-8 h-8 text-brand-blue-400" />
            <span className="text-xl font-bold text-white">School ERP</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-300 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {visibleNavItems.map((item) => (
            <NavLink key={item.label} icon={item.icon} label={item.label} active={currentPage === item.label} />
          ))}
        </nav>

        <div>
            <div className="border-t border-brand-blue-800 my-4"></div>
             <button
                className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 text-left text-gray-200 hover:bg-brand-blue-900 hover:text-white`}
              >
                <Settings className="w-5 h-5 mr-3" />
                <span>Settings</span>
              </button>
             <button
                onClick={logout}
                className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 text-left text-gray-200 hover:bg-brand-blue-900 hover:text-white`}
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span>Logout</span>
              </button>
            {user && (
              <div className="px-4 py-4 mt-2">
                <div className="flex items-center space-x-4 p-3 bg-brand-blue-900 rounded-lg">
                    <img className="h-10 w-10 rounded-full" src={user.avatar} alt="User avatar"/>
                    <div>
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                </div>
              </div>
            )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;