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
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    dispatch(fetchVendorOrders());
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
    
    return matchesSearch && matchesPaymentStatus && matchesDeliveryStatus;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleStatusUpdate = (orderId, statusData) => {
    dispatch(updateOrderStatus({ orderId, ...statusData })).then(() => {
      dispatch(fetchVendorOrders());
    });
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setPaymentStatusFilter("all");
    setDeliveryStatusFilter("all");
    setCurrentPage(1);
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
        statusFilter={paymentStatusFilter}
        deliveryStatusFilter={deliveryStatusFilter}
        onStatusFilterChange={setPaymentStatusFilter}
        onDeliveryStatusFilterChange={setDeliveryStatusFilter}
        onClearFilters={clearAllFilters}
        orders={orders}
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