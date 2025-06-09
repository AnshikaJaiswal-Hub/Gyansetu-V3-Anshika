import React, { useState } from "react";
import { Info } from "lucide-react";
import { useTheme } from "../../../../context/ThemeContext"; // Import the theme hook

export default function SettingsConfiguration({
  onNext,
  onPrevious,
  assignmentData,
}) {
  // Use the theme context
  const { darkMode } = useTheme();

  // State initialization for all settings
  const [settings, setSettings] = useState({
    class: "",
    section: "",
    stream: "",
    subject: "",
    difficulty: "medium",
    questionOrder: "fixed",
    displayMode: "all",
    showPoints: true,
    showTimer: true,
    showProgress: true,
    passingScore: 70,
    gradingType: "automatic",
    feedbackType: "after-submit",
    latePolicy: "accept",
    penaltyRules: [], // Array of { time: string (minutes), points: string (deduction) }
    setLateDeadline: false,
    lateSubmissionDeadline: "",
  });

  // **Data Options**

  // Class options
  const classOptions = [
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
  ];

  // Section options
  const sectionOptions = [
    "Section A",
    "Section B",
    "Section C",
    "Section D",
    "Section E",
    "Section F",
  ];

  // Stream options for Class 11 and 12
  const streamOptions = {
    "Class 11": [
      "Non Medical",
      "Medical",
      "Medical with Maths",
      "Commerce with Maths",
      "Commerce without Maths",
      "Arts with Maths",
      "Arts without Maths",
    ],
    "Class 12": [
      "Non Medical",
      "Medical",
      "Medical with Maths",
      "Commerce with Maths",
      "Commerce without Maths",
      "Arts with Maths",
      "Arts without Maths",
    ],
  };

  // Subject options based on class and stream
  const subjectOptions = {
    "Class 6": [
      "English",
      "Maths",
      "Hindi",
      "History",
      "Geography",
      "Civics",
      "Science",
      "Sanskrit",
      "French",
    ],
    "Class 7": [
      "English",
      "Maths",
      "Hindi",
      "History",
      "Geography",
      "Civics",
      "Science",
      "Sanskrit",
      "French",
    ],
    "Class 8": [
      "English",
      "Maths",
      "Hindi",
      "History",
      "Geography",
      "Civics",
      "Science",
      "Sanskrit",
      "French",
    ],
    "Class 9": [
      "English",
      "Maths",
      "Hindi",
      "History",
      "Geography",
      "Civics",
      "Economics",
      "Science",
      "Sanskrit",
      "French",
    ],
    "Class 10": [
      "English",
      "Maths",
      "Hindi",
      "History",
      "Geography",
      "Civics",
      "Economics",
      "Science",
      "Sanskrit",
      "French",
    ],
    "Class 11": {
      "Non Medical": [
        "Physics",
        "Chemistry",
        "Maths",
        "English",
        "Physical Education",
        "Computer",
      ],
      Medical: [
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "Physical Education",
        "Computer",
      ],
      "Medical with Maths": [
        "Physics",
        "Chemistry",
        "Maths",
        "Biology",
        "English",
        "Physical Education",
        "Computer",
      ],
      "Commerce with Maths": [
        "Accounts",
        "Maths",
        "Economics",
        "English",
        "Physical Education",
        "Computer",
      ],
      "Commerce without Maths": [
        "Accounts",
        "Economics",
        "English",
        "Physical Education",
        "Computer",
      ],
      "Arts with Maths": [
        "History",
        "Political Science",
        "Sociology",
        "Geography",
        "Psychology",
        "Economics",
        "English",
        "Maths",
        "Physical Education",
        "Computer",
      ],
      "Arts without Maths": [
        "History",
        "Political Science",
        "Sociology",
        "Geography",
        "Psychology",
        "Economics",
        "English",
        "Physical Education",
        "Computer",
      ],
    },
    "Class 12": {
      "Non Medical": [
        "Physics",
        "Chemistry",
        "Maths",
        "English",
        "Physical Education",
        "Computer",
      ],
      Medical: [
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "Physical Education",
        "Computer",
      ],
      "Medical with Maths": [
        "Physics",
        "Chemistry",
        "Maths",
        "Biology",
        "English",
        "Physical Education",
        "Computer",
      ],
      "Commerce with Maths": [
        "Accounts",
        "Maths",
        "Economics",
        "English",
        "Physical Education",
        "Computer",
      ],
      "Commerce without Maths": [
        "Accounts",
        "Economics",
        "English",
        "Physical Education",
        "Computer",
      ],
      "Arts with Maths": [
        "History",
        "Political Science",
        "Sociology",
        "Geography",
        "Psychology",
        "Economics",
        "English",
        "Maths",
        "Physical Education",
        "Computer",
      ],
      "Arts without Maths": [
        "History",
        "Political Science",
        "Sociology",
        "Geography",
        "Psychology",
        "Economics",
        "English",
        "Physical Education",
        "Computer",
      ],
    },
  };

  // **Event Handlers**

  // Handle changes to input fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    let updatedSettings = {
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    };

    // Reset dependent fields when class or stream changes
    if (name === "class") {
      updatedSettings.stream = "";
      updatedSettings.subject = "";
    }
    if (name === "stream") {
      updatedSettings.subject = "";
    }

    // Clear late submission deadline if checkbox is unchecked
    if (name === "setLateDeadline" && !checked) {
      updatedSettings.lateSubmissionDeadline = "";
    }

    setSettings(updatedSettings);
  };

  // Handle direct settings changes (e.g., difficulty buttons)
  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value,
    });
  };

  // Manage penalty rules
  const addPenaltyRule = () => {
    setSettings({
      ...settings,
      penaltyRules: [...settings.penaltyRules, { time: "", points: "" }],
    });
  };

  const removePenaltyRule = (index) => {
    const newRules = settings.penaltyRules.filter((_, i) => i !== index);
    setSettings({
      ...settings,
      penaltyRules: newRules,
    });
  };

  const updatePenaltyRule = (index, field, value) => {
    const newRules = [...settings.penaltyRules];
    newRules[index][field] = value;
    setSettings({
      ...settings,
      penaltyRules: newRules,
    });
  };

  // **Helper Functions**

  // Get available subjects based on class and stream
  const getAvailableSubjects = () => {
    if (!settings.class) return [];

    if (settings.class === "Class 11" || settings.class === "Class 12") {
      if (!settings.stream) return [];
      return subjectOptions[settings.class][settings.stream] || [];
    }

    return subjectOptions[settings.class] || [];
  };

  const showStreamSelection =
    settings.class === "Class 11" || settings.class === "Class 12";

  // **JSX Rendering**

  return (
    <div className={`p-8 rounded-lg shadow-md max-w-full mx-auto ${
      darkMode 
        ? "bg-[#100e10]" 
        : "bg-gradient-to-br from-purple-200 via-white to-purple-300"
    } transition-colors duration-300`}>
      <h2 className={`text-2xl font-bold mb-1 ${
        darkMode ? "text-white" : "text-gray-800"
      } text-left transition-colors duration-300`}>
        Configure Settings
      </h2>
      <p className={`${
        darkMode ? "text-gray-300" : "text-gray-500"
      } mb-8 text-left transition-colors duration-300`}>
        Customize how your assignment functions and appears
      </p>

      {/* Academic Settings */}
      <div className={`mb-10 p-6 rounded-lg ${
        darkMode ? "bg-[#341b47]" : "bg-white"
      } transition-colors duration-300`}>
        <h3 className={`text-lg font-semibold mb-6 ${
          darkMode ? "text-purple-300" : "text-purple-700"
        } flex items-center transition-colors duration-300`}>
          <span className={`${
            darkMode ? "bg-purple-900 text-purple-300" : "bg-purple-200 text-purple-800"
          } w-6 h-6 rounded-full mr-2 flex items-center justify-center text-sm font-bold transition-colors duration-300`}>
            1
          </span>
          Academic Settings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } mb-2 text-left transition-colors duration-300`}>
              Class
            </label>
            <select
              name="class"
              value={settings.class}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                darkMode 
                  ? "bg-[#231130]  border-gray-600 text-gray-200" 
                  : "bg-white border border-gray-300 text-gray-700"
              } transition-colors duration-300`}
            >
              <option value="">Select a class</option>
              {classOptions.map((classOption) => (
                <option key={classOption} value={classOption}>
                  {classOption}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } mb-2 text-left transition-colors duration-300`}>
              Section
            </label>
            <select
              name="section"
              value={settings.section}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                darkMode 
                  ? "bg-[#231130]  border-gray-600 text-gray-200" 
                  : "bg-white border border-gray-300 text-gray-700"
              } transition-colors duration-300`}
            >
              <option value="">Select a section</option>
              {sectionOptions.map((sectionOption) => (
                <option key={sectionOption} value={sectionOption}>
                  {sectionOption}
                </option>
              ))}
            </select>
          </div>
        </div>

        {showStreamSelection && (
          <div className="mb-6">
            <label className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } mb-2 text-left transition-colors duration-300`}>
              Stream
            </label>
            <select
              name="stream"
              value={settings.stream}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                darkMode 
                  ? "bg-bg-[#231130]  border-gray-600 text-gray-200" 
                  : "bg-white border border-gray-300 text-gray-700"
              } transition-colors duration-300`}
            >
              <option value="">Select a stream</option>
              {streamOptions[settings.class]?.map((streamOption) => (
                <option key={streamOption} value={streamOption}>
                  {streamOption}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-6">
          <label className={`block text-sm font-medium ${
            darkMode ? "text-gray-300" : "text-gray-700"
          } mb-2 text-left transition-colors duration-300`}>
            Subject
          </label>
          <select
            name="subject"
            value={settings.subject}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500 ${
              darkMode 
                ? "bg-[#231130] border-gray-600 text-gray-200" 
                : "bg-white border border-gray-300 text-gray-700"
            } transition-colors duration-300`}
            disabled={
              !settings.class || (showStreamSelection && !settings.stream)
            }
          >
            <option value="">Select a subject</option>
            {getAvailableSubjects().map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-600"
              } mb-3 text-left transition-colors duration-300`}
            >
              Difficulty Level
            </label>
            <div className="flex space-x-4">
              {["easy", "medium", "hard"].map((level) => {
                const capitalizedLevel = level.charAt(0).toUpperCase() + level.slice(1);
                const bgColor = settings.difficulty === level
                  ? darkMode
                    ? "bg-[#5b3a64] text-white border-purple-300"
                    : "bg-purple-100 text-gray-800 border-purple-500"
                  : darkMode
                    ? "bg-[#231130] text-gray-200 border-purple-500 hover:bg-[#5b3a69]"
                    : "bg-white text-gray-600 border-purple-400 hover:bg-purple-200";

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
      </div>

      {/* Display Settings */}
      <div className={`mb-10 p-6 rounded-lg ${
        darkMode ? "bg-[#341b47]" : "bg-white"
      } transition-colors duration-300`}>
        <h3 className={`text-lg font-semibold mb-6 ${
          darkMode ? "text-purple-300" : "text-purple-700"
        } flex items-center transition-colors duration-300`}>
          <span className={`${
            darkMode ? "bg-purple-900 text-purple-300" : "bg-purple-200 text-purple-800"
          } w-6 h-6 rounded-full mr-2 flex items-center justify-center text-sm font-bold transition-colors duration-300`}>
            2
          </span>
          Display Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } mb-2 text-left transition-colors duration-300`}>
              Question Order
            </label>
            <select
              name="questionOrder"
              value={settings.questionOrder}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                darkMode 
                  ? "bg-[#231130]  border-gray-600 text-gray-200" 
                  : "bg-white border border-gray-300 text-gray-700"
              } transition-colors duration-300`}
            >
              <option value="fixed">Fixed order</option>
              <option value="random">Randomized</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } mb-2 text-left transition-colors duration-300`}>
              Question Display
            </label>
            <select
              name="displayMode"
              value={settings.displayMode}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                darkMode 
                  ? "bg-[#231130] border-gray-600 text-gray-200" 
                  : "bg-white border border-gray-300 text-gray-700"
              } transition-colors duration-300`}
            >
              <option value="all">All questions at once</option>
              <option value="one">One question at a time</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-3 rounded-md ${
            darkMode ? "bg-[#231130]" : "bg-white border border-gray-300"
          } transition-colors duration-300`}>
            <label className={`flex items-center cursor-pointer ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } transition-colors duration-300`}>
              <input
                type="checkbox"
                name="showPoints"
                checked={settings.showPoints}
                onChange={handleInputChange}
                className={`mr-3 h-4 w-4 text-purple-500 focus:ring-purple-500 rounded ${
                  darkMode ? "bg-[#231130] border-gray-300" : "bg-white border-gray-300"
                } transition-colors duration-300`}
              />
              <span className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } transition-colors duration-300`}>Show point values</span>
            </label>
          </div>

          <div className={`p-3 rounded-md ${
            darkMode ? "bg-[#231130]" : "bg-white border border-gray-300"
          } transition-colors duration-300`}>
            <label className={`flex items-center cursor-pointer ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } transition-colors duration-300`}>
              <input
                type="checkbox"
                name="showTimer"
                checked={settings.showTimer}
                onChange={handleInputChange}
                className={`mr-3 h-4 w-4 text-purple-500 focus:ring-purple-500 rounded ${
                  darkMode ? "bg-[#231130] border-gray-300" : "bg-white border-gray-300"
                } transition-colors duration-300`}
              />
              <span className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } transition-colors duration-300`}>Show timer</span>
            </label>
          </div>

          <div className={`p-3 rounded-md ${
            darkMode ? "bg-[#231130]" : "bg-white border border-gray-300"
          } transition-colors duration-300`}>
            <label className={`flex items-center cursor-pointer ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } transition-colors duration-300`}>
              <input
                type="checkbox"
                name="showProgress"
                checked={settings.showProgress}
                onChange={handleInputChange}
                className={`mr-3 h-4 w-4 text-purple-500 focus:ring-purple-500 rounded ${
                  darkMode ? "bg-[#231130] border border-gray-600" : "bg-white border border-gray-300"
                } transition-colors duration-300`}
              />
              <span className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } transition-colors duration-300`}>
                Show progress indicator
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Grading Settings */}
      <div className={`mb-6 p-6 rounded-lg ${
        darkMode ? "bg-[#341b47]" : "bg-white"
      } transition-colors duration-300`}>
        <h3 className={`text-lg font-semibold mb-6 ${
          darkMode ? "text-purple-300" : "text-purple-700"
        } flex items-center transition-colors duration-300`}>
          <span className={`${
            darkMode ? "bg-purple-900 text-purple-300" : "bg-purple-200 text-purple-800"
          } w-6 h-6 rounded-full mr-2 flex items-center justify-center text-sm font-bold transition-colors duration-300`}>
            3
          </span>
          Grading Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } mb-2 text-left transition-colors duration-300`}>
              Passing Score (%)
            </label>
            <div className="flex items-center">
              <input
                type="number"
                name="passingScore"
                value={settings.passingScore}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                  darkMode 
                    ? "bg-[#231130]  border-gray-600 text-gray-200" 
                    : "bg-white border border-gray-300 text-gray-700"
                } transition-colors duration-300`}
                min="0"
                max="100"
              />
              <div className="ml-2 text-lg text-purple-400 font-medium">%</div>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } mb-2 text-left transition-colors duration-300`}>
              Grading Type
            </label>
            <select
              name="gradingType"
              value={settings.gradingType}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                darkMode 
                  ? "bg-[#231130]  border-gray-600 text-gray-200" 
                  : "bg-white border border-gray-300 text-gray-700"
              } transition-colors duration-300`}
            >
              <option value="automatic">Automatic (for quizzes)</option>
              <option value="manual">Manual</option>
              <option value="mixed">Mixed (Automatic + Manual)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } mb-2 text-left transition-colors duration-300`}>
              Feedback Options
            </label>
            <select
              name="feedbackType"
              value={settings.feedbackType}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                darkMode 
                  ? "bg-[#231130]  border-gray-600 text-gray-200" 
                  : "bg-white border border-gray-300 text-gray-700"
              } transition-colors duration-300`}
            >
              <option value="after-submit">After submission</option>
              <option value="after-due">After due date</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } mb-2 text-left transition-colors duration-300`}>
              Late Submission Policy
            </label>
            <select
              name="latePolicy"
              value={settings.latePolicy}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                darkMode 
                  ? "bg-[#231130]  border-gray-600 text-gray-200" 
                  : "bg-white border border-gray-300 text-gray-700"
              } transition-colors duration-300`}
            >
              <option value="accept">Accept late submissions</option>
              <option value="penalty">Accept with penalty</option>
              <option value="reject">Do not accept late submissions</option>
            </select>

            {settings.latePolicy === "accept" && (
              <div className="mt-4 space-y-3 rounded-md ">
                <label className={`flex items-center cursor-pointer ${
                  darkMode ? "bg-[#231130] p-3 rounded-md " : "border border-gray-300 text-gray-700 p-3 rounded-md "
                } transition-colors duration-300`}>
                  <input
                    type="checkbox"
                    name="setLateDeadline"
                    checked={settings.setLateDeadline}
                    onChange={handleInputChange}
                    className={`mr-2 h-4 w-4 text-purple-500 focus:ring-purple-500 rounded ${
                      darkMode ? "bg-[#231130]  border-gray-600" : "bg-white border-gray-300"
                    } transition-colors duration-300`}
                  />
                  <span className={`text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } transition-colors duration-300`}>Set a final deadline for late submissions</span>
                </label>

                {settings.setLateDeadline && (
                  <div className="pl-6">
                    <label className={`block text-sm font-medium ${
                      darkMode ? "text-gray-400" : "text-gray-700"
                    } mb-1 text-left transition-colors duration-300`}>
                      Final Late Submission Date
                    </label>
                    <input
                      type="date"
                      name="lateSubmissionDeadline"
                      value={settings.lateSubmissionDeadline}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-1.5 rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                        darkMode 
                          ? "bg-[#231130]  border-gray-600 text-gray-200" 
                          : "bg-white border-gray-300 text-gray-700"
                      } transition-colors duration-300`}
                    />
                  </div>
                )}
              </div>
            )}

            {settings.latePolicy === "penalty" && (
              <div className="mt-4">
                <h4 className={`text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-2 text-left transition-colors duration-300`}>
                  Late Submission Penalties
                </h4>
                {settings.penaltyRules.map((rule, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2 flex-wrap">
                    <span className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } transition-colors duration-300`}>After</span>
                    <input
                      type="number"
                      value={rule.time}
                      onChange={(e) =>
                        updatePenaltyRule(index, "time", e.target.value)
                      }
                      className={`w-20 px-2 py-1 rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                        darkMode 
                          ? "bg-[#231130] border-gray-600 text-gray-200" 
                          : "bg-white border-gray-300 text-gray-700"
                      } transition-colors duration-300`}
                      placeholder="minutes"
                      min="0"
                    />
                    <span className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } transition-colors duration-300`}>minutes,</span>
                    <span className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } transition-colors duration-300`}>deduct</span>
                    <input
                      type="number"
                      value={rule.points}
                      onChange={(e) =>
                        updatePenaltyRule(index, "points", e.target.value)
                      }
                      className={`w-20 px-2 py-1 rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                        darkMode 
                          ? "bg-[#231130]  border-gray-600 text-gray-200" 
                          : "bg-white border-gray-300 text-gray-700"
                      } transition-colors duration-300`}
                      placeholder="points"
                      min="0"
                    />
                    <span className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } transition-colors duration-300`}>points</span>
                    <button
                      onClick={() => removePenaltyRule(index)}
                      className={`text-red-400 hover:text-red-300 text-sm font-medium ml-auto pl-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } transition-colors duration-300`}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={addPenaltyRule}
                  className={`mt-2 px-3 py-1 rounded-md transition-colors duration-200 ${
                    darkMode 
                      ? "bg-[#7c5eb6] text-white hover:bg-[#6a4f9d]" 
                      : "bg-[#7c5eb6] text-white hover:bg-[#6a4f9d]"
                  }`}
                >
                  + Add rule
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className={`p-4 rounded-lg flex items-start mb-8 ${
        darkMode ? "bg-[#341b47]" : "bg-purple-50"
      } transition-colors duration-300`}>
        <Info className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${
          darkMode ? "text-purple-300" : "text-purple-700"
        } transition-colors duration-300`} />
        <p className={`text-sm ${
          darkMode ? "text-gray-300" : "text-purple-800"
        } transition-colors duration-300`}>
          These settings determine how your assignment will function for
          students. You can adjust them later if needed.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-10 flex justify-between">
        <button
          onClick={onPrevious}
          className={`px-6 py-2 rounded-md transition-colors duration-200 ${
            darkMode 
              ? "bg-[#231130]  text-gray-200 hover:bg-[#341b47]" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Back to Content
        </button>
        <button
          onClick={() => onNext({ ...assignmentData, settings })}
          className={`px-6 py-2 rounded-md transition-colors duration-200 font-medium shadow-sm ${
            darkMode 
              ? "bg-[#7c5eb6] text-white hover:bg-[#6a4f9d]" 
              : "bg-[#7c5eb6] text-white hover:bg-[#6a4f9d]"
          }`}
        >
          Continue to Review
        </button>
      </div>
    </div>
  );
}
