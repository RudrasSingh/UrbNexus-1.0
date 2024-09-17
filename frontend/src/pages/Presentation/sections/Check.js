import React from "react";
import { FaCheckCircle, FaHourglassHalf, FaExclamationCircle } from "react-icons/fa";

const Trial = () => {
  const departments = [
    {
      name: "Jal Vibhag",
      tasks: [
        { title: "Launch social media campaign", status: "in-progress" },
        { title: "Water Conservation Project", status: "pending" },
        { title: "Rainwater Harvesting Setup", status: "completed" },
      ],
    },
    {
      name: "Electricity",
      tasks: [
        { title: "Power Grid Maintenance", status: "in-progress" },
        { title: "Solar Panel Installation", status: "pending" },
        { title: "Power Cable Inspection", status: "completed" },
      ],
    },
    {
      name: "Roads",
      tasks: [
        { title: "Road Resurfacing Project", status: "in-progress" },
        { title: "Traffic Signal Upgrade", status: "pending" },
        { title: "New Road Construction", status: "completed" },
      ],
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle className="text-green-500" />;
      case "in-progress":
        return <FaHourglassHalf className="text-yellow-500" />;
      case "pending":
        return <FaExclamationCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {departments.map((department, index) => (
            <div key={index} className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
              <div className="flex items-center justify-between p-6 bg-gray-100">
                <h3 className="text-xl font-semibold text-gray-800">{department.name}</h3>
                <span className="text-sm font-medium text-gray-500">
                  {department.tasks.length} Tasks
                </span>
              </div>
              <ul className="divide-y divide-gray-200">
                {department.tasks.map((task, taskIndex) => (
                  <li
                    key={taskIndex}
                    className="p-4 hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="mr-3">{getStatusIcon(task.status)}</span>
                        <p className="text-sm font-medium text-gray-900">{task.title}</p>
                      </div>
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {task.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trial;
