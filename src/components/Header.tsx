import React from 'react';
import { Coffee, Menu, Bell, User } from 'lucide-react';

type UserRole = 'coffeeshop_owner' | 'stall_owner' | 'customer';

interface User {
  id: string;
  name: string;
  role: UserRole;
  stallId?: string;
}

interface HeaderProps {
  user: User;
  onToggleSidebar: () => void;
  onSwitchUser: (role: UserRole) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onToggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 h-full">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center space-x-3">
            <Coffee className="text-red-600" size={24} />
            <div>
              <h1 className="text-lg font-bold text-gray-900">SG Food Court Manager</h1>
              <p className="text-xs text-gray-500">Singapore Ready Platform</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-xs text-gray-500 capitalize">
              {user.role.replace('_', ' ')}
            </div>
          </div>
          
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>
          
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;