import React, { useState } from "react";
import { FiZoomIn } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext"; // Import the theme hook

const NeedsAttention = ({
  selectedClass,
  selectedSection,
  allStudentsNeedingAttention = [],
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [filterMode, setFilterMode] = useState("classAndSection");
  const [filterClass, setFilterClass] = useState(selectedClass);
  const [filterSection, setFilterSection] = useState(selectedSection);

  // Use the theme context
  const { darkMode } = useTheme();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleFilterModeChange = (e) => {
    setFilterMode(e.target.value);
    if (e.target.value === "classAndSection") {
      setFilterClass(selectedClass);
      setFilterSection(selectedSection);
    }
  };

  const handleFilterClassChange = (e) => {
    setFilterClass(e.target.value);
  };

  const handleFilterSectionChange = (e) => {
    setFilterSection(e.target.value);
  };

  // Filter students for the main view based on selectedClass and selectedSection
  const mainViewStudents = allStudentsNeedingAttention.filter(
    (student) =>
      student.class === selectedClass && student.section === selectedSection
  );

  // Filter students for the popup based on the selected mode
  const filteredStudents = () => {
    if (filterMode === "all") {
      return allStudentsNeedingAttention;
    } else if (filterMode === "class") {
      return allStudentsNeedingAttention.filter(
        (student) => student.class === filterClass
      );
    } else {
      // classAndSection
      return allStudentsNeedingAttention.filter(
        (student) =>
          student.class === filterClass && student.section === filterSection
      );
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-[#231130]" : "bg-gray-200"
      } p-6 rounded-[2rem] transition-colors duration-300`}
    >
      {/* Header Area for Heading and Icon */}
      <div className="flex justify-between items-center mb-4">
        <h2
          className={`text-lg font-semibold ${
            darkMode ? "text-[#E8EAED]" : "text-gray-800"
          } transition-colors duration-300`}
        >
          Needs Attention
        </h2>
        <button
          onClick={togglePopup}
          className={`${
            darkMode
              ? "text-[#7E8CA0] hover:text-[#E8EAED]"
              : "text-gray-600 hover:text-gray-800"
          } focus:outline-none transition-colors duration-300`}
          aria-label="Explore students needing attention"
        >
          <FiZoomIn className="w-6 h-6" />
        </button>
      </div>

      {/* Inner Panel */}
      <div
        className={`${
          darkMode ? "bg-[#341b47]" : "bg-white"
        } rounded-[1.5rem] pt-8 px-4 pb-4 transition-colors duration-300`}
      >
        <div className="space-y-4">
          {mainViewStudents.length > 0 ? (
            mainViewStudents.map((student, index) => (
              <div
                key={index}
                className={`p-4 ${
                  darkMode ? "bg-[#231130]" : "bg-gray-100"
                } rounded-lg transition-colors duration-300`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      className={`font-medium ${
                        darkMode ? "text-[#E8EAED]" : "text-gray-800"
                      } transition-colors duration-300`}
                    >
                      {student.name}
                    </h3>
                    <p
                      className={`${
                        darkMode ? "text-[#7E8CA0]" : "text-gray-600"
                      } text-sm mt-1 transition-colors duration-300`}
                    >
                      {student.issue}
                    </p>
                  </div>
                  <span
                    className={`text-sm ${
                      darkMode ? "text-[#7E8CA0]" : "text-gray-500"
                    } transition-colors duration-300`}
                  >
                    {student.subject}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p
              className={`${
                darkMode ? "text-[#7E8CA0]" : "text-gray-500"
              } text-sm transition-colors duration-300`}
            >
              No students need attention in Class {selectedClass}-
              {selectedSection}.
            </p>
          )}
        </div>
      </div>

      {/* Popup Modal with Blur Backdrop */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
          <div
            className={`${
              darkMode ? "bg-[#2C3142]" : "bg-white"
            } w-[800px] h-[600px] rounded-[2rem] p-8 shadow-lg relative transition-colors duration-300`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3
                className={`text-xl font-semibold ${
                  darkMode ? "text-[#E8EAED]" : "text-gray-800"
                } transition-colors duration-300`}
              >
                Students Needing Attention
              </h3>
              <button
                onClick={togglePopup}
                className={`${
                  darkMode
                    ? "text-[#7E8CA0] hover:text-[#E8EAED]"
                    : "text-gray-600 hover:text-gray-800"
                } focus:outline-none transition-colors duration-300`}
                aria-label="Close popup"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Filter Controls */}
            <div className="mb-6 flex space-x-4">
              <div className="flex items-center">
                <label
                  htmlFor="filterMode"
                  className={`mr-2 ${
                    darkMode ? "text-[#7E8CA0]" : "text-gray-600"
                  } text-sm transition-colors duration-300`}
                >
                  Filter By:
                </label>
                <select
                  id="filterMode"
                  value={filterMode}
                  onChange={handleFilterModeChange}
                  className={`border ${
                    darkMode
                      ? "border-gray-600 bg-[#4A5568] text-[#E8EAED] focus:ring-purple-400"
                      : "border-gray-300 bg-white text-gray-800 focus:ring-purple-500"
                  } rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 transition-colors duration-300`}
                >
                  <option value="all">All Students</option>
                  <option value="class">Class</option>
                  <option value="classAndSection">Class + Section</option>
                </select>
              </div>
              {filterMode !== "all" && (
                <div className="flex items-center">
                  <label
                    htmlFor="filterClass"
                    className={`mr-2 ${
                      darkMode ? "text-[#7E8CA0]" : "text-gray-600"
                    } text-sm transition-colors duration-300`}
                  >
                    Class:
                  </label>
                  <select
                    id="filterClass"
                    value={filterClass}
                    onChange={handleFilterClassChange}
                    className={`border ${
                      darkMode
                        ? "border-gray-600 bg-[#4A5568] text-[#E8EAED] focus:ring-purple-400"
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
              )}
              {filterMode === "classAndSection" && (
                <div className="flex items-center">
                  <label
                    htmlFor="filterSection"
                    className={`mr-2 ${
                      darkMode ? "text-[#7E8CA0]" : "text-gray-600"
                    } text-sm transition-colors duration-300`}
                  >
                    Section:
                  </label>
                  <select
                    id="filterSection"
                    value={filterSection}
                    onChange={handleFilterSectionChange}
                    className={`border ${
                      darkMode
                        ? "border-gray-600 bg-[#4A5568] text-[#E8EAED] focus:ring-purple-400"
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
              )}
            </div>

            {/* Filtered Student List */}
            <div className="overflow-y-auto h-[450px]">
              {filteredStudents().length > 0 ? (
                filteredStudents().map((student, index) => (
                  <div
                    key={index}
                    className={`p-4 ${
                      darkMode ? "bg-[#3A4256]" : "bg-gray-100"
                    } rounded-lg mb-3 last:mb-0 transition-colors duration-300`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4
                          className={`font-medium ${
                            darkMode ? "text-[#E8EAED]" : "text-gray-800"
                          } transition-colors duration-300`}
                        >
                          {student.name}
                        </h4>
                        <p
                          className={`${
                            darkMode ? "text-[#7E8CA0]" : "text-gray-600"
                          } text-sm transition-colors duration-300`}
                        >
                          {student.issue}
                        </p>
                        <p
                          className={`${
                            darkMode ? "text-[#7E8CA0]" : "text-gray-500"
                          } text-sm transition-colors duration-300`}
                        >
                          Class {student.class}-{student.section}
                        </p>
                      </div>
                      <span
                        className={`text-sm ${
                          darkMode ? "text-[#7E8CA0]" : "text-gray-500"
                        } transition-colors duration-300`}
                      >
                        {student.subject}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p
                  className={`${
                    darkMode ? "text-[#7E8CA0]" : "text-gray-500"
                  } text-sm transition-colors duration-300`}
                >
                  No students need attention for the selected filter.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NeedsAttention;
