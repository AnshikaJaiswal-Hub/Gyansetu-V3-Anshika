import React from "react";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { formatDateTimeRange, isQuizAvailable } from "./utils";

const WelcomeScreen = ({ activeQuiz, setActiveQuiz, handleStart }) => {
  return (
    <div className="w-full h-full flex flex-col flex-1 bg-white rounded-4xl p-4 sm:p-6 md:p-10 min-w-[100%] max-h-[75vh] overflow-y-auto">
      <div className="text-center flex flex-col items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{activeQuiz.title}</h1>
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-sm text-gray-600">
          <span>{activeQuiz.subject}</span>
          <span className="hidden sm:inline">•</span>
          <span>
            {activeQuiz.className} {activeQuiz.section}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-700 mb-4 text-sm sm:text-base">{activeQuiz.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-4">
          <div className="bg-violet-200 p-3 sm:p-4 rounded-2xl">
            <p className="text-sm text-gray-700 mb-1">Available</p>
            <p className="font-semibold text-sm sm:text-base">
              {formatDateTimeRange(activeQuiz.startDate, activeQuiz.endDate)}
            </p>
          </div>

          <div className="bg-violet-200 p-3 sm:p-4 rounded-2xl">
            <p className="text-sm text-gray-700 mb-1">Duration</p>
            <p className="font-semibold text-sm sm:text-base">{activeQuiz.duration} minutes</p>
          </div>

          <div className="bg-violet-200 p-3 sm:p-4 rounded-2xl">
            <p className="text-sm text-gray-700 mb-1">Total Marks</p>
            <p className="font-semibold text-sm sm:text-base">{activeQuiz.totalMarks} marks</p>
          </div>

          <div className="bg-violet-200 p-3 sm:p-4 rounded-2xl">
            <p className="text-sm text-gray-700 mb-1">Passing Score</p>
            <p className="font-semibold text-sm sm:text-base">{activeQuiz.passingScore} marks</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-violet-600 p-3 sm:p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-violet-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-violet-700">
              Once you start this quiz, the timer will begin. Make sure you have enough time to
              complete it.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
        <button
          onClick={() => setActiveQuiz(null)}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-white rounded-lg bg-violet-600 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
        >
          Back to Quizzes
        </button>

        {activeQuiz.status === "upcoming" ? (
          <button
            onClick={handleStart}
            disabled={!isQuizAvailable(activeQuiz)}
            className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
              isQuizAvailable(activeQuiz)
                ? "bg-green-600 text-white hover:bg-green-500 focus:ring-blue-500"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isQuizAvailable(activeQuiz) ? "Start Quiz" : "Not Available Yet"}
          </button>
        ) : (
          <div className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-lg text-center">
            Quiz{" "}
            {activeQuiz.status === "completed" ? "Completed" : "Attempted"}: {activeQuiz.score} /{" "}
            {activeQuiz.totalMarks}
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;