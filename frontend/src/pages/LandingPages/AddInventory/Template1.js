//react arrow function 
import React from "react";
import React, { useState } from "react";
import { FaSearch, FaSort, FaUpload } from "react-icons/fa";

const Template1 = () => {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [formData, setFormData] = useState({
      name: "",
      quantity: "",
      description: "",
      category: "",
      location: "",
      image: null,
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      validateField(name, value);
    };
  
    const validateField = (name, value) => {
      let newErrors = { ...errors };
      switch (name) {
        case "name":
          if (value.length > 50) newErrors.name = "Name must be less than 50 characters";
          else delete newErrors.name;
          break;
        case "quantity":
          if (isNaN(value) || value === "") newErrors.quantity = "Quantity must be a number";
          else delete newErrors.quantity;
          break;
        case "description":
          if (value.length > 200)
            newErrors.description = "Description must be less than 200 characters";
          else delete newErrors.description;
          break;
        default:
          break;
      }
      setErrors(newErrors);
    };
  
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (Object.keys(errors).length === 0) {
        setIsLoading(true);
        setTimeout(() => {
          const newItem = { ...formData, id: Date.now() };
          setInventoryItems([...inventoryItems, newItem]);
          setFormData({
            name: "",
            quantity: "",
            description: "",
            category: "",
            location: "",
            image: null,
          });
          setIsLoading(false);
        }, 1000);
      }
    };
  
    const filteredItems = inventoryItems
      .filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "quantity") return a.quantity - b.quantity;
        return 0;
      });
  
  
    return (
       <>
       <div className="container mx-auto p-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Add Inventory</h1>

          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Item Name
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? "border-red-500" : ""}`}
                id="name"
                type="text"
                placeholder="Item Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                aria-label="Item Name"
              />
              {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                Quantity
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.quantity ? "border-red-500" : ""}`}
                id="quantity"
                type="text"
                placeholder="Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                aria-label="Quantity"
              />
              {errors.quantity && <p className="text-red-500 text-xs italic">{errors.quantity}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.description ? "border-red-500" : ""}`}
                id="description"
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                aria-label="Description"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs italic">{errors.description}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Category
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category"
                type="text"
                placeholder="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                aria-label="Category"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                Storage Location
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                aria-label="Storage Location"
              >
                <option value="">Select a location</option>
                <option value="warehouse-a">Warehouse A</option>
                <option value="warehouse-b">Warehouse B</option>
                <option value="store-front">Store Front</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                Upload Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaUpload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input
                    id="image"
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                    aria-label="Upload Image"
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Item"}
              </button>
            </div>
          </form>

          <div className="mb-4">
            <div className="flex justify-between items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search inventory"
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search inventory"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <div className="flex items-center">
                <span className="mr-2">Sort by:</span>
                <select
                  className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort inventory"
                >
                  <option value="name">Name</option>
                  <option value="quantity">Quantity</option>
                </select>
                <FaSort className="ml-2 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={
                    item.image
                      ? URL.createObjectURL(item.image)
                      : "https://images.unsplash.com/photo-1553413077-190dd305871c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMzNXwwfDF8c2VhcmNofDF8fGludmVudG9yeXxlbnwwfHx8fDE2ODcxMTI1NzZ8MA&ixlib=rb-4.0.3&q=80&w=400"
                  }
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2">{item.name}</h3>
                  <p className="text-gray-700 text-base mb-2">Quantity: {item.quantity}</p>
                  <p className="text-gray-700 text-base mb-2">Category: {item.category}</p>
                  <p className="text-gray-700 text-base">Location: {item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
       </>
    );
};
export default Template1