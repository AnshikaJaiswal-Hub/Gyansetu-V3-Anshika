import React, { useState, useEffect } from 'react';
import { Clock, Calendar, CheckCircle, AlertCircle, FileText, User, ChevronRight, ChevronLeft } from 'lucide-react';

// Mock data - this would come from your backend
const mockAssignments = [
  {
    id: 1,
    title: "Literature Analysis Essay",
    description: "Analyze the themes and literary devices used in the assigned novel. Focus on character development and narrative structure.",
    timeLimit: 120, // minutes
    dueDate: "2025-05-30T23:59:00",
    startTime: "2025-05-26T09:00:00",
    endTime: "2025-06-31T23:59:00",
    hasGrading: true,
    totalPoints: 100,
    status: "active",
    sections: [
      {
        id: 1,
        title: "Character Analysis",
        questionType: "essay",
        pointsPerQuestion: 25,
        instructions: "Analyze the main characters and their development throughout the story.",
        questions: [
          {
            id: 1,
            text: "Describe the protagonist's character arc and how they change throughout the novel.",
            sampleAnswer: "Focus on specific examples from the text, character motivations, and key turning points.",
            hasWordLimit: true,
            wordLimit: 500
          },
          {
            id: 2,
            text: "Compare and contrast two supporting characters and their roles in the story.",
            sampleAnswer: "Discuss their relationships with the protagonist and their impact on the plot.",
            hasWordLimit: true,
            wordLimit: 400
          }
        ]
      },
      {
        id: 2,
        title: "Literary Devices",
        questionType: "short_answer",
        pointsPerQuestion: 15,
        instructions: "Identify and explain the literary devices used by the author.",
        questions: [
          {
            id: 3,
            text: "Identify three metaphors used in the novel and explain their significance.",
            sampleAnswer: "Provide specific quotes and explain how they enhance the themes.",
            hasWordLimit: true,
            wordLimit: 200
          },
          {
            id: 4,
            text: "Analyze the author's use of symbolism in at least two scenes.",
            sampleAnswer: "Connect symbols to broader themes and character development.",
            hasWordLimit: false,
            wordLimit: null
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Mathematics Problem Set",
    description: "Solve various calculus problems focusing on derivatives and integrals.",
    timeLimit: 90,
    dueDate: "2025-05-28T15:00:00",
    startTime: "2025-05-26T08:00:00",
    endTime: "2025-05-28T15:00:00",
    hasGrading: true,
    totalPoints: 50,
    status: "active",
    sections: [
      {
        id: 1,
        title: "Derivatives",
        questionType: "calculation",
        pointsPerQuestion: 10,
        instructions: "Show all work and steps in your calculations.",
        questions: [
          {
            id: 1,
            text: "Find the derivative of f(x) = 3x³ + 2x² - 5x + 1",
            sampleAnswer: "Use power rule: f'(x) = 9x² + 4x - 5",
            hasWordLimit: false,
            wordLimit: null
          }
        ]
      }
    ]
  }
];

const mockSubmittedAssignments = [
  {
    id: 3,
    title: "History Research Paper",
    submittedDate: "2025-05-20T14:30:00",
    grade: 85,
    totalPoints: 100
  },
  {
    id: 4,
    title: "Science Lab Report",
    submittedDate: "2025-05-18T16:45:00",
    grade: 92,
    totalPoints: 100
  }
];

const StudentAssignmentDashboard = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [assignments, setAssignments] = useState(mockAssignments);
  const [submittedAssignments, setSubmittedAssignments] = useState(mockSubmittedAssignments);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);

  // Timer logic for active assignment
  useEffect(() => {
    let interval;
    if (selectedAssignment && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitAssignment();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [selectedAssignment, timeRemaining]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isAssignmentActive = (assignment) => {
    const now = new Date();
    const startTime = new Date(assignment.startTime);
    const endTime = new Date(assignment.endTime);
    return now >= startTime && now <= endTime;
  };

  const isAssignmentOverdue = (assignment) => {
    const now = new Date();
    const dueDate = new Date(assignment.dueDate);
    return now > dueDate;
  };

  const handleStartAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setTimeRemaining(assignment.timeLimit * 60); // Convert minutes to seconds
    setAnswers({});
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmitAssignment = () => {
    if (selectedAssignment) {
      const newSubmission = {
        id: selectedAssignment.id,
        title: selectedAssignment.title,
        submittedDate: new Date().toISOString(),
        grade: null,
        totalPoints: selectedAssignment.totalPoints
      };
      
      setSubmittedAssignments(prev => [newSubmission, ...prev]);
      setAssignments(prev => prev.filter(a => a.id !== selectedAssignment.id));
      setSelectedAssignment(null);
      setTimeRemaining(null);
      setAnswers({});
      alert('Assignment submitted successfully!');
    }
  };

  const getWordCount = (text) => {
    return text ? text.trim().split(/\s+/).filter(word => word.length > 0).length : 0;
  };

  if (selectedAssignment) {
    return (
      <div className="bg-gray-100 pt-10 pr-10 pb-10">
        <div className="min-h-screen bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400 rounded-4xl">
          <div className="max-w-4xl mx-auto p-6">
            {/* Assignment Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {selectedAssignment.title}
                  </h1>
                  <p className="text-gray-600 mb-4">{selectedAssignment.description}</p>
                  {selectedAssignment.hasGrading && (
                    <div className="text-sm text-violet-600 font-medium">
                      Total Points: {selectedAssignment.totalPoints}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col items-start lg:items-end gap-2">
                  {timeRemaining && (
                    <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-mono text-lg">
                      <Clock className="inline w-5 h-5 mr-2" />
                      {formatTime(timeRemaining)}
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedAssignment(null)}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-violet-600 hover:bg-violet-50 hover:text-violet-700 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </div>

            {/* Assignment Sections */}
            <div className="space-y-6">
              {selectedAssignment.sections.map((section) => (
                <div key={section.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-2">{section.instructions}</p>
                    {selectedAssignment.hasGrading && (
                      <div className="text-sm text-violet-600">
                        Points per question: {section.pointsPerQuestion}
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {section.questions.map((question, index) => (
                      <div key={question.id} className="border-l-4 border-violet-500 pl-4">
                        <div className="mb-3">
                          <h3 className="font-medium text-gray-900 mb-2">
                            Question {index + 1}
                          </h3>
                          <p className="text-gray-700 mb-2">{question.text}</p>
                          {question.sampleAnswer && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-3">
                              <p className="text-sm text-yellow-800">
                                <strong>Key Points:</strong> {question.sampleAnswer}
                              </p>
                            </div>
                          )}
                        </div>

                        <textarea
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-vertical min-h-32"
                          placeholder="Enter your answer here..."
                          value={answers[question.id] || ''}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        />

                        {question.hasWordLimit && question.wordLimit && (
                          <div className="mt-2 text-sm text-gray-600">
                            Word count: {getWordCount(answers[question.id] || '')} / {question.wordLimit}
                            {getWordCount(answers[question.id] || '') > question.wordLimit && (
                              <span className="text-red-600 ml-2">
                                (Exceeds limit by {getWordCount(answers[question.id] || '') - question.wordLimit} words)
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button
                onClick={handleSubmitAssignment}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Submit Assignment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 pt-4 sm:pt-6 md:pt-8 px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8">
      <div className="min-h-screen bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400 rounded-[30px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 pt-8">
            <h1 className="text-3xl text-center font-medium text-black">Assignments</h1>
          </div>

          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab('available')}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'available'
                  ? 'border-b-2 border-violet-500 text-violet-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Available Assignments ({assignments.length})
            </button>
            <button
              onClick={() => setActiveTab('submitted')}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'submitted'
                  ? 'border-b-2 border-violet-500 text-violet-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Submitted Assignments ({submittedAssignments.length})
            </button>
          </div>

          {/* Available Assignments */}
          {activeTab === 'available' && (
            <div className="space-y-4">
              {assignments.length === 0 ? (
                <div className="bg-white rounded-4xl shadow-md p-6 sm:p-8 text-center">
                  <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No Available Assignments</h3>
                  <p className="text-gray-600 text-sm sm:text-base">All assignments have been completed or are not yet available.</p>
                </div>
              ) : (
                assignments.map((assignment) => (
                  <div key={assignment.id} className="bg-white rounded-4xl shadow-md p-4 sm:p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                            {assignment.title}
                          </h3>
                          {isAssignmentOverdue(assignment) && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full self-start sm:self-auto">
                              Overdue
                            </span>
                          )}
                          {!isAssignmentActive(assignment) && !isAssignmentOverdue(assignment) && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full self-start sm:self-auto">
                              Not Started
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm sm:text-base">
                          {assignment.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-2" />
                            {assignment.timeLimit} minutes
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </div>
                          {assignment.hasGrading && (
                            <div className="flex items-center text-violet-600">
                              <User className="w-4 h-4 mr-2" />
                              {assignment.totalPoints} points
                            </div>
                          )}
                          <div className="flex items-center text-gray-600">
                            <FileText className="w-4 h-4 mr-2" />
                            {assignment.sections.reduce((total, section) => total + section.questions.length, 0)} questions
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleStartAssignment(assignment)}
                          disabled={!isAssignmentActive(assignment)}
                          className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${
                            isAssignmentActive(assignment)
                              ? 'bg-violet-600 hover:bg-violet-700 text-white'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          Start Assignment
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Submitted Assignments */}
          {activeTab === 'submitted' && (
            <div className="space-y-4">
              {submittedAssignments.length === 0 ? (
                <div className="bg-white rounded-4xl shadow-md p-6 sm:p-8 text-center">
                  <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No Submitted Assignments</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Completed assignments will appear here.</p>
                </div>
              ) : (
                submittedAssignments.map((assignment) => (
                  <div key={assignment.id} className="bg-white rounded-4xl shadow-md p-4 sm:p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                            {assignment.title}
                          </h3>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Submitted: {new Date(assignment.submittedDate).toLocaleDateString()} at {new Date(assignment.submittedDate).toLocaleTimeString()}
                          </div>
                          {assignment.grade !== null && (
                            <div className="flex items-center">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                assignment.grade >= 90 ? 'bg-green-100 text-green-800' :
                                assignment.grade >= 80 ? 'bg-blue-100 text-blue-800' :
                                assignment.grade >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                Grade: {assignment.grade}/{assignment.totalPoints}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAssignmentDashboard;