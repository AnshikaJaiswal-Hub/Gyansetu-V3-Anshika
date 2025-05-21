import React from "react";
import QuizCard from "./QuizCard";

const QuizList = ({ 
  upcomingQuizzes, 
  attemptedQuizzes, 
  currentTab, 
  setCurrentTab, 
  handleSelectQuiz 
}) => {
  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl text-center font-medium text-black">Quiz Corner</h1>

      {/* Tabs for filtering quizzes */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            currentTab === "upcoming"
              ? "border-b-2 border-violet-500 text-violet-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setCurrentTab("upcoming")}
        >
          Upcoming Quizzes
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            currentTab === "attempted"
              ? "border-b-2 border-violet-500 text-violet-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setCurrentTab("attempted")}
        >
          Attempted Quizzes
        </button>
      </div>

      {currentTab === "upcoming" && upcomingQuizzes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No upcoming quizzes available.</p>
        </div>
      )}

      {currentTab === "attempted" && attemptedQuizzes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No attempted quizzes yet.</p>
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