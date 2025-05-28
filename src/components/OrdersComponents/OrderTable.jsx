import StatusBadge from "./OrderStatusBadge";
import OrderStatusActions from "./OrderStatusActions";
import { FiPackage, FiClock } from "react-icons/fi";
import OrderDetailsModal from "./OrderDetailsModal";
import { useState } from "react";

const OrdersTable = ({ orders, onStatusUpdate }) => {
   const [selectedOrder, setSelectedOrder] = useState(null);
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 p-5 border-b border-gray-200 bg-gray-50 text-gray-600 text-sm font-medium">
        <div className="col-span-4 md:col-span-2">Order ID</div>
        <div className="col-span-5 md:col-span-3">Customer</div>
        <div className="hidden md:block md:col-span-1">Items</div>
        <div className="hidden md:block md:col-span-2">Time</div>
        <div className="col-span-2 md:col-span-1">Total</div>
        <div className="col-span-1 md:col-span-3 text-right">Status</div>
      </div>

      {orders.length === 0 ? (
        <div className="p-8 text-center">
          <div className="text-gray-500 mb-4">
            <FiPackage className="inline-block text-3xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-1">No orders found</h3>
          <p className="text-gray-500">Orders you receive will appear here</p>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-12 gap-4 p-5 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
          >
            
           {/* Order ID - now clickable */}
              <div 
                className="col-span-4 md:col-span-2 font-medium text-blue-600 flex items-center cursor-pointer hover:underline"
                onClick={() => setSelectedOrder(order)}
              >
                <span className="truncate">{order.id}</span>
              </div>


            {/* Customer - now clickable */}
              <div 
                className="col-span-5 md:col-span-3 flex items-center cursor-pointer hover:underline"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                  {order.customer_email?.charAt(0).toUpperCase() || 'C'}
                </div>
                <span className="truncate">
                  {order.customer_email || `Customer ${order.customer}`}
                </span>
              </div>

            {/* Items (Desktop) */}
            <div className="hidden md:block md:col-span-1 text-gray-600">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100">
                {order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Time (Desktop) */}
            <div className="hidden md:block md:col-span-2 text-gray-500">
              {new Date(order.placed_at).toLocaleTimeString()}
            </div>

            {/* Total */}
            <div className="col-span-2 md:col-span-1 font-medium text-gray-800">
              ${parseFloat(order.total).toFixed(2)}
            </div>

            {/* Status and Actions */}
            <div className="col-span-1 md:col-span-3 flex items-center justify-end space-x-2">
              
              <OrderStatusActions 
                orderId={order.id}
                paymentStatus={order.payment_status}
                deliveryStatus={order.delivery_status}
                onUpdate={onStatusUpdate}
              />
            </div>

            {/* Mobile View */}
            <div className="col-span-12 md:hidden mt-3 pt-3 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500 text-sm flex items-center">
                    <FiPackage className="mr-1" /> {order.items?.length || 0}
                  </span>
                  <span className="text-gray-500 text-sm flex items-center">
                    <FiClock className="mr-1" /> {new Date(order.placed_at).toLocaleTimeString()}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex space-x-2">
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