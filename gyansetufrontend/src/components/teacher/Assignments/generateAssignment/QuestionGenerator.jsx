import React, { useState, useEffect } from "react";
import { Wand2, Sparkles, BookOpen, Users, GraduationCap, Calendar, Clock, Info, AlertTriangle , MessageSquare } from "lucide-react";
import PropTypes from "prop-types";

// Class, section and subject data
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

// Reusable button component
const ActionButton = ({ label, onClick, icon: Icon, disabled }) => (
  <button
    type="button"
    className={`w-full px-4 py-2 rounded-md flex items-center justify-center transition-colors duration-200 ${
      disabled
        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
        : "bg-purple-600 text-white hover:bg-purple-700"
    }`}
    onClick={onClick}
    aria-label={label}
    disabled={disabled}
  >
    {Icon && <Icon className="w-4 h-4 mr-2" aria-hidden="true" />}
    {label}
  </button>
);

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.elementType,
  disabled: PropTypes.bool,
};

// Question generation utilities
const generateQuestions = (formState) => {
  const { topic, questionType, difficulty, numQuestions, thinkingSkill } = formState;
  const questions = [];

  // Helper to get random item from an array
  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // Topic-based question templates
  const mathTemplates = {
    "Multiple Choice": [
      "Given the equation {equation}, what is the value of {variable}?",
      "Which of the following best represents the {concept} for {equation}?",
      "A {object} is {action} with an initial {parameter} of {value}. Using the equation {equation}, calculate {result}.",
      "What is the solution to the quadratic equation {equation}?",
      "If {condition}, which expression correctly represents {concept}?"
    ],
    "Short Answer": [
      "Solve for {variable} in the equation {equation}.",
      "Explain how to find the {feature} of the parabola represented by {equation}.",
      "Describe a real-world scenario that could be modeled by the equation {equation}.",
      "What does the coefficient {coefficient} represent in the context of {equation}?",
      "Find the {feature} of the function {equation} and explain its significance."
    ],
    "True/False": [
      "The solution to the equation {equation} is {solution}.",
      "The {feature} of a quadratic function is always located at {location}.",
      "When {condition}, the {result} of a quadratic equation {consequence}.",
      "The equation {equation} represents a parabola that opens {direction}.",
      "The roots of the equation {equation} are always real numbers."
    ],
    "Essay": [
      "Compare and contrast linear and quadratic functions, including their graphs, equations, and real-world applications.",
      "Explain how quadratic equations can be used to model and solve real-world problems. Provide at least three examples.",
      "Discuss the historical development of solving quadratic equations and how different cultures contributed to our current methods.",
      "Analyze how quadratic functions appear in various disciplines such as physics, economics, and architecture.",
      "Evaluate the most efficient methods for solving quadratic equations in different scenarios."
    ]
  };
  
  const scienceTemplates = {
    "Multiple Choice": [
      "Which of the following best describes the process of {process}?",
      "What is the primary function of {component} in {system}?",
      "Which factor most significantly affects {phenomenon}?",
      "During {process}, what happens to {element}?",
      "Which of these is an example of {concept}?"
    ],
    "Short Answer": [
      "Explain how {process} contributes to {outcome}.",
      "Describe the relationship between {factorA} and {factorB} in {system}.",
      "What would happen to {system} if {condition} changed?",
      "Compare the roles of {elementA} and {elementB} in {process}.",
      "How does {factor} affect the rate of {process}?"
    ],
    "True/False": [
      "{Statement about scientific concept}.",
      "The process of {process} always results in {outcome}.",
      "{FactorA} has a greater impact on {system} than {factorB}.",
      "Scientists generally agree that {controversial statement}.",
      "The theory of {theory} contradicts the principle of {principle}."
    ],
    "Essay": [
      "Analyze the historical development of our understanding of {concept} and how it has changed over time.",
      "Evaluate the evidence supporting and challenging the theory of {theory}.",
      "Discuss the ethical implications of advances in {field} and propose guidelines for future research.",
      "Compare and contrast competing explanations for {phenomenon} and assess their scientific merit.",
      "Explore how {scientific concept} applies to solving real-world problems such as {problem}."
    ]
  };
  
  const historyTemplates = {
    "Multiple Choice": [
      "Which event directly led to {historical event}?",
      "Who is credited with {achievement} during {time period}?",
      "What was the primary cause of {historical event}?",
      "Which statement best describes the significance of {historical event}?",
      "During {time period}, which policy was implemented to address {issue}?"
    ],
    "Short Answer": [
      "Explain the relationship between {eventA} and {eventB}.",
      "Describe two major consequences of {historical event}.",
      "How did {historical figure} contribute to {development}?",
      "What factors led to the rise of {movement/empire}?",
      "Compare the perspectives of {groupA} and {groupB} regarding {historical issue}."
    ],
    "True/False": [
      "{Historical figure} was primarily responsible for {historical outcome}.",
      "The {treaty/document} effectively resolved the conflict between {parties}.",
      "Economic factors were more significant than political factors in causing {historical event}.",
      "The {revolution/movement} achieved most of its stated goals.",
      "Historians generally agree about the causes of {controversial historical event}."
    ],
    "Essay": [
      "Analyze the long-term and short-term causes of {historical event} and evaluate their relative importance.",
      "Compare and contrast {historical periodA} and {historical periodB} with respect to {aspect}.",
      "Evaluate the impact of {historical event} on different social classes and demographic groups.",
      "To what extent was {historical figure} a product of their time versus an agent of change?",
      "Discuss how {historical event} has been interpreted differently over time and how these interpretations reflect the periods in which they were developed."
    ]
  };
  
  const literatureTemplates = {
    "Multiple Choice": [
      "Which literary device is prominently used in {passage}?",
      "In {work}, what does {symbol} symbolize?",
      "Which statement best describes the character of {character}?",
      "What is the main theme of {work}?",
      "How does the author establish {literary element} in {work}?"
    ],
    "Short Answer": [
      "Explain how {character} changes throughout {work}.",
      "Describe the significance of {setting} in {work}.",
      "How does the author use {literary device} to develop {theme}?",
      "Compare the motivations of {characterA} and {characterB} in {work}.",
      "What is the relationship between {literary element} and {theme} in {work}?"
    ],
    "True/False": [
      "The narrator of {work} is reliable.",
      "The author's primary purpose in {work} is to {purpose}.",
      "{Character} undergoes significant character development in {work}.",
      "The resolution of {work} suggests that the author believes {belief}.",
      "The conflict between {characterA} and {characterB} represents {larger conflict}."
    ],
    "Essay": [
      "Analyze how {author} uses literary techniques to develop {theme} in {work}.",
      "Compare and contrast the treatment of {theme} in {workA} and {workB}.",
      "Evaluate the effectiveness of {narrative technique} in {work}.",
      "Discuss how historical and cultural context influenced the development of {work}.",
      "To what extent does {character} conform to or subvert the archetype of {archetype}?"
    ]
  };
  
  // Template sets based on topic keywords
  const getTemplateSet = (topic) => {
    const topicLower = topic.toLowerCase();
    if (topicLower.includes("equation") || topicLower.includes("math") || topicLower.includes("function") || topicLower.includes("algebra")) {
      return mathTemplates;
    } else if (topicLower.includes("science") || topicLower.includes("biology") || topicLower.includes("chemistry") || topicLower.includes("physics")) {
      return scienceTemplates;
    } else if (topicLower.includes("history") || topicLower.includes("war") || topicLower.includes("revolution") || topicLower.includes("civilization")) {
      return historyTemplates;
    } else if (topicLower.includes("literature") || topicLower.includes("book") || topicLower.includes("novel") || topicLower.includes("poetry")) {
      return literatureTemplates;
    } else {
      // Default to math since the default topic is about quadratic equations
      return mathTemplates;
    }
  };
  
  // Difficulty modifiers
  const difficultyModifiers = {
    "Easy": {
      wordCount: 15,
      complexitySuffix: " using basic principles",
      options: ["clearly correct", "obviously wrong", "somewhat related", "partially correct"]
    },
    "Medium": {
      wordCount: 25,
      complexitySuffix: " considering multiple factors",
      options: ["correct", "incorrect but plausible", "partially correct", "correct in specific contexts"]
    },
    "Hard": {
      wordCount: 35,
      complexitySuffix: " analyzing complex relationships",
      options: ["technically correct", "seemingly correct but flawed", "correct with important caveats", "correct only under specific conditions"]
    }
  };
  
  // Generate the specified number of questions
  const templates = getTemplateSet(topic)[questionType] || mathTemplates[questionType];
  const diffMod = difficultyModifiers[difficulty];
  
  // Math-specific variables for substitution
  const equations = [
    "y = 2x² - 8x + 3",
    "y = -3x² + 12x - 7",
    "y = x² - 6x + 9",
    "y = 4x² - 4x - 3",
    "h = -16t² + 64t + 80",
    "s = 5t² + 2t - 10",
    "f(x) = 3x² - 12x + 7",
    "g(x) = -2x² + 8x - 1"
  ];
  
  const variables = ["x", "y", "t", "h", "a", "b", "c"];
  const concepts = ["axis of symmetry", "vertex", "maximum value", "minimum value", "zeros", "domain", "range"];
  const objects = ["ball", "car", "rocket", "particle", "projectile"];
  const actions = ["thrown upward", "launched", "projected", "moving", "accelerating"];
  const parameters = ["velocity", "position", "acceleration", "height", "distance"];
  const features = ["vertex", "axis of symmetry", "roots", "maximum", "minimum", "intercepts"];
  const conditions = ["the discriminant is negative", "a > 0", "the function has one repeated root", "the parabola opens downward"];
  const directions = ["upward", "downward"];
  
  for (let i = 0; i < numQuestions; i++) {
    const template = getRandomItem(templates);
    let questionText = template;
    
    // Replace placeholders for math questions
    if (getTemplateSet(topic) === mathTemplates) {
      questionText = questionText
        .replace("{equation}", getRandomItem(equations))
        .replace("{variable}", getRandomItem(variables))
        .replace("{concept}", getRandomItem(concepts))
        .replace("{object}", getRandomItem(objects))
        .replace("{action}", getRandomItem(actions))
        .replace("{parameter}", getRandomItem(parameters))
        .replace("{value}", Math.floor(Math.random() * 100))
        .replace("{result}", "the " + getRandomItem(["final position", "maximum height", "time of impact", "distance traveled"]))
        .replace("{feature}", getRandomItem(features))
        .replace("{coefficient}", ["a", "b", "c"][Math.floor(Math.random() * 3)])
        .replace("{condition}", getRandomItem(conditions))
        .replace("{solution}", Math.floor(Math.random() * 10) + " and " + Math.floor(Math.random() * 10))
        .replace("{location}", ["the midpoint between roots", "x = 0", "the origin"][Math.floor(Math.random() * 3)])
        .replace("{consequence}", ["has complex roots", "has real roots", "has exactly one solution"][Math.floor(Math.random() * 3)])
        .replace("{direction}", getRandomItem(directions));
    }
    
    // Adjust question based on thinking skill
    if (thinkingSkill === "Recall Facts") {
      questionText = questionText.replace(/calculate|find|solve/i, "identify");
    } else if (thinkingSkill === "Explain Ideas") {
      questionText = questionText.replace(/calculate|find|solve/i, "explain");
    } else if (thinkingSkill === "Compare & Analyze") {
      questionText = questionText + " Compare with another approach.";
    } else if (thinkingSkill === "Make Judgments") {
      questionText = questionText + " Evaluate the best method to solve this.";
    } else if (thinkingSkill === "Create Something") {
      questionText = questionText + " Create your own example that follows the same pattern.";
    }
    
    // Generate options for multiple choice questions
    let options = [];
    if (questionType === "Multiple Choice") {
      const correctAnswer = "Answer " + (Math.floor(Math.random() * 4) + 1);
      options = [
        { id: `q${i+1}a`, text: "Answer 1", checked: correctAnswer === "Answer 1" },
        { id: `q${i+1}b`, text: "Answer 2", checked: correctAnswer === "Answer 2" },
        { id: `q${i+1}c`, text: "Answer 3", checked: correctAnswer === "Answer 3" },
        { id: `q${i+1}d`, text: "Answer 4", checked: correctAnswer === "Answer 4" }
      ];
    } else if (questionType === "True/False") {
      options = [
        { id: `q${i+1}a`, text: "True", checked: Math.random() > 0.5 },
        { id: `q${i+1}b`, text: "False", checked: Math.random() <= 0.5 }
      ];
    }
    
    questions.push({
      id: `q${i+1}`,
      text: questionText,
      options: options
    });
  }
  
  return questions;
};

const QuestionGenerator = ({ selectedTemplate }) => {
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [formState, setFormState] = useState({
    topic: "Quadratic equations and their real-world applications",
    questionType: "Multiple Choice",
    difficulty: "Medium",
    numQuestions: 5,
    thinkingSkill: "Solve Problems",
    class: "Class 9",
    section: "Section A",
    subject: "Maths",
    stream: "",  // Only for Class 11 and 12
  });

  // Get available subjects based on the selected class and stream
  const getAvailableSubjects = () => {
    const selectedClass = formState.class;
    
    if (selectedClass === "Class 11" || selectedClass === "Class 12") {
      if (formState.stream && subjectOptions[selectedClass][formState.stream]) {
        return subjectOptions[selectedClass][formState.stream];
      }
      return []; // No stream selected yet
    }
    
    return subjectOptions[selectedClass] || [];
  };

  // Check if the selected class needs a stream selection
  const needsStreamSelection = () => {
    return formState.class === "Class 11" || formState.class === "Class 12";
  };

  // Reset subject when class or stream changes
  useEffect(() => {
    const availableSubjects = getAvailableSubjects();
    
    // If current subject is not available in new class/stream, reset it
    if (availableSubjects.length > 0 && !availableSubjects.includes(formState.subject)) {
      setFormState(prev => ({
        ...prev,
        subject: availableSubjects[0]
      }));
    }
  }, [formState.class, formState.stream]);

  // Reset stream when class changes
  useEffect(() => {
    if (formState.class === "Class 11" || formState.class === "Class 12") {
      // Set a default stream if not already set for this class
      if (!formState.stream || !streamOptions[formState.class].includes(formState.stream)) {
        setFormState(prev => ({
          ...prev,
          stream: streamOptions[formState.class][0]
        }));
      }
    } else {
      // Clear stream for classes that don't need it
      setFormState(prev => ({
        ...prev,
        stream: ""
      }));
    }
  }, [formState.class]);

  const handleGenerateQuestions = () => {
    setIsGenerating(true);
    // Generate questions based on form state
    setTimeout(() => {
      const questions = generateQuestions(formState);
      setGeneratedQuestions(questions);
      setShowQuestions(true);
      setIsGenerating(false);
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

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
    <div className="p-6">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="bg-purple-100 rounded-full p-1 mr-2">
            <Wand2 className="w-4 h-4 text-purple-700" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">Question Creator</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Easily create questions based on your topic or learning goals.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Question Settings</h4>
        
        {/* Class, Section, and Subject Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label
              htmlFor="class"
              className="block text-xs font-medium text-gray-600 mb-1"
            >
              <div className="flex items-center">
                <GraduationCap className="w-3 h-3 mr-1" />
                Class
              </div>
            </label>
            <select
              id="class"
              name="class"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              value={formState.class}
              onChange={handleInputChange}
              aria-label="Select class"
            >
              {classOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="section"
              className="block text-xs font-medium text-gray-600 mb-1"
            >
              <div className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                Section
              </div>
            </label>
            <select
              id="section"
              name="section"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              value={formState.section}
              onChange={handleInputChange}
              aria-label="Select section"
            >
              {sectionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {needsStreamSelection() ? (
            <div>
              <label
                htmlFor="stream"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                <div className="flex items-center">
                  <BookOpen className="w-3 h-3 mr-1" />
                  Stream
                </div>
              </label>
              <select
                id="stream"
                name="stream"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                value={formState.stream}
                onChange={handleInputChange}
                aria-label="Select stream"
              >
                {streamOptions[formState.class]?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                <div className="flex items-center">
                  <BookOpen className="w-3 h-3 mr-1" />
                  Subject
                </div>
              </label>
              <select
                id="subject"
                name="subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                value={formState.subject}
                onChange={handleInputChange}
                aria-label="Select subject"
              >
                {getAvailableSubjects().map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        {/* Show subject selection for higher classes if stream is selected */}
        {needsStreamSelection() && formState.stream && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                <div className="flex items-center">
                  <BookOpen className="w-3 h-3 mr-1" />
                  Subject
                </div>
              </label>
              <select
                id="subject"
                name="subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                value={formState.subject}
                onChange={handleInputChange}
                aria-label="Select subject"
              >
                {getAvailableSubjects().map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2"></div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="topic"
              className="block text-xs font-medium text-gray-600 mb-1"
            >
              Topic or Learning Goal
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="e.g. How plants make food"
              value={formState.topic}
              onChange={handleInputChange}
              aria-label="Topic or learning goal"
            />
          </div>
          <div>
            <label
              htmlFor="questionType"
              className="block text-xs font-medium text-gray-600 mb-1"
            >
              Question Style
            </label>
            <select
              id="questionType"
              name="questionType"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              value={formState.questionType}
              onChange={handleInputChange}
              aria-label="Question style"
            >
              <option>Multiple Choice</option>
              <option>Short Answer</option>
              <option>True/False</option>
              <option>Essay</option>
            </select>
          </div>
        </div>
        {/* New Topic Description Field */}
        <div className="mb-4">
          <label
            htmlFor="topicDescription"
            className="block text-xs font-medium text-gray-600 mb-1"
          >
            <div className="flex items-center">
              <MessageSquare className="w-3 h-3 mr-1" />
              Topic Description or Custom Instructions
            </div>
          </label>
          <textarea
            id="topicDescription"
            name="topicDescription"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            placeholder="Provide additional details or specific instructions for generating questions..."
            value={formState.topicDescription}
            onChange={handleInputChange}
            rows="3"
            aria-label="Topic description or custom instructions"
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">
            Describe specific concepts to focus on or add custom instructions for AI-generated questions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label
              htmlFor="difficulty"
              className="block text-xs font-medium text-gray-600 mb-1"
            >
              How Hard?
            </label>
            <select
              id="difficulty"
              name="difficulty"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              value={formState.difficulty}
              onChange={handleInputChange}
              aria-label="Difficulty level"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="numQuestions"
              className="block text-xs font-medium text-gray-600 mb-1"
            >
              Number of Questions
            </label>
            <input
              type="number"
              id="numQuestions"
              name="numQuestions"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              value={formState.numQuestions}
              onChange={handleInputChange}
              min="1"
              aria-label="Number of questions"
            />
          </div>
          <div>
            <label
              htmlFor="thinkingSkill"
              className="block text-xs font-medium text-gray-600 mb-1"
            >
              Thinking Skill
            </label>
            <select
              id="thinkingSkill"
              name="thinkingSkill"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              value={formState.thinkingSkill}
              onChange={handleInputChange}
              aria-label="Thinking skill"
            >
              <option>Recall Facts</option>
              <option>Explain Ideas</option>
              <option>Solve Problems</option>
              <option>Compare & Analyze</option>
              <option>Make Judgments</option>
              <option>Create Something</option>
            </select>
          </div>
        </div>
        <ActionButton
          label={isGenerating ? "Creating..." : "Create Questions"}
          onClick={handleGenerateQuestions}
          icon={Sparkles}
          disabled={isGenerating}
        />
      </div>

      {showQuestions && <GeneratedQuestions questions={generatedQuestions} numQuestions={formState.numQuestions} onRemoveAll={() => setShowQuestions(false)} />}

      <p className="text-xs text-gray-500 italic">
        These questions are suggestions. You can keep, change, or remove any of them.
      </p>
    </div>
  );
};

QuestionGenerator.propTypes = {
  selectedTemplate: PropTypes.oneOf(["quiz", "written", "interactive", "project"]),
};

// Modal component for "Keep All" confirmation
const ConfirmationModal = ({ isOpen, onClose, onAddMore, onPublishNow, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <div className="py-2">{children}</div>
        <div className="mt-4 flex space-x-2 justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onAddMore}
            className="px-3 py-1.5 border border-purple-700 bg-white text-purple-700 rounded-md hover:bg-purple-50 transition-colors text-sm"
          >
            Add More Questions
          </button>
          <button
            onClick={onPublishNow}
            className="px-3 py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
          >
            Publish Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal component for publishing assignment
const PublishModal = ({ isOpen, onClose, onPublish }) => {
  const [publishSettings, setPublishSettings] = React.useState({
    title: "",
    instructions: "",
    publishDate: getTodayDate(),
    publishTime: getCurrentTime(),
    dueDate: getTomorrowDate(),
    dueTime: getCurrentTime(),
    passingScore: 70,
    showTimer: true,
    showPoints: true,
    feedbackType: "after-submit",
    latePolicy: "accept",
    penaltyRules: [],
    setLateDeadline: false,
    lateDeadline: "",
  });

  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  function getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  function getCurrentTime() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPublishSettings({
      ...publishSettings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Add penalty rule
  const addPenaltyRule = () => {
    setPublishSettings({
      ...publishSettings,
      penaltyRules: [
        ...publishSettings.penaltyRules,
        { time: "", points: "" },
      ],
    });
  };

  // Remove penalty rule
  const removePenaltyRule = (index) => {
    const newRules = publishSettings.penaltyRules.filter((_, i) => i !== index);
    setPublishSettings({
      ...publishSettings,
      penaltyRules: newRules,
    });
  };

  // Update penalty rule
  const updatePenaltyRule = (index, field, value) => {
    const newRules = [...publishSettings.penaltyRules];
    newRules[index][field] = value;
    setPublishSettings({
      ...publishSettings,
      penaltyRules: newRules,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4 my-8 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Publish Assignment</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {/* Basic Assignment Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 flex items-center">
              <Info className="w-4 h-4 mr-1 text-purple-600" />
              Assignment Details
            </h4>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Assignment Title
              </label>
              <input
                type="text"
                name="title"
                value={publishSettings.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Enter a title for this assignment"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Instructions for Students
              </label>
              <textarea
                name="instructions"
                value={publishSettings.instructions}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Enter any specific instructions for this assignment"
              ></textarea>
            </div>
          </div>

          {/* Publish and Due Dates - Rearranged to column format */}
          <div className="grid grid-cols-1 gap-4 pt-2">
            <div>
              <h4 className="text-sm font-medium text-gray-700 flex items-center mb-3">
                <Calendar className="w-4 h-4 mr-1 text-purple-600" />
                Publish Date & Time
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="publishDate"
                    value={publishSettings.publishDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    name="publishTime"
                    value={publishSettings.publishTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 flex items-center mb-3">
                <Clock className="w-4 h-4 mr-1 text-purple-600" />
                Due Date & Time
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={publishSettings.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    name="dueTime"
                    value={publishSettings.dueTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
            
            {/* Display Settings - Now in column format */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 flex items-center mb-3">
                <Wand2 className="w-4 h-4 mr-1 text-purple-600" />
                Display Settings
              </h4>
              <div className="space-y-2">
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="showPoints"
                      checked={publishSettings.showPoints}
                      onChange={handleInputChange}
                      className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
                    />
                    <span className="text-sm">Show point values to students</span>
                  </label>
                </div>
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="showTimer"
                      checked={publishSettings.showTimer}
                      onChange={handleInputChange}
                      className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
                    />
                    <span className="text-sm">Show timer during quiz</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Passing Score - Now in column format */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 flex items-center mb-3">
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
                  className="w-4 h-4 mr-1 text-purple-600"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Passing Score
              </h4>
              <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Passing Percentage
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    name="passingScore"
                    value={publishSettings.passingScore}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    min="0"
                    max="100"
                  />
                  <div className="ml-2 text-sm font-medium">%</div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Students must score at least this percentage to pass the assignment
                </p>
              </div>
            </div>
          </div>

          {/* Feedback and Late Policy */}
          <div className="pt-2">
            <h4 className="text-sm font-medium text-gray-700 flex items-center mb-3">
              <AlertTriangle className="w-4 h-4 mr-1 text-purple-600" />
              Feedback & Late Submission Settings
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Show Feedback
                </label>
                <select
                  name="feedbackType"
                  value={publishSettings.feedbackType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="after-submit">After submission</option>
                  <option value="after-due">After due date</option>
                  <option value="manual">When manually released</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Late Submission Policy
                </label>
                <select
                  name="latePolicy"
                  value={publishSettings.latePolicy}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="accept">Accept late submissions</option>
                  <option value="penalty">Accept with penalty</option>
                  <option value="reject">Do not accept late submissions</option>
                </select>
              </div>
            </div>

            {publishSettings.latePolicy === "accept" && (
              <div className="bg-gray-50 p-3 rounded-md border border-gray-200 mb-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="setLateDeadline"
                    checked={publishSettings.setLateDeadline}
                    onChange={handleInputChange}
                    className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
                  />
                  <span className="text-sm">Set a final deadline for late submissions</span>
                </label>
                
                {publishSettings.setLateDeadline && (
                  <div className="grid grid-cols-2 gap-2 mt-2 pl-6">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Final Deadline Date
                      </label>
                      <input
                        type="date"
                        name="lateDeadline"
                        value={publishSettings.lateDeadline}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {publishSettings.latePolicy === "penalty" && (
              <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                <h5 className="text-xs font-medium text-gray-700 mb-2">Late Submission Penalties</h5>
                
                {publishSettings.penaltyRules.map((rule, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2 flex-wrap">
                    <span className="text-xs">After</span>
                    <input
                      type="number"
                      value={rule.time}
                      onChange={(e) => updatePenaltyRule(index, "time", e.target.value)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded-md text-xs"
                      placeholder="mins"
                      min="0"
                    />
                    <span className="text-xs">minutes, deduct</span>
                    <input
                      type="number"
                      value={rule.points}
                      onChange={(e) => updatePenaltyRule(index, "points", e.target.value)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded-md text-xs"
                      placeholder="points"
                      min="0"
                    />
                    <span className="text-xs">points</span>
                    <button
                      onClick={() => removePenaltyRule(index)}
                      className="text-red-500 hover:text-red-700 text-xs ml-auto"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <button
                    onClick={addPenaltyRule}
                    className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs hover:bg-purple-200"
                  >
                    + Add penalty rule
                  </button>
                  
                  <button
                    className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                      <polyline points="17 21 17 13 7 13 7 21"></polyline>
                      <polyline points="7 3 7 8 15 8"></polyline>
                    </svg>
                    Save Penalty Rules
                  </button>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2 text-xs text-yellow-700 mt-2 w-full">
                    <strong>Note:</strong> These penalties will automatically apply to submissions received after the due date. Make sure to explain the penalty rules to students.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6 pt-3 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => onPublish(publishSettings)}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm font-medium"
          >
            Publish Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

const GeneratedQuestions = ({ questions, numQuestions, onRemoveAll }) => {
  const [selectedQuestions, setSelectedQuestions] = React.useState([]);
  const [rejectedQuestions, setRejectedQuestions] = React.useState([]);
  const [showKeepAllModal, setShowKeepAllModal] = React.useState(false);
  const [showPublishModal, setShowPublishModal] = React.useState(false);
  const [allQuestions, setAllQuestions] = React.useState([]);
  
  // Display all questions or limit to a specific number
  const displayedQuestions = questions.slice(0, Math.min(questions.length, 5));

  // Track number of approved and rejected questions
  const approvedCount = selectedQuestions.length;
  const rejectedCount = rejectedQuestions.length;

  // Add current questions to all questions collection
  React.useEffect(() => {
    if (questions.length > 0) {
      // Only add questions that aren't already in allQuestions
      const newQuestionIds = questions.map(q => q.id);
      const existingQuestionIds = allQuestions.map(q => q.id);
      const uniqueNewQuestions = questions.filter(q => !existingQuestionIds.includes(q.id));
      
      if (uniqueNewQuestions.length > 0) {
        setAllQuestions(prev => [...prev, ...uniqueNewQuestions]);
      }
    }
  }, [questions]);

  // Track status changes from individual question components
  const updateQuestionStatus = (questionId, status) => {
    if (status === 'approved') {
      setSelectedQuestions(prev => {
        if (!prev.includes(questionId)) {
          return [...prev, questionId];
        }
        return prev;
      });
      setRejectedQuestions(prev => prev.filter(id => id !== questionId));
    } else if (status === 'rejected') {
      setRejectedQuestions(prev => {
        if (!prev.includes(questionId)) {
          return [...prev, questionId];
        }
        return prev;
      });
      setSelectedQuestions(prev => prev.filter(id => id !== questionId));
    }
  };

  const handleKeepAll = () => {
    // Logic to approve all currently displayed questions
    const questionIds = questions.map(q => q.id);
    
    // Add all current question IDs to selected questions
    setSelectedQuestions(prev => {
      // Combine previous selections with new ones, removing duplicates
      const combined = [...new Set([...prev, ...questionIds])];
      return combined;
    });
    
    // Remove these IDs from rejected questions if they were previously rejected
    setRejectedQuestions(prev => 
      prev.filter(id => !questionIds.includes(id))
    );
    
    // Show confirmation modal
    setShowKeepAllModal(true);
  };

  const handleAddMoreQuestions = () => {
    setShowKeepAllModal(false);
    // Keep the current state, allow teacher to add more questions
  };

  const handlePublishNow = () => {
    setShowKeepAllModal(false);
    setShowPublishModal(true);
  };

  const handlePublishAssignment = (publishSettings) => {
    // Here you would typically save the assignment to your backend
    console.log("Publishing assignment with settings:", publishSettings);
    console.log("Selected questions:", selectedQuestions);
    console.log("All questions:", allQuestions);
    
    // Show success message or redirect
    setShowPublishModal(false);
    
    // You could replace this with a redirect or a success modal
    alert("Assignment published successfully!");
  };

  return (
    <div className="border border-gray-200 rounded-lg mb-2">
      <div className="bg-purple-50 px-4 py-2 flex justify-between items-center border-b border-gray-200">
        <h4 className="text-sm font-medium text-purple-800">Created Questions</h4>
        <div className="flex space-x-2">
          <div className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
            {numQuestions} total
          </div>
          {approvedCount > 0 && (
            <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
              {approvedCount} selected
            </div>
          )}
          {rejectedCount > 0 && (
            <div className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
              {rejectedCount} rejected
            </div>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {displayedQuestions.map((question, index) => {
          // Check if this question is already approved or rejected
          const isApproved = selectedQuestions.includes(question.id);
          const isRejected = rejectedQuestions.includes(question.id);
          
          // Set initial status based on current state
          let initialStatus = 'pending';
          if (isApproved) initialStatus = 'approved';
          if (isRejected) initialStatus = 'rejected';
          
          return question.options.length > 0 ? (
            <QuestionItem 
              key={question.id} 
              question={{...question, status: initialStatus}} 
              index={index}
              onStatusChange={(status) => updateQuestionStatus(question.id, status)}
            />
          ) : (
            <QuestionItemCondensed 
              key={question.id} 
              question={{...question, status: initialStatus}} 
              index={index}
              onStatusChange={(status) => updateQuestionStatus(question.id, status)}
            />
          );
        })}
      </div>

      <div className="bg-gray-50 p-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Showing {displayedQuestions.length} of {numQuestions} questions
        </span>
        <div className="flex space-x-2">
          <button
            className="inline-flex items-center justify-center px-3 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
            onClick={onRemoveAll}
            aria-label="Remove all questions"
          >
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
              className="mr-1.5"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            Remove All
          </button>
          <button
            className="inline-flex items-center justify-center px-3 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
            onClick={handleKeepAll}
            aria-label="Keep all questions"
          >
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
              className="mr-1.5"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Keep All
          </button>
        </div>
      </div>

      {/* Keep All Confirmation Modal */}
      <ConfirmationModal
        isOpen={showKeepAllModal}
        onClose={() => setShowKeepAllModal(false)}
        onAddMore={handleAddMoreQuestions}
        onPublishNow={handlePublishNow}
        title="Questions Selected"
      >
        <p className="text-gray-600 text-sm">
          You've selected {selectedQuestions.length} questions. Would you like to add more questions or proceed to publish this assignment?
        </p>
      </ConfirmationModal>

      {/* Publish Assignment Modal */}
      <PublishModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onPublish={handlePublishAssignment}
      />
    </div>
  );
};

GeneratedQuestions.propTypes = {
  questions: PropTypes.array.isRequired,
  numQuestions: PropTypes.number.isRequired,
  onRemoveAll: PropTypes.func.isRequired
};

const QuestionItem = ({ question, index, onStatusChange }) => {
  const [status, setStatus] = React.useState(question.status || 'pending'); // 'pending', 'approved', 'rejected'
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedText, setEditedText] = React.useState(question.text);

  // Update parent component when status changes
  React.useEffect(() => {
    if (onStatusChange && status !== 'pending') {
      onStatusChange(status);
    }
  }, [status, onStatusChange]);

  // When question prop changes with a different status, update local state
  React.useEffect(() => {
    if (question.status && question.status !== status) {
      setStatus(question.status);
    }
  }, [question.status]);

  const handleApprove = () => {
    setStatus('approved');
  };

  const handleReject = () => {
    setStatus('rejected');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    // In a real application, you would update the question in state/database
  };

  const handleCancelEdit = () => {
    setEditedText(question.text);
    setIsEditing(false);
  };

  // Determine background color based on status
  const getBackgroundColor = () => {
    switch (status) {
      case 'approved':
        return 'bg-green-50';
      case 'rejected':
        return 'bg-red-50';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className={`p-4 transition-colors duration-200 ${getBackgroundColor()}`}>
      <div className="flex items-start">
        <div className="flex-grow">
          <div className="flex items-center">
            <div className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full mr-2">
              Auto-Created
            </div>
            <h5 className="text-sm font-medium text-gray-800">Question {index + 1}</h5>
            {status === 'approved' && (
              <div className="ml-2 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                Selected
              </div>
            )}
            {status === 'rejected' && (
              <div className="ml-2 text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                Rejected
              </div>
            )}
          </div>
          
          {isEditing ? (
            <div className="my-2">
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full border border-purple-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"
                rows={3}
              />
              <div className="mt-2 flex space-x-2">
                <button 
                  onClick={handleSaveEdit}
                  className="text-xs bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                >
                  Save
                </button>
                <button 
                  onClick={handleCancelEdit}
                  className="text-xs bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="my-2 text-gray-700">{editedText}</p>
          )}
          
          {!isEditing && (
            <div className="pl-4 mt-3 space-y-2" role="radiogroup" aria-labelledby={`question-${question.id}`}>
              {question.options.map((option) => (
                <div key={option.id} className="flex items-center">
                  <input
                    type="radio"
                    name={question.id}
                    id={option.id}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                    defaultChecked={option.checked}
                    disabled={status === 'rejected'}
                  />
                  <label htmlFor={option.id} className="ml-2 text-sm text-gray-700">
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex ml-4 space-x-2">
          <button
            className={`p-1 rounded-full ${
              status === 'approved' 
                ? 'text-white bg-green-500 hover:bg-green-600' 
                : 'text-green-600 hover:text-green-800 hover:bg-green-100'
            }`}
            aria-label="Keep question"
            onClick={handleApprove}
            disabled={isEditing}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </button>
          <button
            className={`p-1 rounded-full ${
              status === 'rejected' 
                ? 'text-white bg-red-500 hover:bg-red-600' 
                : 'text-red-600 hover:text-red-800 hover:bg-red-100'
            }`}
            aria-label="Remove question"
            onClick={handleReject}
            disabled={isEditing}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
          <button
            className={`p-1 rounded-full ${
              isEditing 
                ? 'text-white bg-purple-500 hover:bg-purple-600' 
                : 'text-purple-600 hover:text-purple-800 hover:bg-purple-100'
            }`}
            aria-label="Edit question"
            onClick={isEditing ? handleSaveEdit : handleEdit}
            disabled={status === 'rejected'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

QuestionItem.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    status: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        checked: PropTypes.bool,
      })
    ).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onStatusChange: PropTypes.func,
};

const QuestionItemCondensed = ({ question, index, onStatusChange }) => {
  const [status, setStatus] = React.useState(question.status || 'pending'); // 'pending', 'approved', 'rejected'
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedText, setEditedText] = React.useState(question.text);

  // Update parent component when status changes
  React.useEffect(() => {
    if (onStatusChange && status !== 'pending') {
      onStatusChange(status);
    }
  }, [status, onStatusChange]);

  // When question prop changes with a different status, update local state
  React.useEffect(() => {
    if (question.status && question.status !== status) {
      setStatus(question.status);
    }
  }, [question.status]);

  const handleApprove = () => {
    setStatus('approved');
  };

  const handleReject = () => {
    setStatus('rejected');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    // In a real application, you would update the question in state/database
  };

  const handleCancelEdit = () => {
    setEditedText(question.text);
    setIsEditing(false);
  };

  // Determine background color based on status
  const getBackgroundColor = () => {
    switch (status) {
      case 'approved':
        return 'bg-green-50';
      case 'rejected':
        return 'bg-red-50';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className={`p-4 transition-colors duration-200 ${getBackgroundColor()}`}>
      <div className="flex items-start">
        <div className="flex-grow">
          <div className="flex items-center">
            <div className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full mr-2">
              Auto-Created
            </div>
            <h5 className="text-sm font-medium text-gray-800">Question {index + 1}</h5>
            {status === 'approved' && (
              <div className="ml-2 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                Selected
              </div>
            )}
            {status === 'rejected' && (
              <div className="ml-2 text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                Rejected
              </div>
            )}
          </div>
          
          {isEditing ? (
            <div className="my-2">
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full border border-purple-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"
                rows={3}
              />
              <div className="mt-2 flex space-x-2">
                <button 
                  onClick={handleSaveEdit}
                  className="text-xs bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                >
                  Save
                </button>
                <button 
                  onClick={handleCancelEdit}
                  className="text-xs bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="my-2 text-gray-700">{editedText}</p>
          )}
          
          {!isEditing && (
            <div className="text-xs text-gray-500 italic">
              {question.questionType === "Essay" ? "Essay question" : "+ options to choose from"}
            </div>
          )}
        </div>
        <div className="flex ml-4 space-x-2">
          <button
            className={`p-1 rounded-full ${
              status === 'approved' 
                ? 'text-white bg-green-500 hover:bg-green-600' 
                : 'text-green-600 hover:text-green-800 hover:bg-green-100'
            }`}
            aria-label="Keep question"
            onClick={handleApprove}
            disabled={isEditing}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </button>
          <button
            className={`p-1 rounded-full ${
              status === 'rejected' 
                ? 'text-white bg-red-500 hover:bg-red-600' 
                : 'text-red-600 hover:text-red-800 hover:bg-red-100'
            }`}
            aria-label="Remove question"
            onClick={handleReject}
            disabled={isEditing}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
          <button
            className={`p-1 rounded-full ${
              isEditing 
                ? 'text-white bg-purple-500 hover:bg-purple-600' 
                : 'text-purple-600 hover:text-purple-800 hover:bg-purple-100'
            }`}
            aria-label="Edit question"
            onClick={isEditing ? handleSaveEdit : handleEdit}
            disabled={status === 'rejected'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

QuestionItemCondensed.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    status: PropTypes.string,
    options: PropTypes.array.isRequired,
    questionType: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onStatusChange: PropTypes.func,
};

export default QuestionGenerator;