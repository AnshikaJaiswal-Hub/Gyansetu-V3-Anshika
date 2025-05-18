import React, { useState } from "react";
import { Sparkles, Info, BrainCircuit } from "lucide-react";
import QuestionGenerator from "./QuestionGenerator";
import ContentEnhancement from "./ContentEnhancement";
import NaturalLanguageInput from "./NaturalLanguageInput";

const AIAssistantPanel = ({ 
  selectedTemplate = "quiz", 
  onContinue, 
  onBack
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
    <div className="bg-white rounded-lg shadow-lg w-full mx-auto">
      <div className="flex items-center justify-between p-3 sm:p-4 bg-purple-50 border-b border-purple-100">
        <div className="flex items-center">
          <h2 className="text-lg sm:text-xl font-bold text-purple-800 flex items-center">
            <Sparkles className="text-purple-500 w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            AI Assistant
          </h2>
        </div>
        <div className="relative">
          <button
            className="text-purple-700 hover:text-purple-900"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Info className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          {showTooltip && (
            <div className="absolute right-0 w-48 sm:w-64 p-2 sm:p-3 bg-white rounded-md shadow-lg border border-gray-200 text-xs sm:text-sm text-gray-700 z-10">
              AI features are optional assistants that help with content creation while keeping you in control. Toggle features on/off as needed.
            </div>
          )}
        </div>
      </div>

      <div className="p-3 sm:p-4 bg-purple-50 border-b border-purple-100">
        <div className="p-2 sm:p-3 bg-white rounded-lg border border-purple-200">
          <div className="flex items-center text-purple-800 mb-1 sm:mb-2">
            <BrainCircuit className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-purple-600" />
            <h3 className="font-medium text-sm sm:text-base">AI Assistant Suggestion</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            {getTemplateInstructions()} Customize the parameters below to get exactly what you need.
          </p>
        </div>
      </div>

      
      
      <div className="overflow-x-hidden">
        {activeTab === "question-gen" && (
          <QuestionGenerator selectedTemplate={selectedTemplate} />
        )}

        {activeTab === "content-enhance" && <ContentEnhancement />}

        {activeTab === "natural-input" && (
          <NaturalLanguageInput onContinue={onContinue} />
        )}
      </div>

      
    </div>
  );
};

export default AIAssistantPanel;