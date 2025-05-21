import React, { useState } from "react";
import {
  CheckCircle,
  Edit,
  Download,
  Copy,
  Share2,
  Calendar,
  Clock,
  Award,
} from "lucide-react";
// Note: In a real application, you would import jsPDF
// import { jsPDF } from "jspdf";

export default function Review({ onPrevious, finalAssignment }) {
  const [publishStatus, setPublishStatus] = useState(null);
  const [downloadStatus, setDownloadStatus] = useState(null);

  // Mock data for complete assignment review
  const assignment = finalAssignment || {
    title: "Algebra Quiz: Quadratic Equations",
    description:
      "This quiz will test your understanding of quadratic equations, including factoring, the quadratic formula, and graphing parabolas.",
    timeLimit: "45 minutes",
    dueDate: "2025-05-15",
    subject: "Mathematics",
    gradeLevel: "Grade 10",
    difficulty: "medium",
    sections: [
      {
        id: 1,
        title: "Multiple Choice",
        questionType: "multiple-choice",
        pointsPerQuestion: 5,
        instructions: "Select the best answer for each question.",
        questions: [
          {
            id: 1,
            text: "What is the value of x in the equation x² + 5x + 6 = 0?",
            type: "multiple-choice",
            options: [
              { id: 1, text: "x = -2 and x = -3" },
              { id: 2, text: "x = 2 and x = 3" },
              { id: 3, text: "x = -2 and x = 3" },
              { id: 4, text: "x = 2 and x = -3" },
            ],
            correctAnswers: [1],
            explanation:
              "By factoring, x² + 5x + 6 = (x + 2)(x + 3) = 0, so x = -2 and x = -3.",
          },
          {
            id: 2,
            text: "Which of the following is the vertex form of a quadratic equation?",
            type: "multiple-choice",
            options: [
              { id: 1, text: "y = ax² + bx + c" },
              { id: 2, text: "y = a(x - h)² + k" },
              { id: 3, text: "y = a(x + h)² + k" },
              { id: 4, text: "y = ax(x - h) + k" },
            ],
            correctAnswers: [2],
            explanation:
              "The vertex form is y = a(x - h)² + k, where (h, k) is the vertex.",
          },
        ],
      },
    ],
    settings: {
      subject: "Mathematics",
      gradeLevel: "Grade 10",
      difficulty: "medium",
      standards: "CCSS.Math.Content.HSA.REI.B.4",
      questionOrder: "fixed",
      displayMode: "all",
      showPoints: true,
      showTimer: true,
      showProgress: true,
      passingScore: 70,
      gradingType: "automatic",
      feedbackType: "immediate",
      latePolicy: "accept",
    },
  };

  // Function to handle publishing the assignment
  const handlePublish = () => {
    setPublishStatus("success");
    // In a real application, this would send the assignment data to the server
  };

  // Function to generate and download PDF
  const handleSaveDraft = () => {
    setDownloadStatus("downloading");

    // Simulate PDF generation and download
    setTimeout(() => {
      // In a real application, we would use jsPDF or a similar library to generate a PDF
      // For this demo, we'll create a simulated download

      // Create a hidden anchor element
      const element = document.createElement("a");

      // Create a Blob that represents a PDF file (this is just a simulation)
      const file = new Blob(
        ["Assignment data would be formatted as PDF here"],
        { type: "application/pdf" }
      );

      // Create a URL for the Blob
      element.href = URL.createObjectURL(file);

      // Set the download attribute with the assignment title
      element.download = `${assignment.title || "Assignment"}.pdf`;

      // Append the anchor to the body
      document.body.appendChild(element);

      // Trigger the download
      element.click();

      // Clean up
      document.body.removeChild(element);

      setDownloadStatus("success");

      // Reset status after 3 seconds
      setTimeout(() => {
        setDownloadStatus(null);
      }, 3000);
    }, 1000); // Simulate processing time
  };

  // Format the date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get question type label
  const getQuestionTypeLabel = (type) => {
    const types = {
      "multiple-choice": "Multiple Choice",
      "short-answer": "Short Answer",
      "long-answer": "Long Answer",
      "true-false": "True/False",
      matching: "Matching",
      "fill-blank": "Fill-in-the-blank",
    };
    return types[type] || type;
  };

  // Get difficulty label with badge
  const getDifficultyBadge = (difficulty) => {
    const styles = {
      easy: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      hard: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          styles[difficulty] || "bg-gray-100 text-gray-800"
        }`}
      >
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-purple-500">
      <h2 className="text-2xl font-bold mb-1 text-purple-800">
        Review Assignment
      </h2>
      <p className="text-gray-500 mb-8">
        Review your assignment before publishing
      </p>

      {publishStatus === "success" && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
          <p>Your assignment has been published successfully!</p>
        </div>
      )}

      {downloadStatus === "success" && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
          <p>Assignment PDF has been downloaded successfully!</p>
        </div>
      )}

      {downloadStatus === "downloading" && (
        <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700 mr-2"></div>
          <p>Generating PDF and preparing download...</p>
        </div>
      )}

      {/* Assignment Overview */}
      <div className="mb-8 p-6 bg-purple-50 rounded-lg border border-purple-100">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-purple-800">
            {assignment.title || "Untitled Assignment"}
          </h3>
          <button className="text-purple-600 hover:text-purple-800">
            <Edit className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Description/Instructions
          </h4>
          <p className="text-gray-700 bg-white p-3 rounded-md border border-gray-200">
            {assignment.description || "No description provided."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-3 rounded-md border border-gray-200 flex items-center">
            <Award className="w-5 h-5 text-purple-500 mr-2" />
            <div>
              <h5 className="text-xs font-medium text-gray-500">Subject</h5>
              <p className="text-sm font-medium">
                {assignment.settings.subject || "Not specified"}
              </p>
            </div>
          </div>

          <div className="bg-white p-3 rounded-md border border-gray-200 flex items-center">
            <Calendar className="w-5 h-5 text-purple-500 mr-2" />
            <div>
              <h5 className="text-xs font-medium text-gray-500">Due Date</h5>
              <p className="text-sm font-medium">
                {formatDate(assignment.dueDate)}
              </p>
            </div>
          </div>

          <div className="bg-white p-3 rounded-md border border-gray-200 flex items-center">
            <Clock className="w-5 h-5 text-purple-500 mr-2" />
            <div>
              <h5 className="text-xs font-medium text-gray-500">Time Limit</h5>
              <p className="text-sm font-medium">
                {assignment.timeLimit || "No time limit"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Academic Details
            </h4>
            <div className="bg-white p-3 rounded-md border border-gray-200">
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Grade Level:</span>
                  <span className="text-sm font-medium">
                    {assignment.settings.gradeLevel || "Not specified"}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Difficulty:</span>
                  {getDifficultyBadge(assignment.settings.difficulty)}
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Standards:</span>
                  <span className="text-sm font-medium">
                    {assignment.settings.standards || "Not specified"}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Passing Score:</span>
                  <span className="text-sm font-medium">
                    {assignment.settings.passingScore}%
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Display & Grading
            </h4>
            <div className="bg-white p-3 rounded-md border border-gray-200">
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Question Order:</span>
                  <span className="text-sm font-medium">
                    {assignment.settings.questionOrder === "fixed"
                      ? "Fixed order"
                      : "Randomized"}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Display Mode:</span>
                  <span className="text-sm font-medium">
                    {assignment.settings.displayMode === "all"
                      ? "All at once"
                      : "One at a time"}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Grading:</span>
                  <span className="text-sm font-medium capitalize">
                    {assignment.settings.gradingType || "Automatic"}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Feedback:</span>
                  <span className="text-sm font-medium">
                    {assignment.settings.feedbackType === "immediate"
                      ? "Immediate"
                      : assignment.settings.feedbackType === "after-submit"
                      ? "After submission"
                      : "After due date"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-purple-700">
          Sections ({assignment.sections.length})
        </h3>

        {assignment.sections.map((section, index) => (
          <div
            key={section.id}
            className="mb-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-purple-800">
                  {section.title || `Section ${index + 1}`}
                </h4>
                <p className="text-sm text-gray-500">
                  {getQuestionTypeLabel(section.questionType)} •{" "}
                  {section.questions.length} questions •{" "}
                  {section.pointsPerQuestion} points each
                </p>
              </div>
              <button className="text-purple-600 hover:text-purple-800">
                <Edit className="w-4 h-4" />
              </button>
            </div>

            {section.instructions && (
              <div className="mb-2">
                <p className="text-sm text-gray-600 italic">
                  {section.instructions}
                </p>
              </div>
            )}

            <div className="mt-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Sample Questions:
              </p>
              <ul className="pl-4 space-y-1">
                {section.questions.slice(0, 2).map((question, qIndex) => (
                  <li key={question.id} className="text-sm text-gray-700">
                    {question.text.length > 60
                      ? question.text.substring(0, 60) + "..."
                      : question.text || `Question ${qIndex + 1}`}
                  </li>
                ))}
                {section.questions.length > 2 && (
                  <li className="text-xs text-purple-600 italic">
                    + {section.questions.length - 2} more questions
                  </li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-10">
        <div className="flex justify-between items-center">
          <button
            onClick={onPrevious}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
          >
            Back to Settings
          </button>

          <div className="flex space-x-3">
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-50 transition-colors duration-200 flex items-center"
              disabled={downloadStatus === "downloading"}
            >
              {downloadStatus === "downloading" ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500 mr-1"></div>
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-1" /> Save as PDF
                </>
              )}
            </button>
            <button className="px-4 py-2 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-50 transition-colors duration-200 flex items-center">
              <Copy className="w-4 h-4 mr-1" /> Duplicate
            </button>
            <button className="px-4 py-2 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-50 transition-colors duration-200 flex items-center">
              <Share2 className="w-4 h-4 mr-1" /> Share
            </button>
            <button
              onClick={handlePublish}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 font-medium shadow-sm flex items-center"
            >
              <CheckCircle className="w-4 h-4 mr-1" /> Publish Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
