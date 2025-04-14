import React, { useState } from "react";
import Sidebar from './../../components/common/Sidebar';
import HomePage from './../SideBarSections/HomePage';
import MenuManagementPage from './../SideBarSections/MenuManagement';
import OrdersManagementPage from './../SideBarSections/OrdersManagement';
import ProfileManagementPage from './../SideBarSections/ProfileManagement';
import ReviewsPage from './../SideBarSections/ReviewsPage';
import CustomersPage from './../SideBarSections/CustomersPage';
import Reservations from './../SideBarSections/Reservations';
const SidebarPage = () => {
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSelect = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        onSelect={handleSelect}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div
        className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="p-6">
          {/* Render the selected section */}
          {selectedSection === "dashboard" && <HomePage />}
          {selectedSection === "menu" && <MenuManagementPage />}
          {selectedSection === "orders" && <OrdersManagementPage />}
          {selectedSection === "reservations" && <Reservations />}
          {selectedSection === "profile" && <ProfileManagementPage />}
          {selectedSection === "reviews" && <ReviewsPage/>}
          {selectedSection === "customers" && <CustomersPage/>}
        </div>
      </div>
    </div>
  );
};

export default SidebarPage;