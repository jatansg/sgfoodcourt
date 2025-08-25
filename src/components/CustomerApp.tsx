import React, { useState } from 'react';
import { 
  Coffee, 
  ShoppingCart, 
  Star,
  Clock,
  Plus,
  Minus,
  Search,
  Filter,
  MapPin,
  Phone
} from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  stallName: string;
  cuisine: string;
  rating: number;
  preparationTime: number;
  image?: string;
  spicyLevel?: number;
  isHalal?: boolean;
  isVegetarian?: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const CustomerApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const menuItems: MenuItem[] = [
    {
      id: 'item1',
      name: 'Sweet & Sour Pork',
      description: 'Crispy pork with pineapple and bell peppers in tangy sauce',
      price: 12.50,
      stallName: 'Uncle Lim Zi Char',
      cuisine: 'Chinese',
      rating: 4.8,
      preparationTime: 15,
      spicyLevel: 1
    },
    {
      id: 'item2',
      name: 'Yang Chow Fried Rice',
      description: 'Traditional fried rice with prawns, char siu and egg',
      price: 8.50,
      stallName: 'Uncle Lim Zi Char',
      cuisine: 'Chinese',
      rating: 4.6,
      preparationTime: 10,
      spicyLevel: 0
    },
    {
      id: 'item3',
      name: 'Laksa',
      description: 'Spicy coconut curry noodle soup with prawns and cockles',
      price: 6.00,
      stallName: 'Mei Ling Noodles',
      cuisine: 'Chinese',
      rating: 4.7,
      preparationTime: 12,
      spicyLevel: 2
    },
    {
      id: 'item4',
      name: 'Chicken Murtabak',
      description: 'Crispy pancake stuffed with spiced chicken and onions',
      price: 8.00,
      stallName: 'Ahmad Murtabak',
      cuisine: 'Malay',
      rating: 4.5,
      preparationTime: 18,
      spicyLevel: 1,
      isHalal: true
    },
    {
      id: 'item5',
      name: 'Fish Head Curry',
      description: 'Authentic South Indian curry with fresh fish head',
      price: 15.80,
      stallName: 'Raj Indian Kitchen',
      cuisine: 'Indian',
      rating: 4.6,
      preparationTime: 20,
      spicyLevel: 3
    },
    {
      id: 'item6',
      name: 'Chicken Chop',
      description: 'Grilled chicken with black pepper sauce and fries',
      price: 12.00,
      stallName: 'Western Delights',
      cuisine: 'Western',
      rating: 4.4,
      preparationTime: 15,
      spicyLevel: 0
    }
  ];

  const cuisines = ['All', 'Chinese', 'Malay', 'Indian', 'Western'];
  
  const timeSlots = [
    '12:00 PM - 12:30 PM',
    '12:30 PM - 1:00 PM',
    '1:00 PM - 1:30 PM',
    '1:30 PM - 2:00 PM',
    '6:00 PM - 6:30 PM',
    '6:30 PM - 7:00 PM',
    '7:00 PM - 7:30 PM',
    '7:30 PM - 8:00 PM'
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCuisine = selectedCuisine === 'All' || item.cuisine === selectedCuisine;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.stallName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCuisine && matchesSearch;
  });

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const renderSpicyLevel = (level: number) => {
    return '🌶️'.repeat(level);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Coffee className="text-red-600" size={28} />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Ah Seng Coffee Shop</h1>
                <p className="text-xs text-gray-500">Toa Payoh Central</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin size={16} className="mr-1" />
                <span>Blk 123, Toa Payoh Lor 1</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone size={16} className="mr-1" />
                <span>6123 4567</span>
              </div>
              <button
                onClick={() => setShowCart(true)}
                className="relative bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>S${getTotalAmount().toFixed(2)}</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Peak Hours Banner */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">🍽️ Peak Hour Pre-Order</h2>
              <p className="text-red-100">Order now for lunch (12-2pm) or dinner (6-8pm) to skip the queue!</p>
            </div>
            <Clock className="text-red-100" size={48} />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for dishes or stalls..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {cuisines.map(cuisine => (
                <button
                  key={cuisine}
                  onClick={() => setSelectedCuisine(cuisine)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCuisine === cuisine
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Item Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center">
                <span className="text-white text-4xl">🍽️</span>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{item.stallName}</span>
                    {item.spicyLevel > 0 && (
                      <span className="text-xs">{renderSpicyLevel(item.spicyLevel)}</span>
                    )}
                    {item.isHalal && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Halal</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400 fill-current" size={14} />
                    <span className="text-sm text-gray-600">{item.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold text-green-600">S${item.price.toFixed(2)}</div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>{item.preparationTime}min</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 md:items-center">
          <div className="bg-white w-full max-w-2xl mx-4 rounded-t-lg md:rounded-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Your Order</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-100">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.stallName}</p>
                          <p className="text-lg font-semibold text-green-600">S${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Collection Time Selection */}
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-3">Select Collection Time</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`p-3 text-sm rounded-lg border text-left ${
                            selectedTimeSlot === slot
                              ? 'border-red-500 bg-red-50 text-red-700'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span>Subtotal:</span>
                      <span>S${getTotalAmount().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span>GST (9%):</span>
                      <span>S${(getTotalAmount() * 0.09).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center font-bold text-lg border-t border-gray-200 pt-2">
                      <span>Total:</span>
                      <span className="text-green-600">S${(getTotalAmount() * 1.09).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>
                    <div className="space-y-2">
                      {['PayNow', 'GrabPay', 'Credit Card', 'Cash'].map(method => (
                        <label key={method} className="flex items-center">
                          <input type="radio" name="payment" value={method} className="mr-3" />
                          <span>{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button 
                    disabled={!selectedTimeSlot}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                  >
                    Place Order - S${(getTotalAmount() * 1.09).toFixed(2)}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerApp;