import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

const SubmittedScreen = ({ activeQuiz, resetQuiz }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`w-full h-full flex flex-col flex-1 ${darkMode ? "bg-[#341b47]" : "bg-white"} rounded-4xl p-4 sm:p-6 md:p-10 min-w-[100%] max-h-[75vh] overflow-y-auto transition-colors duration-300`}>
      <div className="text-center flex flex-col items-center mb-6">
        <CheckCircle2 className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mb-4" />
        <h1 className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"} mb-2 transition-colors duration-300`}>
          Quiz Submitted
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
        <h2 className={`text-lg sm:text-xl font-semibold ${darkMode ? "text-white" : "text-gray-800"} mb-4 transition-colors duration-300`}>
          Quiz Summary
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className={`${darkMode ? "bg-[#4a1f5e]" : "bg-violet-200"} p-3 sm:p-4 rounded-2xl transition-colors duration-300`}>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-700"} mb-1 transition-colors duration-300`}>
              Score
            </p>
            <p className={`font-semibold text-sm sm:text-base ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-300`}>
              {activeQuiz.score} / {activeQuiz.totalMarks}
            </p>
          </div>

          <div className={`${darkMode ? "bg-[#4a1f5e]" : "bg-violet-200"} p-3 sm:p-4 rounded-2xl transition-colors duration-300`}>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-700"} mb-1 transition-colors duration-300`}>
              Questions Attempted
            </p>
            <p className={`font-semibold text-sm sm:text-base ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-300`}>
              {activeQuiz.questions.length} questions
            </p>
          </div>

          <div className={`${darkMode ? "bg-[#4a1f5e]" : "bg-violet-200"} p-3 sm:p-4 rounded-2xl transition-colors duration-300`}>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-700"} mb-1 transition-colors duration-300`}>
              Time Taken
            </p>
            <p className={`font-semibold text-sm sm:text-base ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-300`}>
              {activeQuiz.duration} minutes
            </p>
          </div>

          <div className={`${darkMode ? "bg-[#4a1f5e]" : "bg-violet-200"} p-3 sm:p-4 rounded-2xl transition-colors duration-300`}>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-700"} mb-1 transition-colors duration-300`}>
              Status
            </p>
            <p className={`font-semibold text-sm sm:text-base ${
              activeQuiz.score >= activeQuiz.passingScore
                ? darkMode ? "text-green-400" : "text-green-600"
                : darkMode ? "text-red-400" : "text-red-600"
            } transition-colors duration-300`}>
              {activeQuiz.score >= activeQuiz.passingScore ? "Passed" : "Failed"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <button
          onClick={resetQuiz}
          className={`w-full px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${
            darkMode
              ? "bg-[#4a1f5e] text-white hover:bg-[#5b2a6e]"
              : "bg-violet-500 text-white hover:bg-violet-600"
          }`}
        >
          Back to Quiz List
        </button>
      </div>
    </div>
  );
};

export default SubmittedScreen;