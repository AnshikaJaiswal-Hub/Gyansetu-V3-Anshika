import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";

/**
 * StatsSection Component
 *
 * Displays key user statistics in a responsive grid layout
 *
 * @param {Object} props
 * @param {Object} props.stats - Object containing stats information
 * @returns {JSX.Element}
 */
const StatsSection = ({
  stats = {
    quizzesCompleted: 14,
    hoursSpent: 6,
  },
}) => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  return (
    <div className="w-full mb-8">
      <h2 className={`text-xl font-semibold mb-6 ${darkMode ? "text-white" : ""}`}>Your Progress Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div 
          className={`rounded-xl p-6 shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
            darkMode 
              ? "bg-[#341b47] hover:bg-[#4a1f5e] border-[#4a1f5e]" 
              : "bg-white hover:bg-violet-50 border-gray-100"
          }`}
          onClick={() => navigate('/quiz')}
        >
          <div className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
            Quizzes Completed
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className={`text-4xl font-semibold ${darkMode ? "text-white" : ""}`}>
              {stats.quizzesCompleted}
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 group ${
              darkMode 
                ? "bg-[#4a1f5e] hover:bg-[#5b2a6e]" 
                : "bg-violet-400 hover:bg-violet-600"
            }`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-colors duration-300 ${
                  darkMode 
                    ? "text-white group-hover:text-violet-100" 
                    : "text-white group-hover:text-violet-100"
                }`}
              >
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </div>
          </div>
        </div>

        <div 
          className={`rounded-xl p-6 shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
            darkMode 
              ? "bg-[#341b47] hover:bg-[#4a1f5e] border-[#4a1f5e]" 
              : "bg-white hover:bg-violet-50 border-gray-100"
          }`}
          onClick={() => navigate('/assignment')}
        >
          <div className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
            Assignments Completed
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className={`text-4xl font-semibold ${darkMode ? "text-white" : ""}`}>
              {stats.hoursSpent} Hrs
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 group ${
              darkMode 
                ? "bg-[#4a1f5e] hover:bg-[#5b2a6e]" 
                : "bg-violet-400 hover:bg-violet-600"
            }`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-colors duration-300 ${
                  darkMode 
                    ? "text-white group-hover:text-violet-100" 
                    : "text-white group-hover:text-violet-100"
                }`}
              >
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
