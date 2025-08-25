import React from 'react';
import { 
  LayoutDashboard, 
  Store, 
  Menu as MenuIcon, 
  ShoppingBag, 
  CreditCard,
  BarChart3,
  Settings,
  Coffee
} from 'lucide-react';

type UserRole = 'coffeeshop_owner' | 'stall_owner';
type View = 'dashboard' | 'stalls' | 'menu' | 'orders' | 'pos';

interface SidebarProps {
  isOpen: boolean;
  userRole: UserRole;
  currentView: View;
  onViewChange: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, userRole, currentView, onViewChange }) => {
  const menuItems = userRole === 'coffeeshop_owner' 
    ? [
        { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
        { id: 'stalls' as View, label: 'Stall Management', icon: Store },
        { id: 'orders' as View, label: 'All Orders', icon: ShoppingBag },
        { id: 'pos' as View, label: 'POS System', icon: CreditCard },
      ]
    : [
        { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
        { id: 'menu' as View, label: 'Menu Management', icon: MenuIcon },
        { id: 'orders' as View, label: 'My Orders', icon: ShoppingBag },
        { id: 'pos' as View, label: 'POS Terminal', icon: CreditCard },
      ];

  return (
    <aside className={`
      fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-lg border-r border-gray-200 
      transition-transform duration-300 z-40
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      w-64
    `}>
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors
                ${currentView === item.id
                  ? 'bg-red-50 text-red-700 border-l-4 border-red-500'
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="flex items-center space-x-3 text-sm text-gray-500">
          <Coffee size={16} />
          <span>Singapore Edition v1.0</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;