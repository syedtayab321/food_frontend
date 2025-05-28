import { FiX, FiPackage, FiUser, FiClock, FiDollarSign, FiShoppingBag } from "react-icons/fi";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Order Details</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                <FiPackage size={18} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium">{order.id}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                <FiUser size={18} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-medium">{order.customer_email || `Customer ${order.customer}`}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
                <FiClock size={18} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Order Time</p>
                <p className="font-medium">{new Date(order.placed_at).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-green-100 text-green-600">
                <FiDollarSign size={18} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-medium">Rs. {parseFloat(order.total).toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          {/* Delivery Address */}
          {order.delivery_address && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Delivery Address</p>
              <p className="font-medium">{order.delivery_address}</p>
            </div>
          )}
          
          {/* Order Items */}
          <div>
            <h4 className="font-medium mb-3 flex items-center">
              <FiShoppingBag className="mr-2" />
              Items ({order.items?.length || 0})
            </h4>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items?.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.product_title}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        Rs. {parseFloat(item.unit_price).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        Rs. {(parseFloat(item.unit_price) * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Status Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Payment Status</p>
              <p className="font-medium capitalize">
                {order.payment_status === 'C' ? 'Paid' : 
                 order.payment_status === 'P' ? 'Pending' : 
                 order.payment_status === 'F' ? 'Failed' : 'Unknown'}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Delivery Status</p>
              <p className="font-medium capitalize">{order.delivery_status?.toLowerCase()}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;