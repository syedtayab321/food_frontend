import React, { useState, useEffect } from "react";
import { FaTimes, FaUpload, FaPlus, FaSpinner, FaSave, FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { selectAllCategories } from "./../../Services/MenuItems/categorySlice";
import { addMenuItem, updateMenuItem } from "../../Services/MenuItems/menuItemSlice";

const AddItemModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = null,
  isEditing = false 
}) => {
  // Get categories from Redux store
  const categories = useSelector(selectAllCategories);
  const availableCategories = categories.filter(cat => cat.id !== 'all');

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    unit_price: "",
    inventory: 10,  // Default to 10 as per your API data
    category: availableCategories.length > 0 ? availableCategories[0].id : "",
    images: []
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Initialize form with data when editing
  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        unit_price: initialData.unit_price || "",
        inventory: initialData.inventory || 10,
        category: initialData.category || (availableCategories.length > 0 ? availableCategories[0].id : ""),
        images: initialData.images || []
      });
      setImagePreviews(initialData.images.map(img => img.image));
    } else {
      // Reset form when adding new item
      setFormData({
        title: "",
        description: "",
        unit_price: "",
        inventory: 10,
        category: availableCategories.length > 0 ? availableCategories[0].id : "",
        images: []
      });
      setImagePreviews([]);
    }
  }, [isEditing, initialData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  // Handle number input changes
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    // For price, keep as string to allow decimal input
    if (name === 'unit_price') {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      // For inventory, convert to number
      setFormData({
        ...formData,
        [name]: value === "" ? "" : Number(value),
      });
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = files.map(file => ({
      id: Date.now(), // Temporary ID
      image: URL.createObjectURL(file),
      file // Store the actual file for upload
    }));

    setFormData({
      ...formData,
      images: [...formData.images, ...newImages]
    });
    setImagePreviews([...imagePreviews, ...newImages.map(img => img.image)]);
  };

  // Remove image
  const handleRemoveImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
    setImagePreviews(newImages.map(img => img.image));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.unit_price) newErrors.unit_price = "Price is required";
    if (isNaN(Number(formData.unit_price))) newErrors.unit_price = "Price must be a number";
    if (Number(formData.unit_price) <= 0) newErrors.unit_price = "Price must be greater than 0";
    if (formData.inventory < 0) newErrors.inventory = "Inventory cannot be negative";
    if (!formData.category) newErrors.category = "Category is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const dispatch = useDispatch();
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) return;

  setIsLoading(true);

  try {
    const formDataToSend = new FormData();
    
    // Append all fields
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('unit_price', formData.unit_price);
    formDataToSend.append('inventory', formData.inventory);
    formDataToSend.append('category', formData.category);
   // formDataToSend.append('vendor', 1); // Default vendor ID

    // Handle image upload
    if (formData.images.length > 0 && formData.images[0].file) {
      formDataToSend.append('image', formData.images[0].file);
    }

    if (isEditing && initialData) {
      await dispatch(updateMenuItem({
        id: initialData.id,
        formData: formDataToSend  // Changed from 'data' to 'formData'
      })).unwrap();
      toast.success('Item updated successfully!');
    } else {
      await dispatch(addMenuItem(formDataToSend)).unwrap();
      toast.success('Item added successfully!');
    }

    onClose();
  } catch (error) {
    console.error('Submission error:', error);
    toast.error(`Operation failed: ${error.message}`);
  } finally {
    setIsLoading(false);
  }
};
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-red-600">
            {isEditing ? "Edit Menu Item" : "Add New Menu Item"}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-red-600 transition"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Basic Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaInfoCircle className="text-red-500" />
                  Basic Information
                </h3>
                
                {/* Title */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Title*</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-lg ${errors.title ? "border-red-500" : "border-gray-300"}`}
                    placeholder="e.g., Aloo, Burger"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Category*</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-lg ${errors.category ? "border-red-500" : "border-gray-300"}`}
                  >
                    {availableCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows="3"
                    placeholder="Describe the menu item..."
                  ></textarea>
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">Pricing & Inventory</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Unit Price */}
                  <div>
                    <label className="block text-gray-700 mb-2">Price ($)*</label>
                    <input
                      type="text"
                      name="unit_price"
                      value={formData.unit_price}
                      onChange={handleNumberChange}
                      className={`w-full p-2 border rounded-lg ${errors.unit_price ? "border-red-500" : "border-gray-300"}`}
                      placeholder="e.g., 20.00"
                    />
                    {errors.unit_price && <p className="text-red-500 text-sm mt-1">{errors.unit_price}</p>}
                  </div>

                  {/* Inventory */}
                  <div>
                    <label className="block text-gray-700 mb-2">Inventory*</label>
                    <input
                      type="number"
                      name="inventory"
                      value={formData.inventory}
                      onChange={handleNumberChange}
                      className={`w-full p-2 border rounded-lg ${errors.inventory ? "border-red-500" : "border-gray-300"}`}
                      min="0"
                      required
                    />
                    {errors.inventory && <p className="text-red-500 text-sm mt-1">{errors.inventory}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Image Upload */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">Images</h3>
                <div className="space-y-4">
                  {/* Image Preview Grid */}
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                          >
                            <FaTimes size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <FaUpload className="text-gray-400 text-4xl mb-2" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                      multiple
                    />
                    <label
                      htmlFor="image-upload"
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer transition"
                    >
                      Upload Images
                    </label>
                    <p className="text-gray-500 text-sm mt-2">JPEG, PNG (Max 5MB each)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 mt-6 sticky bottom-0 bg-white pt-4 pb-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-red-400 transition"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" /> Saving...
                </>
              ) : (
                <>
                  {isEditing ? <FaSave /> : <FaPlus />}
                  {isEditing ? "Update Item" : "Add Item"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;