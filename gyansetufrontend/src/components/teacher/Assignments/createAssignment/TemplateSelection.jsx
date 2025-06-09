import React, { useState } from "react";
import { Check, BookOpen, PenTool, FileText, Folder } from "lucide-react";
import { useTheme } from "../../../../context/ThemeContext";

export default function TemplateSelection({ onNext, onSelectTemplate }) {
  const [selectedTemplate, setSelectedTemplate] = useState("quiz");
  const { darkMode } = useTheme();

  // Templates available
  const templates = [
    {
      id: "quiz",
      name: "Quiz Template",
      description: "Multiple choice questions with automatic grading",
      icon: <BookOpen className="w-10 h-10 text-purple-600" />,
    },
    {
      id: "written",
      name: "Written Assignment",
      description: "Long-form responses with rubric-based grading",
      icon: <PenTool className="w-10 h-10 text-purple-600" />,
    },
    {
      id: "test",
      name: "Test Module",
      description: "Comprehensive testing with various question types",
      icon: <FileText className="w-10 h-10 text-purple-600" />,
    },
    {
      id: "project",
      name: "Project Based",
      description: "Collaborative or individual project work",
      icon: <Folder className="w-10 h-10 text-purple-600" />,
    },
  ];

  // Handle template selection
  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    if (onSelectTemplate) {
      onSelectTemplate(templateId);
    }
  };

  return (
    <div
      className={`w-full max-w-full mx-auto p-4 md:p-8 transition-colors duration-300
        ${darkMode ? "bg-[#341B47]" : "bg-white"}`}
    >
      <h2
        className={`text-xl md:text-2xl font-bold mb-4 md:mb-8 transition-colors duration-300
          ${darkMode ? "text-purple-200" : "text-[#5c4370]"}`}
      >
        Choose Template
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md
              ${selectedTemplate === template.id
                ? darkMode
                  ? "border-[#a78bfa] bg-[#231130]"
                  : "border-[#5c4370] border-3 bg-purple-50"
                : darkMode
                  ? "border-[#5c4370] bg-transparent hover:border-[#9d8caa]"
                  : "border-gray-200 hover:border-purple-300"}
            `}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <div className="flex items-start">
              <div className={`mr-3 p-2 rounded-full ${darkMode ? "bg-[#341b47]" : "bg-purple-100"}`}>
                {React.cloneElement(template.icon, {
                  className: `w-7 h-7 ${darkMode ? "text-[#885d93]" : "text-[#5c4370]"}`
                })}
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold text-base md:text-lg ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
                  {template.name}
                </h3>
                <p className={`text-xs md:text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {template.description}
                </p>
              </div>
              {selectedTemplate === template.id && (
                <div className="ml-auto">
                  <Check className="w-5 h-5 text-purple-500" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 md:mt-12 flex justify-end">
        <button
          onClick={() => onNext(selectedTemplate)}
          className={`px-4 md:px-6 py-2 rounded-md font-medium shadow-sm transition-colors duration-200
            ${darkMode ? "bg-[#5c4370] text-white hover:bg-[#7c5eb6]" : "bg-[#5c4370] text-white hover:bg-[#7c5eb6]"}`}
        >
          Continue to Content
        </button>
      </div>
    </div>
  );
}
