// File: components/calendar/CalendarHeader.jsx
import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Search,
  Clock,
  CalendarDays,
  CalendarClock,
  Calendar,
} from "lucide-react";
import FilterMenu from "./FilterMenu";
import { useTheme } from "../../../../context/ThemeContext"; // Import the theme hook

const CalendarHeader = ({
  currentView,
  setCurrentView,
  currentDate,
  headerTitle,
  navigatePrevious,
  navigateNext,
  handleTodayClick,
  handleAddEventClick,
  showFilterMenu,
  setShowFilterMenu,
  filterType,
  setFilterType,
  searchTerm,
  setSearchTerm,
}) => {
  // Use the theme context
  const { darkMode } = useTheme();

  return (
    <div className={`${darkMode ? "bg-[#341b47]" : "bg-white"} shadow rounded-lg p-4 mb-6 transition-colors duration-300`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* View Controls */}
        <div className="flex items-center space-x-2">
          <button
            className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
              currentView === "day"
              ? darkMode 
              ? "bg-[#5c4370] text-white"
              : "bg-blue-100 text-blue-800"
            : darkMode
              ? "bg-[#5c4370] text-gray-300 hover:bg-[#231130]"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setCurrentView("day")}
          >
            <Clock size={18} className="mr-1" />
            Day
          </button>
          <button
            className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
              currentView === "week"
                ? darkMode 
                  ? "bg-[#5c4370] text-white"
                  : "bg-blue-100 text-blue-800"
                : darkMode
                  ? "bg-[#5c4370] text-gray-300 hover:bg-[#231130]"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setCurrentView("week")}
          >
            <CalendarDays size={18} className="mr-1" />
            Week
          </button>
          <button
            className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
              currentView === "month"
              ? darkMode 
              ? "bg-[#5c4370] text-white"
              : "bg-blue-100 text-blue-800"
            : darkMode
              ? "bg-[#5c4370] text-gray-300 hover:bg-[#231130]"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setCurrentView("month")}
          >
            <CalendarClock size={18} className="mr-1" />
            Month
          </button>
          <button
            className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
              currentView === "quarter"
              ? darkMode 
              ? "bg-[#5c4370] text-white"
              : "bg-blue-100 text-blue-800"
            : darkMode
              ? "bg-[#5c4370] text-gray-300 hover:bg-[#231130]"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setCurrentView("quarter")}
          >
            <Calendar size={18} className="mr-1" />
            Quarter
          </button>
          <button
            className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
              currentView === "year"
              ? darkMode 
              ? "bg-[#5c4370] text-white"
              : "bg-blue-100 text-blue-800"
            : darkMode
              ? "bg-[#5c4370] text-gray-300 hover:bg-[#231130]"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setCurrentView("year")}
          >
            <Calendar size={18} className="mr-1" />
            Year
          </button>
        </div>

        {/* Date Navigation */}
        <div className="flex items-center">
          <button
            className={`p-2 mr-2 rounded-full transition-colors duration-300 ${
              darkMode 
                ? "bg-[#5c4370] hover:bg-[#231130] text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
            onClick={() => navigatePrevious()}
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className={`text-lg font-semibold mx-2 transition-colors duration-300 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}>{headerTitle}</h2>
          <button
            className={`p-2 ml-2 rounded-full transition-colors duration-300 ${
              darkMode 
                ? "bg-[#5c4370] hover:bg-[#231130] text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
            onClick={() => navigateNext()}
          >
            <ChevronRight size={20} />
          </button>
          <button
            className={`ml-4 py-1 px-3 rounded transition-colors duration-300 ${
              darkMode 
                ? "bg-[#341b47] hover:bg-[#5b3a64] text-white"
                : "bg-blue-50 hover:bg-blue-100 text-blue-600"
            }`}
            onClick={handleTodayClick}
          >
            Today
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            className={`text-sm py-1 px-3 rounded flex items-center gap-1 transition-colors duration-300 ${
              darkMode 
                ? "bg-[#5c4370] hover:bg-[#231130] text-white"
                : "bg-blue-50 hover:bg-blue-100 text-blue-600"
            }`}
            onClick={handleAddEventClick}
          >
            <Plus size={16} />
            Add Event
          </button>
          <div className="relative">
            <button
              className={`text-sm py-1 px-3 rounded flex items-center gap-1 transition-colors duration-300 ${
                darkMode 
                  ? "bg-[#5c4370] hover:bg-[#231130] text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <Filter size={16} />
              Filter
            </button>
            {showFilterMenu && (
              <FilterMenu
                filterType={filterType}
                setFilterType={setFilterType}
              />
            )}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mt-4 flex items-center">
        <div className="relative w-64 mr-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className={darkMode ? "text-gray-200" : "text-gray-400"} />
          </div>
          <input
            type="text"
            className={` border text-sm rounded-lg block w-full pl-10 p-2 transition-colors duration-300 ${
              darkMode 
                ? "bg-[#5c4370] border-gray-700 text-gray-200 placeholder-gray-200"
                : "bg-gray-50 border-gray-300 text-gray-900"
            }`}
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Event type legend */}
        <div className="ml-auto flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-400 rounded-full mr-1"></div>
            <span className={darkMode ? "text-gray-300" : "text-gray-800"}>Regular Events</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-400 rounded-full mr-1"></div>
            <span className={darkMode ? "text-gray-300" : "text-gray-800"}>Exams</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-400 rounded-full mr-1"></div>
            <span className={darkMode ? "text-gray-300" : "text-gray-800"}>Meetings</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-amber-400 rounded-full mr-1"></div>
            <span className={darkMode ? "text-gray-300" : "text-gray-800"}>Holidays</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;