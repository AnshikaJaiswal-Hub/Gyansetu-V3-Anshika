import React from "react";
import QuizCard from "./QuizCard";
import { useTheme } from "../../../context/ThemeContext"; // Import theme context

const QuizList = ({ 
  upcomingQuizzes, 
  attemptedQuizzes, 
  currentTab, 
  setCurrentTab, 
  handleSelectQuiz 
}) => {
  // Use theme context
  const { darkMode } = useTheme();

  return (
    <div className="max-w-6xl">
      <h1 className={`text-3xl text-center font-medium ${darkMode ? "text-white" : "text-black"} transition-colors duration-300`}>
        Quiz Corner
      </h1>

      {/* Tabs for filtering quizzes */}
      <div className={`flex border-b ${darkMode ? "border-[#4a2f52]" : "border-gray-200"} mb-6 transition-colors duration-300`}>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            currentTab === "upcoming"
              ? darkMode 
                ? "border-b-2 border-purple-500 text-purple-200"
                : "border-b-2 border-violet-500 text-violet-600"
              : darkMode
                ? "text-gray-400 hover:text-purple-200"
                : "text-gray-500 hover:text-gray-700"
          } transition-colors duration-300`}
          onClick={() => setCurrentTab("upcoming")}
        >
          Upcoming Quizzes
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            currentTab === "attempted"
              ? darkMode 
                ? "border-b-2 border-purple-500 text-purple-200"
                : "border-b-2 border-violet-500 text-violet-600"
              : darkMode
                ? "text-gray-400 hover:text-purple-200"
                : "text-gray-500 hover:text-gray-700"
          } transition-colors duration-300`}
          onClick={() => setCurrentTab("attempted")}
        >
          Attempted Quizzes
        </button>
      </div>

      {currentTab === "upcoming" && upcomingQuizzes.length === 0 && (
        <div className="text-center py-12">
          <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} transition-colors duration-300`}>
            No upcoming quizzes available.
          </p>
        </div>
      )}

      {currentTab === "attempted" && attemptedQuizzes.length === 0 && (
        <div className="text-center py-12">
          <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} transition-colors duration-300`}>
            No attempted quizzes yet.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTab === "upcoming" &&
          upcomingQuizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              handleSelectQuiz={handleSelectQuiz}
              isAttempted={false}
            />
          ))}
        {currentTab === "attempted" &&
          attemptedQuizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              handleSelectQuiz={handleSelectQuiz}
              isAttempted={true}
            />
          ))}
      </div>
    </div>
  );
};

export default QuizList;