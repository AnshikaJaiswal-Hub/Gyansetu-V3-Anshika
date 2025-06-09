import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Calendar, Plus, ChevronRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext"; // Import the theme hook

const ButtonsDemo = () => {
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [showScheduleOptions, setShowScheduleOptions] = useState(false);
  const navigate = useNavigate();

  // Use the theme context
  const { darkMode } = useTheme();

  const handleContactClick = () => {
    setShowContactOptions(!showContactOptions);
    setShowScheduleOptions(false);
  };

  const handleScheduleClick = () => {
    navigate("/teacher/schedule-meeting");
  };

  const handleCreateAssignmentClick = () => {
    navigate("/teacher/create-assignment");
  };

  // Base and dark mode button styles
  const baseButtonClass =
    "font-bold text-xl md:text-lg lg:text-xl py-3 px-6 rounded-full flex items-center justify-between shadow-md hover:shadow-lg transition-all duration-300 w-full md:w-auto";

  // Create Assignment button styles
  const createAssignmentClass = darkMode
    ? `${baseButtonClass} bg-[#5b3a64 ] text-white border-2 border-purple-300`
    : `${baseButtonClass} bg-gray-100 text-purple-800 border-2 border-purple-800`;

  // Contact and Schedule button styles
  const actionButtonClass = darkMode
    ? `${baseButtonClass} bg-[#5b3a64 ] text-white border-2 border-purple-300`
    : `${baseButtonClass} bg-white text-purple-800 border-2 border-purple-800`;

  // Dropdown styles
  const dropdownClass = darkMode
    ? "absolute mt-2 w-40 bg-gray-800 border border-gray-600 rounded shadow-lg z-10 left-0"
    : "absolute mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg z-10 left-0";

  const dropdownItemClass = darkMode
    ? "block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
    : "block w-full text-left px-4 py-2 hover:bg-gray-100";

  // Circle icon background
  const circleIconClass = darkMode
    ? "ml-6 h-8 w-8 bg-[#231130] text-white rounded-full flex items-center justify-center"
    : "ml-6 h-8 w-8 bg-black text-white rounded-full flex items-center justify-center";

  return (
    // Container with flex-col for mobile (vertical) and flex-row for larger screens (horizontal)
    <div className="flex flex-col w-full gap-4 md:flex-row md:gap-6 md:mb-10">
      {/* Create Assignment Button */}
      <button
        className={createAssignmentClass}
        onClick={handleCreateAssignmentClick}
      >
        <div className="flex items-center">
          <Plus className="mr-2" size={20} />
          <span>Create Assignment</span>
        </div>
      </button>

      

      {/* Schedule Meeting Button */}
      <div className="relative w-full md:w-auto">
        <button className={actionButtonClass} onClick={handleScheduleClick}>
          <div className="flex items-center">
            <Calendar className="mr-2" size={20} />
            <span>Schedule Meeting</span>
          </div>
          <div className={circleIconClass}>
            <ChevronRight size={16} />
          </div>
        </button>
        
      </div>
    </div>
  );
};

export default ButtonsDemo;
