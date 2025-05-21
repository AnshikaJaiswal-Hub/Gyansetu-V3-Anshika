import React from "react";
import QuestionItem from "./QuestionItem";
import ProgressSidebar from "./ProgressSidebar";
import { Clock } from "lucide-react";
import { formatTime } from "./utils";

const QuestionsScreen = ({
  activeQuiz,
  currentQuestion,
  answers,
  savedAnswers,
  markedForReview,
  timeRemaining,
  handleAnswerChange,
  handleSaveAnswer,
  handleMarkForReview,
  goToPrevQuestion,
  goToNextQuestion,
  goToQuestion,
  getQuestionStatus,
  handleSubmit,
}) => {
  return (
      <div className="w-[1200px] mx-auto my-8 px-4 mt-8">
      {/* Header with timer and progress */}
      <div className="bg-violet-300 rounded-lg shadow-md p-4 mb-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800 shadow-2xl">{activeQuiz.title}</h1>

        <div className="flex items-center space-x-4">
          {activeQuiz.showTimer && (
            <div className="flex items-center text-gray-700">
              <Clock size={18} className="mr-2" />
              <span className={`font-medium ${timeRemaining < 300 ? "text-red-600" : ""}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-[#c1d956] focus:ring-offset-2"
          >
            End the test
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="lg:flex-1">
          {activeQuiz.oneQuestionAtATime ? (
            <QuestionItem
              question={activeQuiz.questions[currentQuestion]}
              index={currentQuestion}
              answers={answers}
              handleAnswerChange={handleAnswerChange}
              handleSaveAnswer={handleSaveAnswer}
              handleMarkForReview={handleMarkForReview}
              getQuestionStatus={getQuestionStatus}
              goToPrevQuestion={goToPrevQuestion}
              goToNextQuestion={goToNextQuestion}
              activeQuiz={activeQuiz}
              totalQuestions={activeQuiz.questions.length}
            />
          ) : (
            activeQuiz.questions.map((question, index) => (
              <QuestionItem
                key={question.id}
                question={question}
                index={index}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                handleSaveAnswer={handleSaveAnswer}
                handleMarkForReview={handleMarkForReview}
                getQuestionStatus={getQuestionStatus}
                goToPrevQuestion={goToPrevQuestion}
                goToNextQuestion={goToNextQuestion}
                activeQuiz={activeQuiz}
                totalQuestions={activeQuiz.questions.length}
              />
            ))
          )}

          {/* Bottom navigation for one question at a time mode */}
          {!activeQuiz.oneQuestionAtATime && (
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-[#c1d956] focus:ring-offset-2"
              >
                Submit Quiz
              </button>
            </div>
          )}
        </div>

        {/* Progress sidebar */}
        {activeQuiz.showProgressIndicator && (
          <ProgressSidebar
            activeQuiz={activeQuiz}
            savedAnswers={savedAnswers}
            getQuestionStatus={getQuestionStatus}
            currentQuestion={currentQuestion}
            goToQuestion={goToQuestion}
            goToPrevQuestion={goToPrevQuestion}
            goToNextQuestion={goToNextQuestion}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionsScreen;