import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  EyeOff,
  Clock,
  DollarSign,
  Star,
  Camera
} from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isAvailable: boolean;
  preparationTime: number;
  rating: number;
  orders: number;
  image?: string;
  spicyLevel?: number;
  isHalal?: boolean;
  isVegetarian?: boolean;
}

interface MenuManagementProps {
  stallId?: string;
}

const MenuManagement: React.FC<MenuManagementProps> = ({ stallId }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 'item1',
      name: 'Sweet & Sour Pork',
      description: 'Crispy pork with pineapple and bell peppers in tangy sauce',
      price: 12.50,
      category: 'Main Dishes',
      isAvailable: true,
      preparationTime: 15,
      rating: 4.8,
      orders: 45,
      spicyLevel: 1
    },
    {
      id: 'item2',
      name: 'Yang Chow Fried Rice',
      description: 'Traditional fried rice with prawns, char siu and egg',
      price: 8.50,
      category: 'Rice & Noodles',
      isAvailable: true,
      preparationTime: 10,
      rating: 4.6,
      orders: 67,
      spicyLevel: 0
    },
    {
      id: 'item3',
      name: 'Mapo Tofu',
      description: 'Silky tofu in spicy Sichuan sauce with minced pork',
      price: 9.80,
      category: 'Main Dishes',
      isAvailable: false,
      preparationTime: 12,
      rating: 4.7,
      orders: 23,
      spicyLevel: 3
    },
    {
      id: 'item4',
      name: 'Chinese Herbal Soup',
      description: 'Nourishing soup with ginseng and herbs',
      price: 6.00,
      category: 'Soups',
      isAvailable: true,
      preparationTime: 20,
      rating: 4.5,
      orders: 12,
      spicyLevel: 0
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Main Dishes', 'Rice & Noodles', 'Soups', 'Appetizers', 'Beverages', 'Desserts'];

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const toggleAvailability = (itemId: string) => {
    setMenuItems(menuItems.map(item => 
      item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
    ));
  };

  const handleDeleteItem = (itemId: string) => {
    setMenuItems(menuItems.filter(item => item.id !== itemId));
  };

  const renderSpicyLevel = (level: number) => {
    return '🌶️'.repeat(level);
  };

  return (
    <div className="space-y-6 mt-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-600">Manage your stall's menu items and availability</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Menu Item</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{menuItems.length}</p>
            </div>
            <DollarSign className="text-blue-600" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-green-600">{menuItems.filter(item => item.isAvailable).length}</p>
            </div>
            <Eye className="text-green-600" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-yellow-600">4.7</p>
            </div>
            <Star className="text-yellow-600" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-purple-600">{menuItems.reduce((sum, item) => sum + item.orders, 0)}</p>
            </div>
            <Clock className="text-purple-600" size={24} />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Item Image Placeholder */}
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <Camera className="text-gray-400" size={32} />
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
                <button
                  onClick={() => toggleAvailability(item.id)}
                  className={`p-2 rounded-lg ${
                    item.isAvailable ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}
                >
                  {item.isAvailable ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{item.category}</span>
                {item.spicyLevel > 0 && (
                  <span className="text-xs">{renderSpicyLevel(item.spicyLevel)}</span>
                )}
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-400 fill-current" size={12} />
                  <span className="text-xs text-gray-600">{item.rating}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
                <div>
                  <p className="text-gray-500">Price</p>
                  <p className="font-semibold text-green-600">S${item.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Prep Time</p>
                  <p className="font-semibold">{item.preparationTime}min</p>
                </div>
                <div>
                  <p className="text-gray-500">Orders</p>
                  <p className="font-semibold">{item.orders}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingItem(item)}
                  className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 flex items-center justify-center space-x-1"
                >
                  <Edit size={14} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 flex items-center justify-center space-x-1"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(isAddModalOpen || editingItem) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter item name"
                    defaultValue={editingItem?.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    defaultValue={editingItem?.category}
                  >
                    <option value="">Select category</option>
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  rows={3}
                  placeholder="Describe the dish"
                  defaultValue={editingItem?.description}
                ></textarea>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (SGD)</label>
                  <input
                    type="number"
                    step="0.50"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="0.00"
                    defaultValue={editingItem?.price}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prep Time (mins)</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="15"
                    defaultValue={editingItem?.preparationTime}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Spicy Level</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    defaultValue={editingItem?.spicyLevel || 0}
                  >
                    <option value={0}>Not Spicy</option>
                    <option value={1}>Mild 🌶️</option>
                    <option value={2}>Medium 🌶️🌶️</option>
                    <option value={3}>Spicy 🌶️🌶️🌶️</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                  <span className="ml-2 text-sm text-gray-700">Halal</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                  <span className="ml-2 text-sm text-gray-700">Vegetarian</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    defaultChecked={editingItem?.isAvailable !== false}
                  />
                  <span className="ml-2 text-sm text-gray-700">Available</span>
                </label>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingItem(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                {editingItem ? 'Update Item' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;