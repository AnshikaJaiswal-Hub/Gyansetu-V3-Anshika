import React from "react";
import { CheckCircle2 } from "lucide-react";

const SubmittedScreen = ({ activeQuiz, resetQuiz }) => {
  return (
    <div className="w-full h-full flex flex-col flex-1 bg-white rounded-4xl p-4 sm:p-6 md:p-10 min-w-[100%] max-h-[75vh] overflow-y-auto">
      <div className="text-center flex flex-col items-center mb-6">
        <CheckCircle2 className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mb-4" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Quiz Submitted</h1>
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-sm text-gray-600">
          <span>{activeQuiz.subject}</span>
          <span className="hidden sm:inline">•</span>
          <span>
            {activeQuiz.className} {activeQuiz.section}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Quiz Summary</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-violet-200 p-3 sm:p-4 rounded-2xl">
            <p className="text-sm text-gray-700 mb-1">Score</p>
            <p className="font-semibold text-sm sm:text-base">
              {activeQuiz.score} / {activeQuiz.totalMarks}
            </p>
          </div>

          <div className="bg-violet-200 p-3 sm:p-4 rounded-2xl">
            <p className="text-sm text-gray-700 mb-1">Questions Attempted</p>
            <p className="font-semibold text-sm sm:text-base">
              {activeQuiz.questions.length} questions
            </p>
          </div>

          <div className="bg-violet-200 p-3 sm:p-4 rounded-2xl">
            <p className="text-sm text-gray-700 mb-1">Time Taken</p>
            <p className="font-semibold text-sm sm:text-base">{activeQuiz.duration} minutes</p>
          </div>

          <div className="bg-violet-200 p-3 sm:p-4 rounded-2xl">
            <p className="text-sm text-gray-700 mb-1">Status</p>
            <p className="font-semibold text-sm sm:text-base">
              {activeQuiz.score >= activeQuiz.passingScore ? "Passed" : "Failed"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
        <button
          onClick={resetQuiz}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-white rounded-lg bg-violet-600 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
        >
          Back to Quizzes
        </button>
      </div>
    </div>
  );
};

export default SubmittedScreen;