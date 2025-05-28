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
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState({ start: null, end: null });
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const fetchOrders = () => {
    dispatch(fetchVendorOrders());
  };

  useEffect(() => {
    fetchOrders();
  }, [dispatch]);

  const filteredOrders = orders.filter(order => {
    // Search filter
    const matchesSearch =
      order.customer_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toString().toLowerCase().includes(searchQuery.toLowerCase());
    
    // Payment status filter
    const matchesPaymentStatus = 
      paymentStatusFilter === "all" || 
      (paymentStatusFilter === "paid" && order.payment_status === "C") ||
      (paymentStatusFilter === "pending" && order.payment_status === "P") ||
      (paymentStatusFilter === "failed" && order.payment_status === "F");
    
    // Delivery status filter
    const matchesDeliveryStatus = 
      deliveryStatusFilter === "all" || 
      (order.delivery_status?.toLowerCase() === deliveryStatusFilter.toLowerCase());
    
    // Date range filter
    const orderDate = new Date(order.placed_at);
    const matchesDateRange = 
      !dateRangeFilter.start || 
      !dateRangeFilter.end || 
      (orderDate >= new Date(dateRangeFilter.start) && 
      (orderDate <= new Date(dateRangeFilter.end)));
    
    return matchesSearch && matchesPaymentStatus && matchesDeliveryStatus && matchesDateRange;
  });

  // Always sort by latest first (placed_at descending, then id descending)
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const dateA = new Date(a.placed_at);
    const dateB = new Date(b.placed_at);
    
    // First sort by date (newest first)
    if (dateB.getTime() !== dateA.getTime()) {
      return dateB - dateA;
    }
    // If dates are equal, sort by ID (higher IDs first)
    return b.id - a.id;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  const handleStatusUpdate = (orderId, statusData) => {
    dispatch(updateOrderStatus({ orderId, statusData })).then(() => {
      fetchOrders();
    });
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setPaymentStatusFilter("all");
    setDeliveryStatusFilter("all");
    setDateRangeFilter({ start: null, end: null });
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setCurrentPage(1);
    fetchOrders();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <OrdersHeader
        title="Orders Management"
        description="Track and manage customer orders"
        onRefresh={handleRefresh}
        isRefreshing={loading}
      />

      <OrdersFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={paymentStatusFilter}
        deliveryStatusFilter={deliveryStatusFilter}
        onStatusFilterChange={setPaymentStatusFilter}
        onDeliveryStatusFilterChange={setDeliveryStatusFilter}
        dateRangeFilter={dateRangeFilter}
        onDateRangeFilterChange={setDateRangeFilter}
        onClearFilters={clearAllFilters}
      />

      <OrdersTable
        orders={currentOrders}
        onStatusUpdate={handleStatusUpdate}
      />
      
      {sortedOrders.length > ordersPerPage && (
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