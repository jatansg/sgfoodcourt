import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye,
  Printer,
  RefreshCw,
  Filter,
  Search
} from 'lucide-react';

type UserRole = 'coffeeshop_owner' | 'stall_owner';
type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';

interface Order {
  id: string;
  customerName: string;
  stallName: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: OrderStatus;
  orderTime: string;
  collectionTime?: string;
  paymentMethod: string;
  notes?: string;
}

interface OrderManagementProps {
  userRole: UserRole;
  stallId?: string;
}

const OrderManagement: React.FC<OrderManagementProps> = ({ userRole, stallId }) => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'SG001',
      customerName: 'Tan Wei Ming',
      stallName: 'Uncle Lim Zi Char',
      items: [
        { name: 'Sweet & Sour Pork', quantity: 1, price: 12.50 },
        { name: 'Yang Chow Fried Rice', quantity: 1, price: 8.50 }
      ],
      total: 21.00,
      status: 'preparing',
      orderTime: '12:45 PM',
      collectionTime: '1:00 PM',
      paymentMethod: 'PayNow',
      notes: 'Less spicy please'
    },
    {
      id: 'SG002',
      customerName: 'Sarah Chen',
      stallName: 'Mei Ling Noodles',
      items: [
        { name: 'Laksa', quantity: 2, price: 6.00 },
        { name: 'Mee Goreng', quantity: 1, price: 5.50 }
      ],
      total: 17.50,
      status: 'ready',
      orderTime: '12:50 PM',
      collectionTime: '1:05 PM',
      paymentMethod: 'GrabPay'
    },
    {
      id: 'SG003',
      customerName: 'Kumar Raj',
      stallName: 'Ahmad Murtabak',
      items: [
        { name: 'Chicken Murtabak', quantity: 1, price: 8.00 },
        { name: 'Teh Tarik', quantity: 2, price: 1.50 }
      ],
      total: 11.00,
      status: 'completed',
      orderTime: '1:00 PM',
      collectionTime: '1:15 PM',
      paymentMethod: 'Cash'
    },
    {
      id: 'SG004',
      customerName: 'Jessica Lim',
      stallName: 'Uncle Lim Zi Char',
      items: [
        { name: 'Mapo Tofu', quantity: 1, price: 9.80 },
        { name: 'Chinese Herbal Soup', quantity: 1, price: 6.00 }
      ],
      total: 15.80,
      status: 'pending',
      orderTime: '1:05 PM',
      collectionTime: '1:20 PM',
      paymentMethod: 'PayNow',
      notes: 'Extra tofu'
    }
  ]);

  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStall = userRole === 'coffeeshop_owner' || order.stallName === 'Uncle Lim Zi Char';
    
    return matchesStatus && matchesSearch && matchesStall;
  });

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'preparing': return <RefreshCw size={16} />;
      case 'ready': return <CheckCircle size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      case 'cancelled': return <XCircle size={16} />;
    }
  };

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'ready', label: 'Ready' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <div className="space-y-6 mt-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {userRole === 'coffeeshop_owner' ? 'All Orders' : 'My Orders'}
          </h1>
          <p className="text-gray-600">
            {userRole === 'coffeeshop_owner' 
              ? 'Monitor orders across all stalls' 
              : 'Manage your stall orders and status'
            }
          </p>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2">
          <Printer size={20} />
          <span>Print Summary</span>
        </button>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {statusOptions.slice(1).map((status) => {
          const count = orders.filter(order => 
            order.status === status.value && 
            (userRole === 'coffeeshop_owner' || order.stallName === 'Uncle Lim Zi Char')
          ).length;
          
          return (
            <div key={status.value} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{status.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                </div>
                <div className={`p-2 rounded-lg ${getStatusColor(status.value as OrderStatus)}`}>
                  {getStatusIcon(status.value as OrderStatus)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by order ID or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
          <div className="md:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as OrderStatus | 'all')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Order {order.id}</h3>
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Customer:</span> {order.customerName}
                  </div>
                  <div>
                    <span className="font-medium">Stall:</span> {order.stallName}
                  </div>
                  <div>
                    <span className="font-medium">Order Time:</span> {order.orderTime}
                  </div>
                  <div>
                    <span className="font-medium">Collection:</span> {order.collectionTime}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">S${order.total.toFixed(2)}</div>
                <div className="text-sm text-gray-600">{order.paymentMethod}</div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Order Items:</h4>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span>{item.quantity}x {item.name}</span>
                    <span className="font-medium">S${(item.quantity * item.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              {order.notes && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <span className="font-medium text-gray-700">Notes:</span>
                  <p className="text-sm text-gray-600 mt-1">{order.notes}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              {order.status === 'pending' && (
                <>
                  <button
                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-1"
                  >
                    <RefreshCw size={16} />
                    <span>Start Preparing</span>
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order.id, 'cancelled')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-1"
                  >
                    <XCircle size={16} />
                    <span>Cancel</span>
                  </button>
                </>
              )}
              
              {order.status === 'preparing' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'ready')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-1"
                >
                  <CheckCircle size={16} />
                  <span>Mark Ready</span>
                </button>
              )}
              
              {order.status === 'ready' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'completed')}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center space-x-1"
                >
                  <CheckCircle size={16} />
                  <span>Mark Completed</span>
                </button>
              )}
              
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-1">
                <Eye size={16} />
                <span>View Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Clock className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">No orders match your current filters.</p>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;