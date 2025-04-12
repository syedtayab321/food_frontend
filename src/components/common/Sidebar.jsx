import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUtensils,
  FaBars,
  FaTimes,
  FaStar,
  FaSignOutAlt,
  FaShoppingBasket,
  FaCalendarAlt,
  FaUsers,
  FaUserTie,
  FaBoxes,
  FaChartBar,
  FaPersonBooth
} from "react-icons/fa";
import LogoutModal from './../../Models/Common/LogoutModal';

const navItems = [
  { text: "Dashboard", icon: FaHome, link: "dashboard" },
  { text: "Menu", icon: FaUtensils, link: "menu" },
  { text: "Orders", icon: FaShoppingBasket, link: "orders" },
  { text: "Reservations", icon: FaCalendarAlt, link: "reservations" },
  { text: "Customers", icon: FaUsers, link: "customers" },
  { text: "Staff", icon: FaUserTie, link: "staff" },
  { text: "Inventory", icon: FaBoxes, link: "inventory" },
  { text: "Reports", icon: FaChartBar, link: "reports" },
  { text: "Reviews", icon: FaStar, link: "reviews" },
  { text: "Profile", icon: FaPersonBooth, link: "profile" },
];

const Sidebar = ({ onSelect, isOpen, setIsOpen }) => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (link) => {
    setActiveItem(link);
    onSelect(link);
  };

  const handleLogout = async() => {
    navigate("/");
    setIsLogoutOpen(false);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-red-700 to-red-800 text-white transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-red-200 focus:outline-none"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar Title */}
      {isOpen && (
        <div className="flex items-center justify-center p-6">
          <h1 className="text-2xl font-bold italic text-white">
            Wadi Connect
          </h1>
        </div>
      )}

      {/* Sidebar Menu */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 px-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleClick(item.link)}
                className={`flex w-full items-center gap-4 rounded-lg p-3 transition-all duration-200 ${
                  activeItem === item.link
                    ? "bg-white text-red-700 shadow-lg"
                    : "text-white hover:bg-red-600 hover:bg-opacity-50"
                }`}
              >
                <item.icon className="h-6 w-6" />
                {isOpen && (
                  <span className="text-sm font-medium">{item.text}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={() => setIsLogoutOpen(true)}
          className="flex w-full items-center gap-4 rounded-lg bg-white p-3 text-red-700 transition-all duration-200 hover:bg-gray-100"
        >
          <FaSignOutAlt className="h-6 w-6" />
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default Sidebar;