import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAllCategories,
  selectCategoriesStatus,
  selectCategoriesError,
  fetchCategories
} from './../../Services/MenuItems/categorySlice';
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

const CategoryTabs = ({ activeTab, setActiveTab }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const status = useSelector(selectCategoriesStatus);
  const error = useSelector(selectCategoriesError);

  // Fetch categories on component mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading categories...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveTab(category.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg mr-2 whitespace-nowrap transition ${
            activeTab === category.id
              ? 'bg-red-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {getIconComponent(category.icon)} {category.title}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;