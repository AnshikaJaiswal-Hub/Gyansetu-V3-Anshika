import React, { useState } from "react";
import { X, Plus, Clock, Calendar, HelpCircle } from "lucide-react";

export default function ContentCreation({
  onNext,
  onPrevious,
  selectedTemplate,
}) {
  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    timeLimit: "",
    dueDate: "",
    sections: [
      {
        id: 1,
        title: "Section 1",
        questionType: "multiple-choice",
        pointsPerQuestion: 5,
        instructions: "",
        questions: [
          {
            id: 1,
            text: "",
            type: "multiple-choice",
            options: [
              { id: 1, text: "" },
              { id: 2, text: "" },
              { id: 3, text: "" },
              { id: 4, text: "" },
            ],
            correctAnswers: [],
            explanation: "",
          },
        ],
      },
    ],
  });

  // Question types
  const questionTypes = [
    { value: "multiple-choice", label: "Multiple Choice" },
    { value: "short-answer", label: "Short Answer" },
    { value: "long-answer", label: "Long Answer" },
    { value: "true-false", label: "True/False" },
    { value: "matching", label: "Matching" },
    { value: "fill-blank", label: "Fill-in-the-blank" },
  ];

  // Handle input changes for basic assignment info
  const handleAssignmentChange = (e) => {
    const { name, value } = e.target;
    setAssignment({
      ...assignment,
      [name]: value,
    });
  };

  // Handle adding a new section
  const handleAddSection = () => {
    const newSectionId = assignment.sections.length + 1;
    const newSection = {
      id: newSectionId,
      title: `Section ${newSectionId}`,
      questionType: "multiple-choice",
      pointsPerQuestion: 5,
      instructions: "",
      questions: [
        {
          id: 1,
          text: "",
          type: "multiple-choice",
          options: [
            { id: 1, text: "" },
            { id: 2, text: "" },
            { id: 3, text: "" },
            { id: 4, text: "" },
          ],
          correctAnswers: [],
          explanation: "",
        },
      ],
    };

    setAssignment({
      ...assignment,
      sections: [...assignment.sections, newSection],
    });
  };

  // Handle section changes
  const handleSectionChange = (sectionId, field, value) => {
    const updatedSections = assignment.sections.map((section) => {
      if (section.id === sectionId) {
        return { ...section, [field]: value };
      }
      return section;
    });

    setAssignment({
      ...assignment,
      sections: updatedSections,
    });
  };

  // Handle removing a section
  const handleRemoveSection = (sectionId) => {
    if (assignment.sections.length <= 1) return;

    const updatedSections = assignment.sections.filter(
      (section) => section.id !== sectionId
    );
    setAssignment({
      ...assignment,
      sections: updatedSections,
    });
  };

  // Handle question changes
  const handleQuestionChange = (sectionId, questionId, field, value) => {
    const updatedSections = assignment.sections.map((section) => {
      if (section.id === sectionId) {
        const updatedQuestions = section.questions.map((question) => {
          if (question.id === questionId) {
            return { ...question, [field]: value };
          }
          return question;
        });

        return { ...section, questions: updatedQuestions };
      }
      return section;
    });

    setAssignment({
      ...assignment,
      sections: updatedSections,
    });
  };

  // Handle adding a new question to a section
  const handleAddQuestion = (sectionId) => {
    const section = assignment.sections.find((s) => s.id === sectionId);
    const newQuestionId = section.questions.length + 1;

    let newQuestion = {
      id: newQuestionId,
      text: "",
      type: section.questionType,
    };

    // Add type-specific properties
    if (section.questionType === "multiple-choice") {
      newQuestion.options = [
        { id: 1, text: "" },
        { id: 2, text: "" },
        { id: 3, text: "" },
        { id: 4, text: "" },
      ];
      newQuestion.correctAnswers = [];
      newQuestion.explanation = "";
    } else if (section.questionType === "true-false") {
      newQuestion.correctAnswer = null;
      newQuestion.explanation = "";
    } else if (
      section.questionType === "short-answer" ||
      section.questionType === "long-answer"
    ) {
      newQuestion.sampleAnswer = "";
      newQuestion.wordLimit = "";
    } else if (section.questionType === "matching") {
      newQuestion.pairs = [
        { id: 1, left: "", right: "" },
        { id: 2, left: "", right: "" },
      ];
    } else if (section.questionType === "fill-blank") {
      newQuestion.text = "";
      newQuestion.blanks = [{ id: 1, answer: "" }];
      newQuestion.caseSensitive = false;
    }

    const updatedSections = assignment.sections.map((s) => {
      if (s.id === sectionId) {
        return {
          ...s,
          questions: [...s.questions, newQuestion],
        };
      }
      return s;
    });

    setAssignment({
      ...assignment,
      sections: updatedSections,
    });
  };

  // Handle removing a question
  const handleRemoveQuestion = (sectionId, questionId) => {
    const section = assignment.sections.find((s) => s.id === sectionId);
    if (section.questions.length <= 1) return;

    const updatedSections = assignment.sections.map((section) => {
      if (section.id === sectionId) {
        const updatedQuestions = section.questions.filter(
          (question) => question.id !== questionId
        );
        return { ...section, questions: updatedQuestions };
      }
      return section;
    });

    setAssignment({
      ...assignment,
      sections: updatedSections,
    });
  };

  // Get template name
  const getTemplateName = () => {
    switch (selectedTemplate) {
      case "quiz":
        return "Quiz";
      case "written":
        return "Written Assignment";
      case "interactive":
        return "Interactive Game";
      case "project":
        return "Project Based";
      default:
        return "Assignment";
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-purple-500">
      <h2 className="text-2xl font-bold mb-1 text-purple-800">
        Create Content
      </h2>
      <p className="text-gray-500 mb-8">Template: {getTemplateName()}</p>

      {/* Basic Assignment Info */}
      <div className="mb-10 bg-purple-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-purple-700 flex items-center">
          <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full mr-2 flex items-center justify-center text-sm font-bold">
            1
          </span>
          Basic Information
        </h3>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assignment Title
            </label>
            <input
              type="text"
              name="title"
              value={assignment.title}
              onChange={handleAssignmentChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter assignment title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description/Instructions
            </label>
            <textarea
              name="description"
              value={assignment.description}
              onChange={handleAssignmentChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              rows="4"
              placeholder="Enter assignment description and instructions"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Limit (optional)
              </label>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-purple-400 mr-2" />
                <input
                  type="text"
                  name="timeLimit"
                  value={assignment.timeLimit}
                  onChange={handleAssignmentChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g., 60 minutes"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date (optional)
              </label>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-purple-400 mr-2" />
                <input
                  type="date"
                  name="dueDate"
                  value={assignment.dueDate}
                  onChange={handleAssignmentChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-purple-700 flex items-center">
            <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full mr-2 flex items-center justify-center text-sm font-bold">
              2
            </span>
            Sections
          </h3>
          <button
            onClick={handleAddSection}
            className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors duration-200"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Section
          </button>
        </div>

        {assignment.sections.map((section, index) => (
          <div
            key={section.id}
            className="mb-6 p-6 border border-gray-200 rounded-lg bg-white shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-purple-800">
                Section {index + 1}
              </h4>
              {assignment.sections.length > 1 && (
                <button
                  onClick={() => handleRemoveSection(section.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    handleSectionChange(section.id, "title", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter section title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Type
                </label>
                <select
                  value={section.questionType}
                  onChange={(e) =>
                    handleSectionChange(
                      section.id,
                      "questionType",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                >
                  {questionTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Points per Question
                </label>
                <input
                  type="number"
                  value={section.pointsPerQuestion}
                  onChange={(e) =>
                    handleSectionChange(
                      section.id,
                      "pointsPerQuestion",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Instructions (optional)
                </label>
                <input
                  type="text"
                  value={section.instructions}
                  onChange={(e) =>
                    handleSectionChange(
                      section.id,
                      "instructions",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter instructions for this section"
                />
              </div>
            </div>

            {/* Questions */}
            <div className="mt-6 bg-purple-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h5 className="font-medium text-purple-700">Questions</h5>
                <button
                  onClick={() => handleAddQuestion(section.id)}
                  className="flex items-center px-3 py-1 bg-purple-200 text-purple-700 rounded hover:bg-purple-300 transition-colors duration-200 text-sm"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Question
                </button>
              </div>

              {section.questions.map((question, qIndex) => (
                <div
                  key={question.id}
                  className="mb-4 p-4 bg-white rounded-lg border border-purple-100 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-purple-700">
                      Question {qIndex + 1}
                    </span>
                    {section.questions.length > 1 && (
                      <button
                        onClick={() =>
                          handleRemoveQuestion(section.id, question.id)
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question Text
                    </label>
                    <textarea
                      value={question.text}
                      onChange={(e) =>
                        handleQuestionChange(
                          section.id,
                          question.id,
                          "text",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      rows="2"
                      placeholder="Enter question text"
                    ></textarea>
                  </div>

                  {/* Question-type specific fields */}
                  {section.questionType === "multiple-choice" && (
                    <div className="pl-4 border-l-2 border-purple-200">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Answer Options
                      </p>
                      {question.options.map((option, optIndex) => (
                        <div key={option.id} className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            checked={question.correctAnswers.includes(
                              option.id
                            )}
                            onChange={(e) => {
                              let newCorrectAnswers = [
                                ...question.correctAnswers,
                              ];
                              if (e.target.checked) {
                                newCorrectAnswers.push(option.id);
                              } else {
                                newCorrectAnswers = newCorrectAnswers.filter(
                                  (id) => id !== option.id
                                );
                              }
                              handleQuestionChange(
                                section.id,
                                question.id,
                                "correctAnswers",
                                newCorrectAnswers
                              );
                            }}
                            className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
                          />
                          <input
                            type="text"
                            value={option.text}
                            onChange={(e) => {
                              const updatedOptions = [...question.options];
                              updatedOptions[optIndex].text = e.target.value;
                              handleQuestionChange(
                                section.id,
                                question.id,
                                "options",
                                updatedOptions
                              );
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-sm"
                            placeholder={`Option ${optIndex + 1}`}
                          />
                        </div>
                      ))}
                      <div className="flex items-center text-xs text-gray-500">
                        <HelpCircle className="w-3 h-3 mr-1" /> Check the
                        correct answer option(s)
                      </div>
                    </div>
                  )}

                  {section.questionType === "true-false" && (
                    <div className="pl-4 border-l-2 border-purple-200">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Correct Answer
                      </p>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`true-false-${section.id}-${question.id}`}
                            value="true"
                            checked={question.correctAnswer === true}
                            onChange={() =>
                              handleQuestionChange(
                                section.id,
                                question.id,
                                "correctAnswer",
                                true
                              )
                            }
                            className="mr-1 h-4 w-4 text-purple-600 focus:ring-purple-500"
                          />
                          <span>True</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`true-false-${section.id}-${question.id}`}
                            value="false"
                            checked={question.correctAnswer === false}
                            onChange={() =>
                              handleQuestionChange(
                                section.id,
                                question.id,
                                "correctAnswer",
                                false
                              )
                            }
                            className="mr-1 h-4 w-4 text-purple-600 focus:ring-purple-500"
                          />
                          <span>False</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {(section.questionType === "short-answer" ||
                    section.questionType === "long-answer") && (
                    <div className="pl-4 border-l-2 border-purple-200">
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sample Answer/Key Points
                        </label>
                        <textarea
                          value={question.sampleAnswer || ""}
                          onChange={(e) =>
                            handleQuestionChange(
                              section.id,
                              question.id,
                              "sampleAnswer",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                          rows="2"
                          placeholder="Enter sample answer for grading reference"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Word/Character Limit (optional)
                        </label>
                        <input
                          type="text"
                          value={question.wordLimit || ""}
                          onChange={(e) =>
                            handleQuestionChange(
                              section.id,
                              question.id,
                              "wordLimit",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                          placeholder="e.g., 200 words"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-between">
        <button
          onClick={onPrevious}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
        >
          Back to Template
        </button>
        <button
          onClick={() => onNext(assignment)}
          className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 font-medium shadow-sm"
        >
          Continue to Settings
        </button>
      </div>
    </div>
  );
}
