import React, { useState } from "react";
import { FaTimes, FaUpload, FaPlus, FaSpinner, FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const AddItemModal = ({ isOpen, onClose, onAddItem }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "main",
    price: "",
    cost: "",
    description: "",
    preparationTime: "",
    calories: "",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Categories for dropdown
  const categories = [
    { id: "appetizer", name: "Appetizer" },
    { id: "main", name: "Main Course" },
    { id: "dessert", name: "Dessert" },
    { id: "drinks", name: "Drinks" },
    { id: "sides", name: "Sides" },
  ];

  // Dietary options
  const dietaryOptions = [
    { id: "isVegetarian", name: "Vegetarian" },
    { id: "isVegan", name: "Vegan" },
    { id: "isGlutenFree", name: "Gluten-Free" },
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (isNaN(formData.price)) newErrors.price = "Price must be a number";
    if (!formData.cost) newErrors.cost = "Cost is required";
    if (isNaN(formData.cost)) newErrors.cost = "Cost must be a number";
    if (!formData.image) newErrors.image = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onAddItem(formData);
      toast.success("Item added successfully!");
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-red-600">Add New Menu Item</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600">
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
                
                {/* Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Item Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-lg ${errors.name ? "border-red-500" : "border-gray-300"}`}
                    placeholder="e.g., Margherita Pizza"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Category*</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
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
                    placeholder="e.g., Fresh mozzarella, tomato sauce, basil"
                  ></textarea>
                </div>

                {/* Ingredients */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Ingredients</label>
                  <textarea
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows="2"
                    placeholder="List main ingredients, separated by commas"
                  ></textarea>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">Pricing</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Price */}
                  <div>
                    <label className="block text-gray-700 mb-2">Price ($)*</label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-lg ${errors.price ? "border-red-500" : "border-gray-300"}`}
                      placeholder="12.99"
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                  </div>

                  {/* Cost */}
                  <div>
                    <label className="block text-gray-700 mb-2">Cost ($)*</label>
                    <input
                      type="text"
                      name="cost"
                      value={formData.cost}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-lg ${errors.cost ? "border-red-500" : "border-gray-300"}`}
                      placeholder="5.50"
                    />
                    {errors.cost && <p className="text-red-500 text-sm mt-1">{errors.cost}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Image Upload */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">Item Image*</h3>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg mb-2"
                    />
                  ) : (
                    <FaUpload className="text-gray-400 text-4xl mb-2" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
                  >
                    {imagePreview ? "Change Image" : "Upload Image"}
                  </label>
                  {errors.image && <p className="text-red-500 text-sm mt-2">{errors.image}</p>}
                </div>
              </div>

              {/* Dietary Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">Dietary Information</h3>
                <div className="space-y-2">
                  {dietaryOptions.map((option) => (
                    <label key={option.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name={option.id}
                        checked={formData[option.id]}
                        onChange={handleChange}
                        className="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                      />
                      <span className="text-gray-700">{option.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">Additional Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Preparation Time */}
                  <div>
                    <label className="block text-gray-700 mb-2">Prep Time (mins)</label>
                    <input
                      type="number"
                      name="preparationTime"
                      value={formData.preparationTime}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="15"
                    />
                  </div>

                  {/* Calories */}
                  <div>
                    <label className="block text-gray-700 mb-2">Calories</label>
                    <input
                      type="number"
                      name="calories"
                      value={formData.calories}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="350"
                    />
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
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-red-400"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <FaPlus /> Add Item
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