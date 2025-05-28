import StatusBadge from "./OrderStatusBadge";
import OrderStatusActions from "./OrderStatusActions";
import { FiPackage, FiClock, FiDollarSign, FiUser } from "react-icons/fi";
import { RiArrowRightSLine } from "react-icons/ri";
import OrderDetailsModal from "./OrderDetailsModal";
import { useState } from "react";

const OrdersTable = ({ orders, onStatusUpdate }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-50 text-gray-600 text-sm font-semibold uppercase tracking-wider">
        <div className="col-span-5 md:col-span-2">Order</div>
        <div className="col-span-7 md:col-span-3">Customer</div>
        <div className="hidden md:block md:col-span-2">Details</div>
        <div className="hidden md:block md:col-span-2">Time</div>
        <div className="hidden md:block md:col-span-1">Total</div>
        <div className="hidden md:block md:col-span-2 text-right">Status</div>
      </div>

      {orders.length === 0 ? (
        <div className="p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-blue-400 mb-6">
            <FiPackage className="text-3xl" />
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">No orders yet</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            When you receive orders, they'll appear here with all the details you need to fulfill them.
          </p>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-12 gap-4 p-5 border-b border-gray-100 hover:bg-blue-50/50 transition-colors duration-150 group"
          >
            {/* Order ID - clickable with chevron */}
            <div 
              className="col-span-5 md:col-span-2 font-medium flex items-center cursor-pointer"
              onClick={() => setSelectedOrder(order)}
            >
              <div className="flex items-center">
                <span className="text-blue-600 hover:text-blue-800 transition-colors">
                  #{order.id}
                </span>
                <RiArrowRightSLine className="ml-1 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>

            {/* Customer - clickable with better avatar */}
            <div 
              className="col-span-7 md:col-span-3 flex items-center cursor-pointer"
              onClick={() => setSelectedOrder(order)}
            >
              <div className="flex items-center min-w-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 flex items-center justify-center mr-3 flex-shrink-0">
                  {order.customer_email?.charAt(0).toUpperCase() || <FiUser size={16} />}
                </div>
                <div className="min-w-0">
                  <p className="text-gray-800 truncate font-medium">
                    {order.customer_name || `Customer ${order.customer}`}
                  </p>
                  <p className="text-gray-500 text-xs truncate">
                    {order.customer_email || 'No email provided'}
                  </p>
                </div>
              </div>
            </div>

            {/* Items (Desktop) */}
            <div className="hidden md:flex md:col-span-2 items-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                <FiPackage className="mr-2 flex-shrink-0" size={14} />
                {order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'items'}
              </div>
            </div>

            {/* Time (Desktop) */}
            <div className="hidden md:flex md:col-span-2 items-center text-gray-500">
              <div className="inline-flex items-center">
                <FiClock className="mr-2 flex-shrink-0" size={14} />
                {new Date(order.placed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {/* Total (Desktop) */}
            <div className="hidden md:flex md:col-span-1 items-center font-medium text-gray-800">
              <div className="inline-flex items-center">
                <FiDollarSign className="mr-1" size={14} />
                {parseFloat(order.total).toFixed(2)}
              </div>
            </div>

            {/* Status and Actions (Desktop) - Updated with better spacing */}
            <div className="hidden md:flex md:col-span-2 items-center justify-end space-x-2 min-w-[200px]">
              <div className="flex items-center space-x-2">
                <StatusBadge status={order.delivery_status} type="delivery" />
                <OrderStatusActions 
                  orderId={order.id}
                  paymentStatus={order.payment_status}
                  deliveryStatus={order.delivery_status}
                  onUpdate={onStatusUpdate}
                />
              </div>
            </div>

            {/* Mobile View */}
            <div className="col-span-12 md:hidden mt-3 pt-3 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500 text-sm flex items-center">
                    <FiPackage className="mr-1.5" size={14} /> 
                    {order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'items'}
                  </span>
                  <span className="text-gray-500 text-sm flex items-center">
                    <FiClock className="mr-1.5" size={14} /> 
                    {new Date(order.placed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-800 flex items-center justify-end">
                    <FiDollarSign className="mr-1" size={14} />
                    {parseFloat(order.total).toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3 space-x-2">
                <StatusBadge status={order.delivery_status} type="delivery" />
                <OrderStatusActions 
                  orderId={order.id}
                  paymentStatus={order.payment_status}
                  deliveryStatus={order.delivery_status}
                  onUpdate={onStatusUpdate}
                  mobile
                />
              </div>
            </div>
          </div>
        ))
      )}
      
      {/* Modal */}
      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
};

export default OrdersTable;