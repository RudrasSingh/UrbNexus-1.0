import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Select from "react-select";
import MapComponent from "./MapComponent"; // Import your MapComponent
import Modal from "./Modal"; // Import the Modal component

const CreatePro = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [inventories, setInventories] = useState([]);
  const [workers, setWorkers] = useState("");
  const [location, setLocation] = useState("");
  const [showOverview, setShowOverview] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [showMap, setShowMap] = useState(false);

  const priorityOptions = [
    { value: "high", label: "High", color: "bg-red-500" },
    { value: "medium", label: "Medium", color: "bg-yellow-500" },
    { value: "low", label: "Low", color: "bg-green-500" },
  ];

  const statusOptions = [
    { value: "ongoing", label: "Ongoing", color: "bg-blue-500" },
    { value: "in-progress", label: "In Progress", color: "bg-purple-500" },
    { value: "completed", label: "Completed", color: "bg-gray-500" },
  ];

  const inventoryOptions = [
    { value: "tool1", label: "Tool 1" },
    { value: "tool2", label: "Tool 2" },
    { value: "material1", label: "Material 1" },
    { value: "material2", label: "Material 2" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowOverview(true);
  };

  const handleConfirm = () => {
    const newProject = {
      title,
      description,
      priority,
      status,
      inventories,
      workers,
      location,
    };

    if (editIndex !== -1) {
      const updatedProjects = [...projects];
      updatedProjects[editIndex] = newProject;
      setProjects(updatedProjects);
      setEditIndex(-1);
    } else {
      setProjects([...projects, newProject]);
    }

    resetForm();
    setShowOverview(false);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("");
    setStatus("");
    setInventories([]);
    setWorkers("");
    setLocation("");
  };

  const handleEdit = (index) => {
    const project = projects[index];
    setTitle(project.title);
    setDescription(project.description);
    setPriority(project.priority);
    setStatus(project.status);
    setInventories(project.inventories);
    setWorkers(project.workers);
    setLocation(project.location);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  return (
    <div className="container mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 shadow-xl rounded-lg border border-gray-300"
      >
        <h1 className="text-3xl font-medium text-gray-800 mb-4 text-center">
          Create a New Project
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title Input */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all hover:shadow-md bg-gray-50"
              placeholder="Enter project title"
              required
            />
          </div>

          {/* Description Input */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 mb-1">Project Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all hover:shadow-md bg-gray-50"
              rows="3"
              placeholder="Describe the project details"
              required
            ></textarea>
          </div>

          {/* Priority Dropdown */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Priority</label>
            <Select
              options={priorityOptions}
              value={priorityOptions.find((option) => option.value === priority)}
              onChange={(selectedOption) => setPriority(selectedOption.value)}
              className="text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all hover:shadow-md"
              placeholder="Select priority"
              required
            />
          </div>

          {/* Status Dropdown */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Status</label>
            <Select
              options={statusOptions}
              value={statusOptions.find((option) => option.value === status)}
              onChange={(selectedOption) => setStatus(selectedOption.value)}
              className="text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all hover:shadow-md"
              placeholder="Select status"
              required
            />
          </div>

          {/* Inventories Dropdown */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 mb-1">Inventories Required</label>
            <Select
              options={inventoryOptions}
              isMulti
              value={inventories}
              onChange={setInventories}
              className="text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all hover:shadow-md"
              placeholder="Select required inventories"
            />
          </div>

          {/* Number of Workers Input */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Number of Workers</label>
            <input
              type="number"
              value={workers}
              onChange={(e) => setWorkers(e.target.value)}
              className="p-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all hover:shadow-md bg-gray-50"
              placeholder="Enter workers required"
              required
            />
          </div>

          {/* Location Button */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Project Location</label>
            <button
              type="button"
              onClick={() => setShowMap(true)}
              className="p-2 text-sm border border-gray-300 rounded-md bg-gray-50 text-gray-700 hover:bg-gray-100 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              {location || "Select On Map"}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="py-2 px-5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            {editIndex === -1 ? "Create Project" : "Update Project"}
          </button>
        </div>
      </form>

      {/* Overview Modal */}
      {showOverview && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
            <p>
              <strong>Title:</strong> {title}
            </p>
            <p>
              <strong>Description:</strong> {description}
            </p>
            <p>
              <strong>Priority:</strong> {priority}
            </p>
            <p>
              <strong>Status:</strong> {status}
            </p>
            <p>
              <strong>Inventories:</strong> {inventories.map((item) => item.label).join(", ")}
            </p>
            <p>
              <strong>Workers:</strong> {workers}
            </p>
            <p>
              <strong>Location:</strong> {location}
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowOverview(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map Modal */}
      <Modal isOpen={showMap} onClose={() => setShowMap(false)}>
        <MapComponent
          setLocation={(coords) => {
            setLocation(`Lat: ${coords.lat}, Lng: ${coords.lng}`);
            setShowMap(false);
          }}
        />
      </Modal>

      {/* Project List */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Project List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl duration-300"
            >
              {/* Card Header with Title */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-block bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-xs font-semibold">
                    Priority: {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                  </span>
                  <span className="inline-block bg-green-100 text-green-600 rounded-full px-3 py-1 text-xs font-semibold">
                    Status: {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
                <div className="text-sm text-gray-700">
                  <p>
                    <strong>Workers:</strong> {project.workers}
                  </p>
                  <p>
                    <strong>Location:</strong> {project.location}
                  </p>
                </div>
              </div>

              {/* Card Actions */}
              <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
                <button
                  onClick={() => handleEdit(index)}
                  className="inline-flex items-center px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all"
                >
                  <FaEdit className="mr-2" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="inline-flex items-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all"
                >
                  <FaTrash className="mr-2" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatePro;
