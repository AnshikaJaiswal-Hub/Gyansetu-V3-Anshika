import React, { useState } from "react";
import { MessageSquarePlus, BrainCircuit, Check, Wand2 } from "lucide-react";
import PropTypes from "prop-types";

// Reusable button component for actions
const ActionButton = ({ label, onClick, variant = "primary", icon: Icon }) => (
  <button
    type="button"
    className={`px-3 py-1.5 text-sm rounded flex items-center transition-colors duration-200 ${
      variant === "primary"
        ? "bg-purple-600 text-white hover:bg-purple-700"
        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
    }`}
    onClick={onClick}
    aria-label={label}
  >
    {Icon && <Icon className="w-3 h-3 mr-1" aria-hidden="true" />}
    {label}
  </button>
);

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  icon: PropTypes.elementType,
};

const NaturalLanguageInput = ({ onContinue }) => {
  const [showGeneratedContent, setShowGeneratedContent] = useState(true);
  const [instruction, setInstruction] = useState(
    "Create 5 challenging multiple choice questions about quadratic equations that test application skills. Focus on real-world problems like projectile motion and optimization."
  );
  const [content, setContent] = useState(
    "The quadratic formula states that for any quadratic equation in the form ax² + bx + c = 0, the solutions are given by x = (-b ± √(b² - 4ac)) / 2a. The discriminant b² - 4ac determines the number and type of solutions: if positive, there are two real solutions; if zero, there is one real solution; if negative, there are two complex solutions."
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateQuestions = () => {
    setIsGenerating(true);
    // Simulate async generation (replace with actual API call if needed)
    setTimeout(() => {
      setShowGeneratedContent(true);
      setIsGenerating(false);
    }, 500);
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="bg-purple-100 rounded-full p-1 mr-2">
            <MessageSquarePlus className="w-4 h-4 text-purple-700" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">Natural Language Input</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Create questions by typing instructions in natural language or transform existing content.
        </p>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <div className="flex items-center mb-2 text-purple-800">
          <BrainCircuit className="w-5 h-5 mr-2" aria-hidden="true" />
          <h4 className="text-sm font-medium">AI Teaching Assistant</h4>
        </div>
        <p className="text-xs text-purple-700 mb-3">
          Type instructions in natural language, and I’ll create structured questions for your assignment.
        </p>
        <div className="bg-white rounded-lg p-4 border border-purple-200">
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 mb-3"
            rows={3}
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="e.g., 'Create 3 multiple choice questions about photosynthesis for 7th graders'"
            aria-label="Natural language instruction input"
          />
          <ActionButton
            label={isGenerating ? "Generating..." : "Generate Questions"}
            onClick={handleGenerateQuestions}
            variant="primary"
            icon={() => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
                aria-hidden="true"
              >
                <path d="m6 12 6-8 6 8" />
                <path d="m6 12 6 8 6-8" />
              </svg>
            )}
            disabled={isGenerating}
          />
        </div>
      </div>

      <ContentTransformation content={content} setContent={setContent} />

      {showGeneratedContent && <GeneratedContent onContinue={onContinue} />}
    </div>
  );
};

NaturalLanguageInput.propTypes = {
  onContinue: PropTypes.func.isRequired,
};

const ContentTransformation = ({ content, setContent }) => (
  <div className="border border-gray-200 rounded-lg mb-6">
    <div className="bg-purple-50 px-4 py-2 border-b border-gray-200">
      <h4 className="text-sm font-medium text-purple-800">Content Transformation</h4>
    </div>
    <div className="p-4">
      <h5 className="text-sm font-medium text-gray-700 mb-2">Transform Existing Content</h5>
      <p className="text-xs text-gray-600 mb-3">
        Paste text from your materials, lectures, or textbooks to transform into assessment questions.
      </p>
      <textarea
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 mb-3"
        rows={5}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste your content here..."
        aria-label="Content transformation input"
      />
      <div className="flex flex-wrap gap-2 mb-3">
        <ActionButton label="Create Multiple Choice" variant="primary" icon={Wand2} />
        <ActionButton label="Create True/False" variant="secondary" icon={Wand2} />
        <ActionButton label="Create Short Answer" variant="secondary" icon={Wand2} />
      </div>
    </div>
  </div>
);

ContentTransformation.propTypes = {
  content: PropTypes.string.isRequired,
  setContent: PropTypes.func.isRequired,
};

const GeneratedContent = ({ onContinue }) => (
  <div className="border border-gray-200 rounded-lg">
    <div className="bg-green-50 px-4 py-2 border-b border-gray-200 flex items-center">
      <Check className="w-4 h-4 text-green-600 mr-2" aria-hidden="true" />
      <h4 className="text-sm font-medium text-green-800">Generated from Content</h4>
    </div>
    <div className="p-4 border-b border-gray-200">
      <h5 className="text-sm font-medium text-gray-800 mb-2">Question 1</h5>
      <p className="text-sm text-gray-700 mb-3">
        What information does the discriminant (b² - 4ac) provide about a quadratic equation?
      </p>
      <div className="pl-4 space-y-2" role="radiogroup" aria-labelledby="question-1">
        {[
          { id: "nq1a", label: "The values of the solutions" },
          { id: "nq1b", label: "The number and type of solutions", checked: true },
          { id: "nq1c", label: "The axis of symmetry of the parabola" },
          { id: "nq1d", label: "The y-intercept of the parabola" },
        ].map((option) => (
          <div key={option.id} className="flex items-center">
            <input
              type="radio"
              name="q1"
              id={option.id}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500"
              defaultChecked={option.checked}
            />
            <label htmlFor={option.id} className="ml-2 text-sm text-gray-700">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
    <div className="p-4">
      <ActionButton
        label="Add Generated Questions to Assignment"
        onClick={onContinue}
        variant="primary"
        icon={Check}
      />
      <p className="text-xs text-gray-500 italic mt-2">
        3 more questions available. You can edit any question before adding to your assignment.
      </p>
    </div>
  </div>
);

GeneratedContent.propTypes = {
  onContinue: PropTypes.func.isRequired,
};

export default NaturalLanguageInput;
export { ContentTransformation, GeneratedContent };