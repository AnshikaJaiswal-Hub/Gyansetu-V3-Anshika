import React from "react";
import { Calendar, Clock } from "lucide-react";
import { formatDateTimeRange, isQuizAvailable, subjectColors } from "./utils";
import { useTheme } from "../../../context/ThemeContext";

const QuizCard = ({ quiz, handleSelectQuiz, isAttempted }) => {
  const { darkMode } = useTheme();

  if (isAttempted) {
    return (
      <div className={`${darkMode ? "bg-[#341b47]" : "bg-white"} rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl mx-auto transition-all duration-300 hover:scale-105`}>
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 mb-2">
            <h2 className={`text-lg sm:text-xl font-semibold ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-300`}>
              {quiz.title}
            </h2>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded ${
                quiz.status === "completed"
                  ? darkMode 
                    ? "bg-[#4a1f5e] text-purple-200"
                    : "bg-violet-200 text-violet-500"
                  : darkMode
                    ? "bg-[#4a1f5e] text-purple-200"
                    : "bg-violet-200 text-violet-500"
              } transition-colors duration-300`}
            >
              {quiz.status === "completed" ? "Completed" : "Attempted"}
            </span>
          </div>

          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm mb-2 sm:ml-4 transition-colors duration-300`}>
            {quiz.className} {quiz.section} - {quiz.subject}
          </p>

          <div className={`flex items-center mb-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} transition-colors duration-300`}>
            <Calendar size={16} className="mr-2 flex-shrink-0" />
            <span className="truncate">Taken on: {new Date(quiz.startDate).toLocaleDateString()}</span>
          </div>

          <div className={`mb-4 ${darkMode ? "bg-[#4a1f5e]" : "bg-gray-100"} p-3 rounded-lg transition-colors duration-300`}>
            <div className="flex justify-between mb-1">
              <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} transition-colors duration-300`}>
                Your Score:
              </span>
              <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} transition-colors duration-300`}>
                {quiz.score} / {quiz.totalMarks}
              </span>
            </div>
            <div className={`w-full ${darkMode ? "bg-[#341b47]" : "bg-gray-200"} rounded-full h-2.5 transition-colors duration-300`}>
              <div
                className={`h-2.5 rounded-full ${
                  quiz.score >= quiz.passingScore ? "bg-[#c1d956]" : "bg-red-600"
                }`}
                style={{
                  width: `${(quiz.score / quiz.totalMarks) * 100}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-end mt-1">
              <span
                className={`text-xs font-medium ${
                  quiz.score >= quiz.passingScore ? "text-[#c1d956]" : "text-red-700"
                }`}
              >
                {quiz.score >= quiz.passingScore ? "Passed" : "Failed"}
              </span>
            </div>
          </div>

          <button
            onClick={() => handleSelectQuiz(quiz)}
            className={`w-full px-4 py-2 ${
              darkMode 
                ? "bg-[#4a1f5e] hover:bg-[#5b2a6e] text-white" 
                : "bg-violet-500 hover:bg-violet-600 text-white"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 transition-colors duration-300`}
          >
            View Details
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`${
          darkMode
            ? "bg-[#341b47]"
            : subjectColors[quiz.subject] || subjectColors.default
        } rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl mx-auto transition-all duration-300 hover:scale-105`}
      >
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 mb-2">
            <h2 className={`text-lg sm:text-xl font-semibold ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-300`}>
              {quiz.title}
            </h2>
            <span className={`${
              darkMode 
                ? "bg-[#4a1f5e] text-purple-200" 
                : "bg-gray-300 text-violet-800"
            } text-xs font-semibold px-2.5 py-0.5 rounded transition-colors duration-300`}>
              {quiz.subject}
            </span>
          </div>

          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm mb-4 transition-colors duration-300`}>
            {quiz.className} {quiz.section}
          </p>

          <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} mb-4 line-clamp-2 transition-colors duration-300`}>
            {quiz.description}
          </p>

          <div className={`flex items-center mb-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} transition-colors duration-300`}>
            <Calendar size={16} className="mr-2 flex-shrink-0" />
            <span className="truncate">Available: {formatDateTimeRange(quiz.startDate, quiz.endDate)}</span>
          </div>

          <div className={`flex items-center mb-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} transition-colors duration-300`}>
            <Clock size={16} className="mr-2 flex-shrink-0" />
            <span>Duration: {quiz.duration} minutes</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <p className={`font-medium ${darkMode ? "text-gray-400" : "text-gray-600"} transition-colors duration-300`}>
                Total Marks:
              </p>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-800"} transition-colors duration-300`}>
                {quiz.totalMarks} marks
              </p>
            </div>
            <div>
              <p className={`font-medium ${darkMode ? "text-gray-400" : "text-gray-600"} transition-colors duration-300`}>
                Passing Score:
              </p>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-800"} transition-colors duration-300`}>
                {quiz.passingScore} marks
              </p>
            </div>
          </div>

          <button
            onClick={() => handleSelectQuiz(quiz)}
            disabled={!isQuizAvailable(quiz)}
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${
              isQuizAvailable(quiz)
                ? darkMode
                  ? "bg-[#4a1f5e] text-white hover:bg-[#5b2a6e] focus:ring-purple-500"
                  : "bg-violet-500 text-white hover:bg-violet-600 focus:ring-violet-600"
                : darkMode
                  ? "bg-[#341b47] text-gray-500 cursor-not-allowed"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isQuizAvailable(quiz) ? "Start Quiz" : "Not Available Yet"}
          </button>
        </div>
      </div>
    );
  }
};

export default QuizCard;