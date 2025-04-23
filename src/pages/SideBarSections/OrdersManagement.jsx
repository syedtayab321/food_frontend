import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrdersHeader from "../../components/OrdersComponents/OrdersHeader";
import OrdersFilter from "../../components/OrdersComponents/OrderFilters";
import OrdersTable from "../../components/OrdersComponents/OrderTable";
import Pagination from "../../components/OrdersComponents/OrderPagination";
import { fetchVendorOrders, updateOrderStatus } from "../../Services/Orders/ordersSlice";


const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // ✅ Auto-fetch orders from API on component mount
  useEffect(() => {
    dispatch(fetchVendorOrders());
  }, [dispatch]);

  // Filtered + paginated orders (frontend-only)
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toString().toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleStatusUpdate = ({ orderId, status }) => {
    dispatch(updateOrderStatus({ orderId, status })).then(() => {
      dispatch(fetchVendorOrders());
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <OrdersHeader
        title="Orders Management"
        description="Track and manage customer orders"
        onRefresh={() => dispatch(fetchVendorOrders())}
        isRefreshing={loading}
      />

      <OrdersFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <OrdersTable
        orders={currentOrders}
        onStatusUpdate={handleStatusUpdate}
      />

      {filteredOrders.length > ordersPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default OrdersPage;
