import React from "react";
import { useTheme } from "../../context/ThemeContext"; // Import the theme hook

const ClassOverview = ({
  selectedClass,
  selectedSection,
  handleClassChange,
  handleSectionChange,
  currentClassData,
}) => {
  // Use the theme context
  const { darkMode } = useTheme();

  return (
    <div
      className={`${
        darkMode ? "bg-[#231130]" : "bg-gray-200"
      } border border-[#2a0c2e] p-4 md:p-6 rounded-4xl w-full transition-colors duration-300`}
    >
      {/* Header Area for Heading and Dropdowns */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2
          className={`text-lg font-semibold ${
            darkMode ? "text-[#E8EAED]" : "text-gray-800"
          } mb-3 md:mb-0 transition-colors duration-300`}
        >
          Class Overview
        </h2>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
          <div className="flex items-center">
            <label
              htmlFor="classSelect"
              className={`mr-2 ${
                darkMode ? "text-[#7E8CA0]" : "text-gray-600"
              } text-sm transition-colors duration-300`}
            >
              Select Class:
            </label>
            <select
              id="classSelect"
              value={selectedClass}
              onChange={handleClassChange}
              className={`border ${
                darkMode
                  ? "border-gray-600 bg-[#231130] text-[#E8EAED] focus:ring-purple-400"
                  : "border-gray-300 bg-white text-gray-800 focus:ring-purple-500"
              } rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 transition-colors duration-300`}
            >
              {[...Array(7)].map((_, i) => (
                <option key={i} value={6 + i}>
                  Class {6 + i}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="sectionSelect"
              className={`mr-2 ${
                darkMode ? "text-[#7E8CA0]" : "text-gray-600"
              } text-sm transition-colors duration-300`}
            >
              Select Section:
            </label>
            <select
              id="sectionSelect"
              value={selectedSection}
              onChange={handleSectionChange}
              className={`border ${
                darkMode
                  ? "border-gray-600 bg-[#231130] text-[#E8EAED] focus:ring-purple-400"
                  : "border-gray-300 bg-white text-gray-800 focus:ring-purple-500"
              } rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 transition-colors duration-300`}
            >
              {["A", "B", "C", "D", "E", "F"].map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Inner Panel */}
      <div
        className={`${
          darkMode ? "bg-[#341b47]" : "bg-white"
        } rounded-2xl p-4 md:p-6 transition-colors duration-300`}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Students */}
          <div
            className={`p-4 ${
              darkMode ? "bg-[#231130]" : "bg-gray-100"
            } rounded-lg transition-colors duration-300`}
          >
            <div
              className={`text-3xl font-bold ${
                darkMode ? "text-[#E8EAED]" : "text-gray-800"
              } transition-colors duration-300`}
            >
              {currentClassData?.totalStudents || "30"}
            </div>
            <div
              className={`${
                darkMode ? "text-[#7E8CA0]" : "text-gray-500"
              } text-sm mt-1 transition-colors duration-300`}
            >
              Total Students
            </div>
          </div>

          {/* Avg. Attendance */}
          <div
            className={`p-4 ${
              darkMode ? "bg-[#231130]" : "bg-gray-100"
            } rounded-lg transition-colors duration-300`}
          >
            <div
              className={`text-3xl font-bold ${
                darkMode ? "text-[#6EE7B7]" : "text-gray-800"
              } transition-colors duration-300`}
            >
              {currentClassData?.avgAttendance || "88%"}
            </div>
            <div
              className={`${
                darkMode ? "text-[#7E8CA0]" : "text-gray-500"
              } text-sm mt-1 transition-colors duration-300`}
            >
              Avg. Attendance
            </div>
          </div>

          {/* Completion Rate */}
          <div
            className={`p-4 ${
              darkMode ? "bg-[#231130]" : "bg-gray-100"
            } rounded-lg transition-colors duration-300`}
          >
            <div
              className={`text-3xl font-bold ${
                darkMode ? "text-[#60A5FA]" : "text-gray-800"
              } transition-colors duration-300`}
            >
              {currentClassData?.completionRate || "79%"}
            </div>
            <div
              className={`${
                darkMode ? "text-[#7E8CA0]" : "text-gray-500"
              } text-sm mt-1 transition-colors duration-300`}
            >
              Completion Rate
            </div>
          </div>

          {/* Need Attention */}
          <div
            className={`p-4 ${
              darkMode ? "bg-[#231130]" : "bg-gray-100"
            } rounded-lg transition-colors duration-300`}
          >
            <div
              className={`text-3xl font-bold ${
                darkMode ? "text-[#F87171]" : "text-gray-800"
              } transition-colors duration-300`}
            >
              {currentClassData?.needAttention || "3"}
            </div>
            <div
              className={`${
                darkMode ? "text-[#7E8CA0]" : "text-gray-500"
              } text-sm mt-1 transition-colors duration-300`}
            >
              Need Attention
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassOverview;
