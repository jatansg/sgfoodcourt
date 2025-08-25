import React from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  TrendingUp,
  Clock,
  Star,
  MapPin
} from 'lucide-react';

type UserRole = 'coffeeshop_owner' | 'stall_owner';

interface DashboardProps {
  userRole: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const ownerStats = [
    { label: 'Daily Revenue', value: 'S$2,450', change: '+12%', icon: DollarSign, color: 'text-green-600' },
    { label: 'Total Orders', value: '156', change: '+8%', icon: ShoppingBag, color: 'text-blue-600' },
    { label: 'Active Stalls', value: '8', change: '+1', icon: Users, color: 'text-purple-600' },
    { label: 'Peak Hour Sales', value: 'S$1,200', change: '+15%', icon: TrendingUp, color: 'text-red-600' },
  ];

  const stallStats = [
    { label: 'Today\'s Revenue', value: 'S$380', change: '+5%', icon: DollarSign, color: 'text-green-600' },
    { label: 'Orders Completed', value: '42', change: '+3', icon: ShoppingBag, color: 'text-blue-600' },
    { label: 'Average Rating', value: '4.8', change: '+0.1', icon: Star, color: 'text-yellow-600' },
    { label: 'Peak Orders', value: '28', change: '+7', icon: Clock, color: 'text-red-600' },
  ];

  const stats = userRole === 'coffeeshop_owner' ? ownerStats : stallStats;

  const recentOrders = [
    { id: '#SG001', stall: 'Uncle Lim Zi Char', items: 'Sweet & Sour Pork, Fried Rice', amount: 'S$18.50', status: 'preparing', time: '12:45 PM' },
    { id: '#SG002', stall: 'Mei Ling Noodles', items: 'Laksa, Mee Goreng', amount: 'S$12.00', status: 'ready', time: '12:50 PM' },
    { id: '#SG003', stall: 'Ahmad Murtabak', items: 'Chicken Murtabak, Teh Tarik', amount: 'S$15.80', status: 'completed', time: '1:00 PM' },
    { id: '#SG004', stall: 'Western Delights', items: 'Fish & Chips, Iced Lemon Tea', amount: 'S$14.50', status: 'preparing', time: '1:05 PM' },
  ];

  const peakHours = [
    { period: 'Lunch Rush', time: '12:00 PM - 2:00 PM', orders: 89, revenue: 'S$1,200' },
    { period: 'Dinner Peak', time: '6:00 PM - 8:00 PM', orders: 67, revenue: 'S$950' },
  ];

  return (
    <div className="space-y-6 mt-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {userRole === 'coffeeshop_owner' ? 'Coffee Shop Dashboard' : 'Stall Dashboard'}
          </h1>
          <p className="text-gray-600">
            {userRole === 'coffeeshop_owner' 
              ? 'Manage your food court operations across Singapore' 
              : 'Track your stall performance and orders'
            }
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <MapPin size={16} />
          <span>Singapore, SG</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
            <p className={`text-sm mt-2 ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change} from yesterday
            </p>
          </div>
        ))}
      </div>

      {/* Peak Hours Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Peak Hours Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {peakHours.map((period, index) => (
            <div key={index} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{period.period}</h3>
                <Clock size={16} className="text-gray-500" />
              </div>
              <p className="text-sm text-gray-600 mb-3">{period.time}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Orders</p>
                  <p className="text-lg font-semibold text-blue-600">{period.orders}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Revenue</p>
                  <p className="text-lg font-semibold text-green-600">{period.revenue}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Stall</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{order.stall}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{order.items}</td>
                  <td className="py-4 px-6 text-sm font-medium text-green-600">{order.amount}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'ready' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;