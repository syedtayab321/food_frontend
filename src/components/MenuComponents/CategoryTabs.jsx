import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllCategories } from './../../Services/MenuItems/categorySlice';
import { 
  FaPlus, 
  FaHamburger, 
  FaUtensils, 
  FaPizzaSlice, 
  FaIceCream, 
  FaWineGlassAlt 
} from 'react-icons/fa';

// Helper function to get icon component from string
const getIconComponent = (iconName) => {
  const icons = {
    FaHamburger: <FaHamburger />,
    FaUtensils: <FaUtensils />,
    FaPizzaSlice: <FaPizzaSlice />,
    FaIceCream: <FaIceCream />,
    FaWineGlassAlt: <FaWineGlassAlt />,
  };
  return icons[iconName] || <FaUtensils />;
};

const CategoryTabs = ({ activeTab, setActiveTab, onAddCategory }) => {
  const categories = useSelector(selectAllCategories);

  return (
    <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActiveTab(cat.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg mr-2 whitespace-nowrap transition ${
            activeTab === cat.id
              ? 'bg-red-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {getIconComponent(cat.icon)} {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;