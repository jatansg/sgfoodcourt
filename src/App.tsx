import React, { useState, useEffect } from 'react';
import { Coffee, ShoppingCart, Clock, Users, DollarSign, ChefHat } from 'lucide-react';
import Dashboard from './components/Dashboard';
import StallManagement from './components/StallManagement';
import MenuManagement from './components/MenuManagement';
import OrderManagement from './components/OrderManagement';
import CustomerApp from './components/CustomerApp';
import POSSystem from './components/POSSystem';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

type UserRole = 'coffeeshop_owner' | 'stall_owner' | 'customer';
type View = 'dashboard' | 'stalls' | 'menu' | 'orders' | 'customer' | 'pos';

interface User {
  id: string;
  name: string;
  role: UserRole;
  stallId?: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User>({
    id: '1',
    name: 'Ah Seng Coffee Shop',
    role: 'coffeeshop_owner'
  });
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Demo user switching
  const switchUser = (role: UserRole) => {
    const users = {
      coffeeshop_owner: { id: '1', name: 'Ah Seng Coffee Shop', role: 'coffeeshop_owner' as UserRole },
      stall_owner: { id: '2', name: 'Uncle Lim Zi Char', role: 'stall_owner' as UserRole, stallId: 'stall1' },
      customer: { id: '3', name: 'Customer', role: 'customer' as UserRole }
    };
    setCurrentUser(users[role]);
    setCurrentView(role === 'customer' ? 'customer' : 'dashboard');
  };

  const renderContent = () => {
    if (currentUser.role === 'customer') {
      return <CustomerApp />;
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard userRole={currentUser.role} />;
      case 'stalls':
        return <StallManagement />;
      case 'menu':
        return <MenuManagement stallId={currentUser.stallId} />;
      case 'orders':
        return <OrderManagement userRole={currentUser.role} stallId={currentUser.stallId} />;
      case 'pos':
        return <POSSystem />;
      default:
        return <Dashboard userRole={currentUser.role} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentUser.role !== 'customer' && (
        <Header 
          user={currentUser} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onSwitchUser={switchUser}
        />
      )}
      
      <div className="flex">
        {currentUser.role !== 'customer' && (
          <Sidebar
            isOpen={isSidebarOpen}
            userRole={currentUser.role}
            currentView={currentView}
            onViewChange={setCurrentView}
          />
        )}
        
        <main className={`flex-1 transition-all duration-300 ${
          currentUser.role !== 'customer' && isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}>
          <div className={currentUser.role !== 'customer' ? 'p-6' : ''}>
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Demo user switcher for testing */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border">
        <div className="text-sm font-medium text-gray-700 mb-2">Demo Mode - Switch User:</div>
        <div className="flex gap-2">
          <button
            onClick={() => switchUser('coffeeshop_owner')}
            className={`px-3 py-1 text-xs rounded ${
              currentUser.role === 'coffeeshop_owner'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Owner
          </button>
          <button
            onClick={() => switchUser('stall_owner')}
            className={`px-3 py-1 text-xs rounded ${
              currentUser.role === 'stall_owner'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Stall
          </button>
          <button
            onClick={() => switchUser('customer')}
            className={`px-3 py-1 text-xs rounded ${
              currentUser.role === 'customer'
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Customer
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;