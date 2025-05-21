import React from "react";
import { BookmarkIcon, Flag } from "lucide-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const QuestionItem = ({
  question,
  index,
  answers,
  handleAnswerChange,
  handleSaveAnswer,
  handleMarkForReview,
  getQuestionStatus,
  goToPrevQuestion,
  goToNextQuestion,
  activeQuiz,
  totalQuestions,
}) => {
  const { isAnswered, isSaved, isMarkedForReview } = getQuestionStatus(question.id);

  return (
    <div className="bg-violet-300 rounded-lg shadow-md p-6 mb-6" key={question.id}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900">Question {index + 1}</h3>
        {activeQuiz.showMarks && (
          <span className="bg-white text-violet-500 text-sm font-medium px-2.5 py-0.5 rounded-4xl">
            {question.marks} marks
          </span>
        )}
      </div>

      <p className="text-gray-700 mb-4">{question.text}</p>

      {question.type === "mcq" && (
        <div className="space-y-3 mb-4">
          {question.options.map((option) => (
            <label
              key={option.id}
              className={`flex items-center p-3 border rounded-2xl transition-colors ${
                answers[question.id] === option.id
                  ? "bg-violet-200 border-violet-300"
                  : "border-violet-400 hover:bg-violet-200"
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={answers[question.id] === option.id}
                onChange={() => handleAnswerChange(question.id, null, option.id)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-3">{option.text}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === "short" && (
        <textarea
          value={answers[question.id] || ""}
          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4"
          rows="3"
          placeholder="Enter your answer here..."
        ></textarea>
      )}

      {question.type === "long" && (
        <textarea
          value={answers[question.id] || ""}
          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4"
          rows="6"
          placeholder="Enter your answer here..."
        ></textarea>
      )}

      {/* Save and Mark for Review buttons */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => handleSaveAnswer(question.id)}
          disabled={!isAnswered}
          className={`px-3 py-1.5 flex items-center text-sm font-medium rounded-lg ${
            !isAnswered
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : isSaved
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <BookmarkIcon size={16} className="mr-1" />
          {isSaved ? "Saved" : "Save Answer"}
        </button>

        <button
          onClick={() => handleMarkForReview(question.id)}
          className={`px-3 py-1.5 flex items-center text-sm font-medium rounded-lg ${
            isMarkedForReview
              ? "bg-purple-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Flag size={16} className="mr-1" />
          {isMarkedForReview ? "Marked for Review" : "Mark for Review"}
        </button>
      </div>

      {activeQuiz.oneQuestionAtATime && (
        <div className="flex justify-between mt-2">
          <button
            onClick={goToPrevQuestion}
            disabled={index === 0}
            className={`px-4 py-2 flex items-center text-sm font-medium rounded-lg ${
              index === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <ArrowLeft size={16} className="mr-1" />
            Previous
          </button>

          <button
            onClick={goToNextQuestion}
            disabled={index === totalQuestions - 1}
            className={`px-4 py-2 flex items-center text-sm font-medium rounded-lg ${
              index === totalQuestions - 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-violet-600 text-white hover:bg-violet-500"
            }`}
          >
            Next
            <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionItem;