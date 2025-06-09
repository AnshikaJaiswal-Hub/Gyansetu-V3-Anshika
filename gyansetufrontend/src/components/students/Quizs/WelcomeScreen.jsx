import React from "react";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { formatDateTimeRange, isQuizAvailable } from "./utils";
import { useTheme } from "../../../context/ThemeContext";

const WelcomeScreen = ({ activeQuiz, setActiveQuiz, handleStart }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`w-full h-full flex flex-col flex-1 ${darkMode ? "bg-[#341b47]" : "bg-white"} rounded-4xl p-4 sm:p-6 md:p-10 min-w-[100%] max-h-[75vh] overflow-y-auto transition-colors duration-300`}>
      <div className="text-center flex flex-col items-center mb-6">
        <h1 className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"} mb-2 transition-colors duration-300`}>
          {activeQuiz.title}
        </h1>
        <div className={`flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} transition-colors duration-300`}>
          <span>{activeQuiz.subject}</span>
          <span className="hidden sm:inline">•</span>
          <span>
            {activeQuiz.className} {activeQuiz.section}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} mb-4 text-sm sm:text-base transition-colors duration-300`}>
          {activeQuiz.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-4">
          <div className={`${darkMode ? "bg-[#4a1f5e]" : "bg-violet-200"} p-3 sm:p-4 rounded-2xl transition-colors duration-300`}>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-700"} mb-1 transition-colors duration-300`}>
              Available
            </p>
            <p className={`font-semibold text-sm sm:text-base ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-300`}>
              {formatDateTimeRange(activeQuiz.startDate, activeQuiz.endDate)}
            </p>
          </div>

          <div className={`${darkMode ? "bg-[#4a1f5e]" : "bg-violet-200"} p-3 sm:p-4 rounded-2xl transition-colors duration-300`}>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-700"} mb-1 transition-colors duration-300`}>
              Duration
            </p>
            <p className={`font-semibold text-sm sm:text-base ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-300`}>
              {activeQuiz.duration} minutes
            </p>
          </div>

          <div className={`${darkMode ? "bg-[#4a1f5e]" : "bg-violet-200"} p-3 sm:p-4 rounded-2xl transition-colors duration-300`}>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-700"} mb-1 transition-colors duration-300`}>
              Total Marks
            </p>
            <p className={`font-semibold text-sm sm:text-base ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-300`}>
              {activeQuiz.totalMarks} marks
            </p>
          </div>

          <div className={`${darkMode ? "bg-[#4a1f5e]" : "bg-violet-200"} p-3 sm:p-4 rounded-2xl transition-colors duration-300`}>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-700"} mb-1 transition-colors duration-300`}>
              Passing Score
            </p>
            <p className={`font-semibold text-sm sm:text-base ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-300`}>
              {activeQuiz.passingScore} marks
            </p>
          </div>
        </div>

        {!isQuizAvailable(activeQuiz) && (
          <div className={`${darkMode ? "bg-red-900/50" : "bg-red-100"} p-4 rounded-lg flex items-start gap-3 transition-colors duration-300`}>
            <AlertCircle className={`h-5 w-5 ${darkMode ? "text-red-400" : "text-red-500"} flex-shrink-0 mt-0.5`} />
            <div>
              <p className={`font-medium ${darkMode ? "text-red-400" : "text-red-700"} transition-colors duration-300`}>
                Quiz Not Available
              </p>
              <p className={`text-sm ${darkMode ? "text-red-300" : "text-red-600"} mt-1 transition-colors duration-300`}>
                This quiz is not available for taking at the moment. Please check the available time period.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setActiveQuiz(null)}
          className={`px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${
            darkMode
              ? "bg-[#4a1f5e] text-white hover:bg-[#5b2a6e]"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Back to Quiz List
        </button>
        <button
          onClick={handleStart}
          disabled={!isQuizAvailable(activeQuiz)}
          className={`px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${
            isQuizAvailable(activeQuiz)
              ? darkMode
                ? "bg-[#4a1f5e] text-white hover:bg-[#5b2a6e]"
                : "bg-violet-500 text-white hover:bg-violet-600"
              : darkMode
                ? "bg-[#341b47] text-gray-500 cursor-not-allowed"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;