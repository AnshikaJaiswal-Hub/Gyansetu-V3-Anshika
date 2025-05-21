import React, { useState } from "react";
import { Sparkles, Info, BrainCircuit } from "lucide-react";
import QuestionGenerator from "./QuestionGenerator";
import ContentEnhancement from "./ContentEnhancement";
import NaturalLanguageInput from "./NaturalLanguageInput";

const AIAssistantPanel = ({
  selectedTemplate = "quiz",
  onContinue,
  onBack,
  darkMode,
}) => {
  const [activeTab, setActiveTab] = useState("question-gen");
  const [showTooltip, setShowTooltip] = useState(false);

  // Template-specific instructions for the AI
  const getTemplateInstructions = () => {
    switch (selectedTemplate) {
      case "quiz":
        return "Create quiz questions with clear answers based on curriculum standards.";
      case "written":
        return "Generate essay prompts and short-answer questions with sample responses.";
      case "interactive":
        return "Design engaging scenario-based questions with interactive elements.";
      case "project":
        return "Create project guidelines with milestones, objectives, and evaluation criteria.";
      default:
        return "Generate assessment content appropriate for your curriculum.";
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-[#1f1821]" : "bg-white"
      } rounded-lg shadow-lg w-full mx-auto transition-colors duration-300`}
    >
      <div
        className={`flex items-center justify-between p-3 sm:p-4 ${
          darkMode
            ? "bg-[#341b47] border-b border-[#4a2f5e]"
            : "bg-purple-50 border-b border-purple-100"
        } transition-colors duration-300`}
      >
        <div className="flex items-center">
          <h2
            className={`text-lg sm:text-xl font-bold ${
              darkMode ? "text-purple-200" : "text-purple-800"
            } flex items-center transition-colors duration-300`}
          >
            <Sparkles
              className={`${
                darkMode ? "text-purple-300" : "text-purple-500"
              } w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 transition-colors duration-300`}
            />
            AI Assistant
          </h2>
        </div>
        <div className="relative">
          <button
            className={`${
              darkMode
                ? "text-purple-300 hover:text-purple-100"
                : "text-purple-700 hover:text-purple-900"
            } transition-colors duration-300`}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Info className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          {showTooltip && (
            <div
              className={`absolute right-0 w-48 sm:w-64 p-2 sm:p-3 ${
                darkMode
                  ? "bg-[#2a0c2e] text-gray-200 border-gray-600"
                  : "bg-white text-gray-700 border-gray-200"
              } rounded-md shadow-lg border text-xs sm:text-sm z-10 transition-colors duration-300`}
            >
              AI features are optional assistants that help with content
              creation while keeping you in control. Toggle features on/off as
              needed.
            </div>
          )}
        </div>
      </div>

      <div
        className={`p-3 sm:p-4 ${
          darkMode
            ? "bg-[#341b47] border-b border-[#4a2f5e]"
            : "bg-purple-50 border-b border-purple-100"
        } transition-colors duration-300`}
      >
        <div
          className={`p-2 sm:p-3 ${
            darkMode
              ? "bg-[#231130] border-[#4a2f5e]"
              : "bg-white border-purple-200"
          } rounded-lg border transition-colors duration-300`}
        >
          <div
            className={`flex items-center ${
              darkMode ? "text-purple-200" : "text-purple-800"
            } mb-1 sm:mb-2 transition-colors duration-300`}
          >
            <BrainCircuit
              className={`w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 ${
                darkMode ? "text-purple-300" : "text-purple-600"
              } transition-colors duration-300`}
            />
            <h3 className="font-medium text-sm sm:text-base">
              AI Assistant Suggestion
            </h3>
          </div>
          <p
            className={`text-xs sm:text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            } transition-colors duration-300`}
          >
            {getTemplateInstructions()} Customize the parameters below to get
            exactly what you need.
          </p>
        </div>
      </div>

      <div
        className={`overflow-x-hidden ${
          darkMode ? "bg-[#1f1821]" : "bg-white"
        } transition-colors duration-300`}
      >
        {activeTab === "question-gen" && (
          <QuestionGenerator
            selectedTemplate={selectedTemplate}
            darkMode={darkMode}
          />
        )}

        {activeTab === "content-enhance" && (
          <ContentEnhancement darkMode={darkMode} />
        )}

        {activeTab === "natural-input" && (
          <NaturalLanguageInput onContinue={onContinue} darkMode={darkMode} />
        )}
      </div>
    </div>
  );
};

export default AIAssistantPanel;
