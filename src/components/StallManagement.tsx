import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Star,
  MapPin,
  Clock,
  Users,
  DollarSign
} from 'lucide-react';

interface Stall {
  id: string;
  name: string;
  owner: string;
  cuisine: string;
  description: string;
  rating: number;
  totalOrders: number;
  revenue: string;
  status: 'active' | 'inactive';
  operatingHours: string;
  contact: string;
}

const StallManagement: React.FC = () => {
  const [stalls, setStalls] = useState<Stall[]>([
    {
      id: 'stall1',
      name: 'Uncle Lim Zi Char',
      owner: 'Lim Ah Seng',
      cuisine: 'Chinese',
      description: 'Traditional zi char dishes with home-cooked flavors',
      rating: 4.8,
      totalOrders: 234,
      revenue: 'S$2,450',
      status: 'active',
      operatingHours: '11:00 AM - 9:00 PM',
      contact: '+65 9123 4567'
    },
    {
      id: 'stall2',
      name: 'Mei Ling Noodles',
      owner: 'Tan Mei Ling',
      cuisine: 'Chinese',
      description: 'Specialty laksa and mee dishes',
      rating: 4.6,
      totalOrders: 189,
      revenue: 'S$1,890',
      status: 'active',
      operatingHours: '10:30 AM - 8:30 PM',
      contact: '+65 9234 5678'
    },
    {
      id: 'stall3',
      name: 'Ahmad Murtabak',
      owner: 'Ahmad Hassan',
      cuisine: 'Malay',
      description: 'Authentic murtabak and roti prata',
      rating: 4.7,
      totalOrders: 156,
      revenue: 'S$1,560',
      status: 'active',
      operatingHours: '6:00 AM - 10:00 PM',
      contact: '+65 9345 6789'
    },
    {
      id: 'stall4',
      name: 'Raj Indian Kitchen',
      owner: 'Rajesh Kumar',
      cuisine: 'Indian',
      description: 'North and South Indian specialties',
      rating: 4.5,
      totalOrders: 98,
      revenue: 'S$1,200',
      status: 'inactive',
      operatingHours: '11:00 AM - 3:00 PM, 6:00 PM - 10:00 PM',
      contact: '+65 9456 7890'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStall, setEditingStall] = useState<Stall | null>(null);

  const cuisineTypes = ['Chinese', 'Malay', 'Indian', 'Western', 'Japanese', 'Korean', 'Thai', 'Vietnamese'];

  const handleAddStall = () => {
    setIsAddModalOpen(true);
  };

  const handleEditStall = (stall: Stall) => {
    setEditingStall(stall);
  };

  const handleDeleteStall = (stallId: string) => {
    setStalls(stalls.filter(stall => stall.id !== stallId));
  };

  return (
    <div className="space-y-6 mt-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stall Management</h1>
          <p className="text-gray-600">Manage all food stalls in your coffee shop</p>
        </div>
        <button
          onClick={handleAddStall}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add New Stall</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Stalls</p>
              <p className="text-2xl font-bold text-gray-900">{stalls.length}</p>
            </div>
            <Users className="text-blue-600" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Stalls</p>
              <p className="text-2xl font-bold text-green-600">{stalls.filter(s => s.status === 'active').length}</p>
            </div>
            <Star className="text-green-600" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-blue-600">{stalls.reduce((sum, stall) => sum + stall.totalOrders, 0)}</p>
            </div>
            <MapPin className="text-blue-600" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">S$7,100</p>
            </div>
            <DollarSign className="text-green-600" size={24} />
          </div>
        </div>
      </div>

      {/* Stalls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {stalls.map((stall) => (
          <div key={stall.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{stall.name}</h3>
                  <p className="text-sm text-gray-600">{stall.owner}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  stall.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {stall.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{stall.cuisine}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400 fill-current" size={14} />
                    <span className="text-sm text-gray-600">{stall.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{stall.description}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock size={14} />
                  <span>{stall.operatingHours}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Total Orders</p>
                  <p className="text-lg font-semibold text-blue-600">{stall.totalOrders}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Revenue</p>
                  <p className="text-lg font-semibold text-green-600">{stall.revenue}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditStall(stall)}
                  className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 flex items-center justify-center space-x-1"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteStall(stall.id)}
                  className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 flex items-center justify-center space-x-1"
                >
                  <Trash2 size={16} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(isAddModalOpen || editingStall) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingStall ? 'Edit Stall' : 'Add New Stall'}
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stall Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter stall name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter owner name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option value="">Select cuisine type</option>
                  {cuisineTypes.map(cuisine => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  rows={3}
                  placeholder="Describe the stall's specialties"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="+65 1234 5678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Operating Hours</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="11:00 AM - 9:00 PM"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingStall(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                {editingStall ? 'Update Stall' : 'Add Stall'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StallManagement;