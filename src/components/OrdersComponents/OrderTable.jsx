import StatusBadge from "./OrderStatusBadge";
import OrderActions from "./OrderAction";
import { FiPackage, FiClock, FiDollarSign, FiUser } from "react-icons/fi";

const OrdersTable = ({ orders, onStatusUpdate }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Table Header remains the same */}

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="p-8 text-center">
          {/* No orders found UI remains the same */}
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-12 gap-4 p-5 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
          >
            {/* Order ID */}
            <div className="col-span-4 md:col-span-2 font-medium text-blue-600 flex items-center">
              <span className="truncate">#{order.id}</span>
            </div>

            {/* Customer - FIXED THIS SECTION */}
            <div className="col-span-5 md:col-span-3 flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                {order.customer_email?.charAt(0).toUpperCase() || 'C'}
              </div>
              <span className="truncate">{order.customer_email || `Customer ${order.customer}`}</span>
            </div>

            {/* Items (Desktop) */}
            <div className="hidden md:block md:col-span-2 text-gray-600">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100">
                {order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Time (Desktop) */}
            <div className="hidden md:block md:col-span-2 text-gray-500">
              {new Date(order.placed_at).toLocaleTimeString()}
            </div>

            {/* Total */}
            <div className="col-span-2 md:col-span-2 font-medium text-gray-800">
              ${parseFloat(order.total).toFixed(2)}
            </div>

            {/* Status and Actions (Desktop) */}
            <div className="col-span-1 md:col-span-1 flex items-center justify-end">
              <div className="flex items-center space-x-3">
                <StatusBadge status={order.delivery_status} />
                <OrderActions 
                  status={order.delivery_status} 
                  onUpdate={onStatusUpdate}
                  orderId={order.id}
                />
              </div>
            </div>

            {/* Mobile View Bottom Row */}
            <div className="col-span-12 md:hidden mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-500 flex items-center">
                  <FiPackage className="mr-1" /> {order.items?.length || 0}
                </span>
                <span className="text-gray-500 flex items-center">
                  <FiClock className="mr-1" /> {new Date(order.placed_at).toLocaleTimeString()}
                </span>
                <StatusBadge status={order.delivery_status} />
              </div>
              <OrderActions 
                status={order.delivery_status} 
                onUpdate={onStatusUpdate}
                orderId={order.id}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersTable;