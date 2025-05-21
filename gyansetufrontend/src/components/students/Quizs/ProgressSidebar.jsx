import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProgressSidebar = ({
  activeQuiz,
  savedAnswers,
  getQuestionStatus,
  currentQuestion,
  goToQuestion,
  goToPrevQuestion,
  goToNextQuestion,
  handleSubmit,
}) => {
  return (
    <div className="lg:w-72 shrink-0">
      <div className="bg-white rounded-lg shadow-md p-4 sticky top-4 mt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Progress</h3>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Questions Saved</span>
            <span>
              {Object.keys(savedAnswers).length} / {activeQuiz.questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{
                width: `${
                  (Object.keys(savedAnswers).length / activeQuiz.questions.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {activeQuiz.questions.map((question, index) => {
            const { isAnswered, isSaved, isMarkedForReview } = getQuestionStatus(question.id);

            let buttonClass = "bg-gray-300 text-gray-800 hover:bg-gray-200";
            if (currentQuestion === index) {
              buttonClass = "bg-blue-500 text-white";
            } else if (isMarkedForReview) {
              buttonClass = "bg-purple-500 text-white";
            } else if (isSaved) {
              buttonClass = "bg-green-500 text-white";
            } 

            return (
              <button
                key={question.id}
                onClick={() => goToQuestion(index)}
                className={`w-full aspect-square flex items-center justify-center text-sm rounded-md ${buttonClass}`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        <div className="mt-4">
  <div className="flex flex-wrap gap-2 text-xs">
    <div className="flex items-center space-x-1">
      <div className="w-3 h-3 bg-green-500 rounded"></div>
      <span>Saved</span>
    </div>
    <div className="flex items-center space-x-1">
      <div className="w-3 h-3 bg-purple-500 rounded"></div>
      <span>Marked for Review</span>
    </div>
    <div className="flex items-center space-x-1">
      <div className="w-3 h-3 bg-blue-500 rounded"></div>
      <span>Current Question</span>
    </div>
  </div>
</div>

        {activeQuiz.oneQuestionAtATime && (
          <div className="flex justify-between mt-6">
            <button
              onClick={goToPrevQuestion}
              disabled={currentQuestion === 0}
              className={`w-12 h-12 flex items-center justify-center rounded-full ${
                currentQuestion === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Submit
            </button>

            <button
              onClick={goToNextQuestion}
              disabled={currentQuestion === activeQuiz.questions.length - 1}
              className={`w-12 h-12 flex items-center justify-center rounded-full ${
                currentQuestion === activeQuiz.questions.length - 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressSidebar;