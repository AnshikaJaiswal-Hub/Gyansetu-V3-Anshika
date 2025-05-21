import React, { useState } from "react";
import { Info } from "lucide-react";

export default function SettingsConfiguration({
  onNext,
  onPrevious,
  assignmentData,
}) {
  const [settings, setSettings] = useState({
    subject: "",
    gradeLevel: "",
    difficulty: "medium",
    standards: "",
    questionOrder: "fixed",
    displayMode: "all",
    showPoints: true,
    showTimer: true,
    showProgress: true,
    passingScore: 70,
    gradingType: "automatic",
    feedbackType: "immediate",
    latePolicy: "accept",
  });

  // Grade levels
  const gradeLevels = [
    "Elementary School",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Middle School",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "High School",
    "Grade 9",
    "Grade 10",
    "Grade 11",
    "Grade 12",
    "College",
    "Graduate",
  ];

  // Subjects
  const subjects = [
    "Mathematics",
    "Science",
    "Language Arts",
    "Social Studies",
    "Foreign Language",
    "Art",
    "Music",
    "Physical Education",
    "Computer Science",
    "History",
    "Geography",
    "Economics",
    "Biology",
    "Chemistry",
    "Physics",
    "Other",
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle direct settings changes
  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value,
    });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-purple-500">
      <h2 className="text-2xl font-bold mb-1 text-purple-800">
        Configure Settings
      </h2>
      <p className="text-gray-500 mb-8">
        Customize how your assignment functions and appears
      </p>

      {/* Academic Settings */}
      <div className="mb-10 bg-purple-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-6 text-purple-700 flex items-center">
          <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full mr-2 flex items-center justify-center text-sm font-bold">
            1
          </span>
          Academic Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <select
              name="subject"
              value={settings.subject}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grade Level
            </label>
            <select
              name="gradeLevel"
              value={settings.gradeLevel}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select a grade level</option>
              {gradeLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Standards Alignment (Optional)
          </label>
          <input
            type="text"
            name="standards"
            value={settings.standards}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            placeholder="e.g., CCSS.MATH.CONTENT.3.OA.A.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Difficulty Level
          </label>
          <div className="flex space-x-4">
            {["easy", "medium", "hard"].map((level) => {
              const capitalizedLevel =
                level.charAt(0).toUpperCase() + level.slice(1);
              const bgColor =
                settings.difficulty === level
                  ? "bg-purple-600 text-white border-purple-700"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-purple-50";

              return (
                <button
                  key={level}
                  className={`px-5 py-2 rounded-md border ${bgColor} transition-colors duration-200 w-32`}
                  onClick={() => handleSettingChange("difficulty", level)}
                >
                  {capitalizedLevel}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Display Settings */}
      <div className="mb-10 bg-purple-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-6 text-purple-700 flex items-center">
          <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full mr-2 flex items-center justify-center text-sm font-bold">
            2
          </span>
          Display Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Order
            </label>
            <select
              name="questionOrder"
              value={settings.questionOrder}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="fixed">Fixed order</option>
              <option value="random">Randomized</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Display
            </label>
            <select
              name="displayMode"
              value={settings.displayMode}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All questions at once</option>
              <option value="one">One question at a time</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="showPoints"
                checked={settings.showPoints}
                onChange={handleInputChange}
                className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
              />
              <span className="text-sm text-gray-700">Show point values</span>
            </label>
          </div>

          <div className="bg-white p-3 rounded-md border border-gray-200">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="showTimer"
                checked={settings.showTimer}
                onChange={handleInputChange}
                className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
              />
              <span className="text-sm text-gray-700">Show timer</span>
            </label>
          </div>

          <div className="bg-white p-3 rounded-md border border-gray-200">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="showProgress"
                checked={settings.showProgress}
                onChange={handleInputChange}
                className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
              />
              <span className="text-sm text-gray-700">
                Show progress indicator
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Grading Settings */}
      <div className="mb-6 bg-purple-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-6 text-purple-700 flex items-center">
          <span className="bg-purple-200 text-purple-800 w-6 h-6 rounded-full mr-2 flex items-center justify-center text-sm font-bold">
            3
          </span>
          Grading Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Passing Score (%)
            </label>
            <div className="flex items-center">
              <input
                type="number"
                name="passingScore"
                value={settings.passingScore}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                min="0"
                max="100"
              />
              <div className="ml-2 text-lg text-purple-700 font-medium">%</div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grading Type
            </label>
            <select
              name="gradingType"
              value={settings.gradingType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feedback Options
            </label>
            <select
              name="feedbackType"
              value={settings.feedbackType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="immediate">Immediate feedback</option>
              <option value="after-submit">After submission</option>
              <option value="after-due">After due date</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Late Submission Policy
            </label>
            <select
              name="latePolicy"
              value={settings.latePolicy}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="accept">Accept late submissions</option>
              <option value="penalty">Accept with penalty</option>
              <option value="reject">Do not accept late submissions</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-purple-100 p-4 rounded-lg flex items-start mb-8">
        <Info className="w-5 h-5 text-purple-700 mr-2 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-purple-800">
          These settings determine how your assignment will function for
          students. You can adjust them later if needed.
        </p>
      </div>

      <div className="mt-10 flex justify-between">
        <button
          onClick={onPrevious}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
        >
          Back to Content
        </button>
        <button
          onClick={() => onNext({ ...assignmentData, settings })}
          className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 font-medium shadow-sm"
        >
          Continue to Review
        </button>
      </div>
    </div>
  );
}
