import StatusBadge from "./OrderStatusBadge";
import OrderActions from "./OrderAction";

const OrdersTable = ({ orders, onStatusUpdate }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium text-gray-700 bg-gray-50">
        <div className="col-span-3 md:col-span-2">Order ID</div>
        <div className="col-span-4 md:col-span-3">Customer</div>
        <div className="hidden md:block md:col-span-2">Items</div>
        <div className="hidden md:block md:col-span-2">Time</div>
        <div className="col-span-3 md:col-span-2">Total</div>
        <div className="col-span-2 md:col-span-1">Status</div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No orders found. Try adjusting your filters.
        </div>
      ) : (
        orders.map((order) => (
          <div 
            key={order.id}
            className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-red-50 transition items-center"
          >
            <div className="col-span-3 md:col-span-2 font-medium text-red-600">
              {order.id}
            </div>
            <div className="col-span-4 md:col-span-3">{order.customer}</div>
            <div className="hidden md:block md:col-span-2">{order.items} items</div>
            <div className="hidden md:block md:col-span-2 text-gray-500">{order.time}</div>
            <div className="col-span-3 md:col-span-2 font-medium">{order.total}</div>
            <div className="col-span-2 md:col-span-1">
              <StatusBadge status={order.status} />
            </div>
            <div className="col-span-12 md:col-span-12 mt-3 md:mt-0 md:hidden flex justify-between">
              <span className="text-gray-500">{order.items} items • {order.time}</span>
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