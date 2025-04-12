import React, { useState } from "react";
import OrdersHeader from "./../../components/OrdersComponents/OrdersHeader";
import OrdersFilter from "./../../components/OrdersComponents/OrderFilters";
import OrdersTable from "./../../components/OrdersComponents/OrderTable";
import Pagination from "./../../components/OrdersComponents/OrderPagination";

const OrdersPage = () => {
  // Sample orders data (would normally come from API)
  const allOrders = [
    { id: "#ORD-1024", customer: "Alex Johnson", items: 3, total: "$42.50", status: "Preparing", time: "12:30 PM" },
    { id: "#ORD-1023", customer: "Sarah Miller", items: 2, total: "$28.75", status: "Ready", time: "12:15 PM" },
    // ... more orders (would have at least 20+ in real app)
  ];

  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Filter orders
  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Update order status
  const updateStatus = (orderId, newStatus) => {
    // In a real app, this would call an API
    console.log(`Updating order ${orderId} to status ${newStatus}`);
  };

  // Refresh orders
  const refreshOrders = () => {
    setIsRefreshing(true);
    // Simulate API refresh
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <OrdersHeader 
        title="Orders Management" 
        description="Track and manage customer orders"
        onRefresh={refreshOrders}
        isRefreshing={isRefreshing}
      />
      
      <OrdersFilter 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <OrdersTable 
        orders={currentOrders}
        onStatusUpdate={updateStatus}
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