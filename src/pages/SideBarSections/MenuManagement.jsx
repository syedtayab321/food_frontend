import React, { useState, useEffect } from 'react';
import { FaHamburger, FaPizzaSlice, FaIceCream, FaWineGlassAlt, FaUtensils, FaPlus, FaSadTear, FaSearch } from 'react-icons/fa';
import AddItemModal from '../../Models/ProductRelated/AddItemModal';
import AddCategoryModal from './../../Models/ProductRelated/AddCategoryModal';
import CategoryTabs from './../../components/MenuComponents/CategoryTabs';
import MenuItemsGrid from './../../components/MenuComponents/MenuItemGrid';
import SearchAndAddBar from './../../components/MenuComponents/SearchAndAddBar';
import { useSelector, useDispatch } from 'react-redux';
import { addNewCategory } from './../../Services/MenuItems/categorySlice';
import {
  selectAllMenuItems,
  fetchMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  selectMenuItemsStatus,
  selectMenuItemsError
} from './../../Services/MenuItems/menuItemSlice';

const MenuManagementPage = () => {
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentItem, setCurrentItem] = useState(null);
  const dispatch = useDispatch();
  
  const categories = useSelector(state => state.categories.categories);
  const categoryStatus = useSelector(state => state.categories.status);
  const categoryError = useSelector(state => state.categories.error);

  const menuItems = useSelector(selectAllMenuItems);
  const menuItemsStatus = useSelector(selectMenuItemsStatus);
  const menuItemsError = useSelector(selectMenuItemsError);

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  const handleOpenAddItemModal = (item = null) => {
    setCurrentItem(item);
    setIsItemModalOpen(true);
  };

 const handleAddOrUpdateItem = async (formData) => {
  try {
    if (currentItem) {
      await dispatch(updateMenuItem({
        id: currentItem.id,
        formData: formData
      })).unwrap();
    } else {
      await dispatch(addMenuItem(formData)).unwrap();
    }
    setIsItemModalOpen(false);
    setCurrentItem(null);
  } catch (err) {
    console.error('Failed to save item:', err);
  }
};

  const handleDeleteItem = async (itemId) => {
    try {
      await dispatch(deleteMenuItem(itemId)).unwrap();
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  const handleAddCategory = async (newCategoryData) => {
    try {
      await dispatch(addNewCategory({
        name: newCategoryData.name,
      })).unwrap();
      setIsCategoryModalOpen(false);
    } catch (err) {
      console.error('Failed to add category:', err);
    }
  };

  const filteredItems = menuItems.filter(item => {
    if (!item?.title) return false;
    
    const matchesCategory = activeTab === 'all' || item.category == activeTab;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(searchLower) || 
                         (item.description && item.description.toLowerCase().includes(searchLower));
    
    return matchesCategory && matchesSearch;
  });

  const availableCategories = categories.filter(cat => cat.id !== 'all');

  const renderContent = () => {
    if (categoryStatus === 'loading' || menuItemsStatus === 'loading') {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-4"></div>
          <p className="text-gray-600">Loading menu items...</p>
        </div>
      );
    }

    if (categoryError || menuItemsError) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FaSadTear className="text-red-500 text-5xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h3>
          <p className="text-gray-600 max-w-md">
            {categoryError || menuItemsError}
          </p>
          <button
            onClick={() => dispatch(fetchMenuItems())}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      );
    }

    if (filteredItems.length === 0 && (searchQuery || activeTab !== 'all')) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FaSearch className="text-gray-400 text-5xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No items found</h3>
          <p className="text-gray-600">
            {searchQuery 
              ? `No items match your search for "${searchQuery}"`
              : `No items in this category`}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveTab('all');
            }}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Show all items
          </button>
        </div>
      );
    }

    if (menuItems.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FaUtensils className="text-gray-400 text-5xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Your menu is empty</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first menu item</p>
          <button
            onClick={() => handleOpenAddItemModal()}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <FaPlus /> Add Menu Item
          </button>
        </div>
      );
    }

    return (
      <>
        <CategoryTabs 
          categories={categories}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <MenuItemsGrid 
          items={filteredItems}
          onEditItem={handleOpenAddItemModal}
          onDeleteItem={handleDeleteItem}
        />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Menu Management</h1>
        <p className="text-gray-600">Manage your restaurant menu items</p>
      </div>

      <SearchAndAddBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddItem={() => handleOpenAddItemModal()}
        onAddCategory={() => setIsCategoryModalOpen(true)}
      />

      {renderContent()}

      <AddItemModal
        isOpen={isItemModalOpen}
        onClose={() => {
          setIsItemModalOpen(false);
          setCurrentItem(null);
        }}
        onSave={handleAddOrUpdateItem}
        categories={availableCategories}
        initialData={currentItem ? {
          id: currentItem.id,
          title: currentItem.title,
          description: currentItem.description,
          unit_price: currentItem.unit_price,
          inventory: currentItem.inventory,
          category: currentItem.category,
          images: currentItem.images
        } : null}
        isEditing={!!currentItem}
      />

      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onAddCategory={handleAddCategory}
        isLoading={categoryStatus === 'loading'}
      />
    </div>
  );
};

export default MenuManagementPage;