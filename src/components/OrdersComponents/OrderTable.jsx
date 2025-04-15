import StatusBadge from "./OrderStatusBadge";
import OrderActions from "./OrderAction";
import { FiPackage, FiClock, FiDollarSign, FiUser } from "react-icons/fi";

const OrdersTable = ({ orders, onStatusUpdate }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg  border border-gray-200">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 p-5 border-b font-medium text-gray-700 bg-gray-50">
        <div className="col-span-4 md:col-span-2 flex items-center">
          <FiPackage className="mr-2 text-gray-500" />
          Order
        </div>
        <div className="col-span-5 md:col-span-3 flex items-center">
          <FiUser className="mr-2 text-gray-500" />
          Customer
        </div>
        <div className="hidden md:flex md:col-span-2 items-center">
          <FiPackage className="mr-2 text-gray-500" />
          Items
        </div>
        <div className="hidden md:flex md:col-span-2 items-center">
          <FiClock className="mr-2 text-gray-500" />
          Time
        </div>
        <div className="col-span-2 md:col-span-2 flex items-center">
          <FiDollarSign className="mr-2 text-gray-500" />
          Total
        </div>
        <div className="col-span-1 md:col-span-1 flex justify-end">
          <span className="sr-only">Actions</span>
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="p-8 text-center">
          <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FiPackage className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">No orders found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search filters</p>
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

            {/* Customer */}
            <div className="col-span-5 md:col-span-3 flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                {order.customer.charAt(0).toUpperCase()}
              </div>
              <span className="truncate">{order.customer}</span>
            </div>

            {/* Items (Desktop) */}
            <div className="hidden md:block md:col-span-2 text-gray-600">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100">
                {order.items} {order.items === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Time (Desktop) */}
            <div className="hidden md:block md:col-span-2 text-gray-500">
              {order.time}
            </div>

            {/* Total */}
            <div className="col-span-2 md:col-span-2 font-medium text-gray-800">
              ${parseFloat(order.total).toFixed(2)}
            </div>

            {/* Status and Actions (Desktop) */}
            <div className="col-span-1 md:col-span-1 flex items-center justify-end">
              <div className="flex items-center space-x-3">
                <StatusBadge status={order.status} />
                <OrderActions 
                  status={order.status} 
                  onUpdate={onStatusUpdate}
                  orderId={order.id}
                />
              </div>
            </div>

            {/* Mobile View Bottom Row */}
            <div className="col-span-12 md:hidden mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-500 flex items-center">
                  <FiPackage className="mr-1" /> {order.items}
                </span>
                <span className="text-gray-500 flex items-center">
                  <FiClock className="mr-1" /> {order.time}
                </span>
                <StatusBadge status={order.status} />
              </div>
              <OrderActions 
                status={order.status} 
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