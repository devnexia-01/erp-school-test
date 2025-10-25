import React, { useContext, useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, User, LogOut } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import { Page } from '../App';


interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  navigateTo: (page: Page) => void;
  logout: () => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen, navigateTo, logout }) => {
  const { user } = useContext(AuthContext);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
            setIsProfileMenuOpen(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    if (!user) return;
    switch(user.role) {
        case 'Student':
        case 'Parent':
            navigateTo('Students');
            break;
        case 'Faculty':
             navigateTo('Faculty');
            break;
        case 'Admin':
             navigateTo('Faculty'); // Admins can see faculty list
            break;
    }
    setIsProfileMenuOpen(false);
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-2 border-gray-200 shadow-sm">
      <div className="flex items-center">
        <button onClick={() => setSidebarOpen(true)} className="text-gray-500 focus:outline-none lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative mx-4 lg:mx-0">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-5 h-5 text-gray-500" />
          </span>
          <input
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-brand-blue-500"
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="flex items-center">
        <button className="relative text-gray-600 hover:text-brand-blue-600 focus:outline-none">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
        </button>
        
        {user && (
          <div className="relative ml-4" ref={profileMenuRef}>
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 focus:outline-none p-1 rounded-full hover:bg-gray-100"
              >
                  <img className="h-9 w-9 rounded-full object-cover" src={user.avatar} alt="User avatar"/>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-700">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
              </button>
              
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border">
                    <button 
                        onClick={handleProfileClick} 
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        <User className="w-4 h-4 mr-2" />
                        My Profile
                    </button>
                    <div className="border-t my-1"></div>
                    <button 
                        onClick={logout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </button>
                </div>
              )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;