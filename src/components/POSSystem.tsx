import React, { useState } from 'react';
import { 
  CreditCard, 
  Calculator,
  Receipt,
  Smartphone,
  DollarSign,
  CheckCircle,
  Clock,
  User
} from 'lucide-react';

interface POSItem {
  id: string;
  name: string;
  price: number;
  category: string;
  stallName: string;
}

interface POSTransaction {
  items: (POSItem & { quantity: number })[];
  subtotal: number;
  gst: number;
  total: number;
  paymentMethod: string;
  customerName?: string;
}

const POSSystem: React.FC = () => {
  const [currentTransaction, setCurrentTransaction] = useState<POSTransaction>({
    items: [],
    subtotal: 0,
    gst: 0,
    total: 0,
    paymentMethod: '',
    customerName: ''
  });
  
  const [showPayment, setShowPayment] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [customerName, setCustomerName] = useState('');

  const availableItems: POSItem[] = [
    { id: '1', name: 'Sweet & Sour Pork', price: 12.50, category: 'Main', stallName: 'Uncle Lim Zi Char' },
    { id: '2', name: 'Yang Chow Fried Rice', price: 8.50, category: 'Rice', stallName: 'Uncle Lim Zi Char' },
    { id: '3', name: 'Laksa', price: 6.00, category: 'Noodles', stallName: 'Mei Ling Noodles' },
    { id: '4', name: 'Mee Goreng', price: 5.50, category: 'Noodles', stallName: 'Mei Ling Noodles' },
    { id: '5', name: 'Chicken Murtabak', price: 8.00, category: 'Main', stallName: 'Ahmad Murtabak' },
    { id: '6', name: 'Teh Tarik', price: 1.50, category: 'Drinks', stallName: 'Ahmad Murtabak' },
    { id: '7', name: 'Fish Head Curry', price: 15.80, category: 'Main', stallName: 'Raj Indian Kitchen' },
    { id: '8', name: 'Chicken Chop', price: 12.00, category: 'Western', stallName: 'Western Delights' }
  ];

  const categories = ['All', 'Main', 'Rice', 'Noodles', 'Drinks', 'Western'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const addItem = (item: POSItem) => {
    const existingItemIndex = currentTransaction.items.findIndex(i => i.id === item.id);
    let updatedItems;

    if (existingItemIndex >= 0) {
      updatedItems = [...currentTransaction.items];
      updatedItems[existingItemIndex].quantity += 1;
    } else {
      updatedItems = [...currentTransaction.items, { ...item, quantity: 1 }];
    }

    const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.09;
    const total = subtotal + gst;

    setCurrentTransaction({
      ...currentTransaction,
      items: updatedItems,
      subtotal,
      gst,
      total
    });
  };

  const removeItem = (itemId: string) => {
    const updatedItems = currentTransaction.items.filter(item => item.id !== itemId);
    const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.09;
    const total = subtotal + gst;

    setCurrentTransaction({
      ...currentTransaction,
      items: updatedItems,
      subtotal,
      gst,
      total
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      removeItem(itemId);
      return;
    }

    const updatedItems = currentTransaction.items.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );

    const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.09;
    const total = subtotal + gst;

    setCurrentTransaction({
      ...currentTransaction,
      items: updatedItems,
      subtotal,
      gst,
      total
    });
  };

  const processPayment = (method: string) => {
    setCurrentTransaction({
      ...currentTransaction,
      paymentMethod: method,
      customerName
    });
    setShowPayment(false);
    setShowReceipt(true);
  };

  const clearTransaction = () => {
    setCurrentTransaction({
      items: [],
      subtotal: 0,
      gst: 0,
      total: 0,
      paymentMethod: '',
      customerName: ''
    });
    setShowReceipt(false);
    setCustomerName('');
  };

  const filteredItems = selectedCategory === 'All' 
    ? availableItems 
    : availableItems.filter(item => item.category === selectedCategory);

  const getReceiptNumber = () => {
    return 'SG' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">POS System</h1>
            <p className="text-gray-600">Point of Sale Terminal</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock size={16} />
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Menu Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category Filter */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
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

            {/* Items Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => addItem(item)}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left"
                >
                  <div className="h-20 bg-gradient-to-br from-red-400 to-orange-400 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-white text-2xl">🍽️</span>
                  </div>
                  <h3 className="font-medium text-gray-900 text-sm mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{item.stallName}</p>
                  <p className="font-bold text-green-600">S${item.price.toFixed(2)}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            {/* Customer Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <User size={16} className="mr-2" />
                Customer
              </h3>
              <input
                type="text"
                placeholder="Customer name (optional)"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Current Order */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                <Receipt size={16} className="mr-2" />
                Current Order
              </h3>

              {currentTransaction.items.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No items added</p>
              ) : (
                <div className="space-y-3">
                  {currentTransaction.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                        <p className="text-xs text-gray-600">{item.stallName}</p>
                        <p className="text-sm font-semibold text-green-600">S${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-sm"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-sm"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800 ml-2 text-sm"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Total */}
            {currentTransaction.items.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>S${currentTransaction.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (9%):</span>
                    <span>S${currentTransaction.gst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
                    <span>Total:</span>
                    <span className="text-green-600">S${currentTransaction.total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowPayment(true)}
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium flex items-center justify-center space-x-2"
                >
                  <CreditCard size={20} />
                  <span>Process Payment</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Select Payment Method</h2>
            
            <div className="space-y-3 mb-6">
              <div className="text-lg font-semibold text-center bg-gray-50 p-4 rounded-lg">
                Total: <span className="text-green-600">S${currentTransaction.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3">
              {['PayNow', 'GrabPay', 'Credit Card', 'Cash'].map(method => (
                <button
                  key={method}
                  onClick={() => processPayment(method)}
                  className="w-full p-4 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    {method === 'PayNow' && <Smartphone className="text-blue-600" size={20} />}
                    {method === 'GrabPay' && <Smartphone className="text-green-600" size={20} />}
                    {method === 'Credit Card' && <CreditCard className="text-purple-600" size={20} />}
                    {method === 'Cash' && <DollarSign className="text-green-600" size={20} />}
                    <span>{method}</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowPayment(false)}
              className="w-full mt-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <CheckCircle className="mx-auto text-green-600 mb-4" size={48} />
              <h2 className="text-xl font-bold text-gray-900">Payment Successful!</h2>
              <p className="text-gray-600">Transaction completed</p>
            </div>

            {/* Receipt */}
            <div className="border border-gray-300 rounded-lg p-4 mb-6 bg-gray-50">
              <div className="text-center mb-4">
                <h3 className="font-bold">Ah Seng Coffee Shop</h3>
                <p className="text-sm text-gray-600">Blk 123, Toa Payoh Lor 1</p>
                <p className="text-sm text-gray-600">Receipt #{getReceiptNumber()}</p>
                <p className="text-xs text-gray-500">{new Date().toLocaleString()}</p>
              </div>

              {currentTransaction.customerName && (
                <div className="mb-4 text-center">
                  <p className="text-sm">Customer: {currentTransaction.customerName}</p>
                </div>
              )}

              <div className="border-t border-gray-300 py-2">
                {currentTransaction.items.map(item => (
                  <div key={item.id} className="flex justify-between py-1">
                    <span className="text-sm">{item.quantity}x {item.name}</span>
                    <span className="text-sm">S${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-300 py-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>S${currentTransaction.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>GST (9%):</span>
                  <span>S${currentTransaction.gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-gray-300 pt-1">
                  <span>Total:</span>
                  <span>S${currentTransaction.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-300 py-2 text-center">
                <p className="text-sm">Payment: {currentTransaction.paymentMethod}</p>
              </div>

              <div className="text-center text-xs text-gray-500 mt-4">
                Thank you for your order!
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => window.print()}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-1"
              >
                <Receipt size={16} />
                <span>Print</span>
              </button>
              <button
                onClick={clearTransaction}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                New Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POSSystem;