import React from "react";
import { Calendar, Clock } from "lucide-react";
import { formatDateTimeRange, isQuizAvailable, subjectColors } from "./utils";

const QuizCard = ({ quiz, handleSelectQuiz, isAttempted }) => {
  if (isAttempted) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl mx-auto transition-transform duration-300 hover:scale-105">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 mb-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{quiz.title}</h2>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded ${
                quiz.status === "completed"
                  ? "bg-violet-200 text-violet-500"
                  : "bg-violet-200 text-violet-500"
              }`}
            >
              {quiz.status === "completed" ? "Completed" : "Attempted"}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-2 sm:ml-4">
            {quiz.className} {quiz.section} - {quiz.subject}
          </p>

          <div className="flex items-center mb-2 text-sm text-gray-600">
            <Calendar size={16} className="mr-2 flex-shrink-0" />
            <span className="truncate">Taken on: {new Date(quiz.startDate).toLocaleDateString()}</span>
          </div>

          <div className="mb-4 bg-gray-100 p-3 rounded-lg">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Your Score:</span>
              <span className="text-sm font-medium text-gray-700">
                {quiz.score} / {quiz.totalMarks}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
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
            className="w-full px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 transition-colors"
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
          subjectColors[quiz.subject] || subjectColors.default
        } rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl mx-auto transition-transform duration-300 hover:scale-105`}
      >
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 mb-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{quiz.title}</h2>
            <span className="bg-gray-300 text-violet-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {quiz.subject}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-4">
            {quiz.className} {quiz.section}
          </p>

          <p className="text-gray-700 mb-4 line-clamp-2">{quiz.description}</p>

          <div className="flex items-center mb-2 text-sm text-gray-600">
            <Calendar size={16} className="mr-2 flex-shrink-0" />
            <span className="truncate">Available: {formatDateTimeRange(quiz.startDate, quiz.endDate)}</span>
          </div>

          <div className="flex items-center mb-4 text-sm text-gray-600">
            <Clock size={16} className="mr-2 flex-shrink-0" />
            <span>Duration: {quiz.duration} minutes</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <p className="font-medium text-gray-600">Total Marks:</p>
              <p className="text-gray-800">{quiz.totalMarks} marks</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Passing Score:</p>
              <p className="text-gray-800">{quiz.passingScore} marks</p>
            </div>
          </div>

          <button
            onClick={() => handleSelectQuiz(quiz)}
            disabled={!isQuizAvailable(quiz)}
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
              isQuizAvailable(quiz)
                ? "bg-violet-500 text-white hover:bg-violet-600 focus:ring-violet-600"
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