import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  BookmarkIcon,
  Flag,
  Calendar,
  Clock3,
} from "lucide-react";

import QuizList from "./QuizList";
import WelcomeScreen from "./WelcomeScreen";
import QuestionsScreen from "./QuestionsScreen";
import SubmittedScreen from "./SubmittedScreen";
import { getCurrentDateTime, isQuizAvailable } from "./utils";

const StudentQuizInterface = () => {
  // Mock data - in a real application, this would come from an API
  const [quizzes] = useState([
    {
      id: "a123",
      title: "Introduction to Quadratic Equations",
      description:
        "This quiz will test your understanding of quadratic equations, their properties, and how to solve them using different methods.",
      subject: "Mathematics",
      className: "Class 10",
      section: "B",
      dueDate: "2025-05-27T23:59:59",
      startDate: "2025-05-20T01:00:00",
      endDate: "2025-05-28T03:50:59",
      duration: 60, // in minutes
      totalMarks: 30,
      passingScore: 15,
      showMarks: true,
      showTimer: true,
      showProgressIndicator: true,
      oneQuestionAtATime: false,
      status: "upcoming", // upcoming, attempted, completed
      score: null,
      questions: [
        {
          id: 1,
          text: "What is the standard form of a quadratic equation?",
          type: "mcq",
          options: [
            { id: 1, text: "ax² + bx + c = 0", isCorrect: true },
            { id: 2, text: "ax + b = 0", isCorrect: false },
            { id: 3, text: "ax³ + bx² + cx + d = 0", isCorrect: false },
            { id: 4, text: "a/x² + b/x + c = 0", isCorrect: false },
          ],
          marks: 2,
        },
        {
          id: 2,
          text: "If the roots of a quadratic equation are 3 and -5, what is the equation in standard form?",
          type: "mcq",
          options: [
            { id: 1, text: "x² + 2x - 15 = 0", isCorrect: false },
            { id: 2, text: "x² - 2x - 15 = 0", isCorrect: false },
            { id: 3, text: "x² + 2x + 15 = 0", isCorrect: false },
            { id: 4, text: "x² - 2x + 15 = 0", isCorrect: false },
            { id: 5, text: "x² + 2x - 15 = 0", isCorrect: true },
          ],
          marks: 3,
        },
        {
          id: 3,
          text: "For the quadratic equation 2x² - 4x + 1 = 0, calculate the discriminant and explain what it tells us about the roots of the equation.",
          type: "long",
          marks: 5,
        },
        {
          id: 4,
          text: "Solve the equation x² - 7x + 12 = 0 using the quadratic formula.",
          type: "short",
          marks: 4,
        },
      ],
    },
    {
      id: "a456",
      title: "Acid-Base Reactions and pH Scale",
      description:
        "This quiz covers the fundamentals of acid-base reactions, the pH scale, and their applications in chemistry.",
      subject: "Chemistry",
      className: "Class 9",
      section: "A",
      dueDate: "2025-05-20T23:59:59",
      startDate: "2025-05-06T14:30:00",
      endDate: "2025-05-20T23:59:59",
      duration: 45,
      totalMarks: 25,
      passingScore: 13,
      showMarks: true,
      showTimer: true,
      showProgressIndicator: true,
      oneQuestionAtATime: true,
      status: "upcoming",
      score: null,
      questions: [
        {
          id: 1,
          text: "What is the pH range for acidic solutions?",
          type: "mcq",
          options: [
            { id: 1, text: "0-7", isCorrect: true },
            { id: 2, text: "7", isCorrect: false },
            { id: 3, text: "7-14", isCorrect: false },
            { id: 4, text: "14", isCorrect: false },
          ],
          marks: 2,
        },
        {
          id: 2,
          text: "Explain the concept of neutralization reactions with an example.",
          type: "long",
          marks: 5,
        },
      ],
    },
    {
      id: "a456",
      title: "Acid-Base Reactions and pH Scale",
      description:
        "This quiz covers the fundamentals of acid-base reactions, the pH scale, and their applications in chemistry.",
      subject: "Chemistry",
      className: "Class 9",
      section: "A",
      dueDate: "2025-05-20T23:59:59",
      startDate: "2025-05-06T14:30:00",
      endDate: "2025-05-20T23:59:59",
      duration: 45,
      totalMarks: 25,
      passingScore: 13,
      showMarks: true,
      showTimer: true,
      showProgressIndicator: true,
      oneQuestionAtATime: true,
      status: "upcoming",
      score: null,
      questions: [
        {
          id: 1,
          text: "What is the pH range for acidic solutions?",
          type: "mcq",
          options: [
            { id: 1, text: "0-7", isCorrect: true },
            { id: 2, text: "7", isCorrect: false },
            { id: 3, text: "7-14", isCorrect: false },
            { id: 4, text: "14", isCorrect: false },
          ],
          marks: 2,
        },
        {
          id: 2,
          text: "Explain the concept of neutralization reactions with an example.",
          type: "long",
          marks: 5,
        },
      ],
    },
    {
      id: "a456",
      title: "Acid-Base Reactions and pH Scale",
      description:
        "This quiz covers the fundamentals of acid-base reactions, the pH scale, and their applications in chemistry.",
      subject: "Chemistry",
      className: "Class 9",
      section: "A",
      dueDate: "2025-05-20T23:59:59",
      startDate: "2025-05-06T14:30:00",
      endDate: "2025-05-20T23:59:59",
      duration: 45,
      totalMarks: 25,
      passingScore: 13,
      showMarks: true,
      showTimer: true,
      showProgressIndicator: true,
      oneQuestionAtATime: true,
      status: "upcoming",
      score: null,
      questions: [
        {
          id: 1,
          text: "What is the pH range for acidic solutions?",
          type: "mcq",
          options: [
            { id: 1, text: "0-7", isCorrect: true },
            { id: 2, text: "7", isCorrect: false },
            { id: 3, text: "7-14", isCorrect: false },
            { id: 4, text: "14", isCorrect: false },
          ],
          marks: 2,
        },
        {
          id: 2,
          text: "Explain the concept of neutralization reactions with an example.",
          type: "long",
          marks: 5,
        },
      ],
    },
    {
      id: "a456",
      title: "Acid-Base Reactions and pH Scale",
      description:
        "This quiz covers the fundamentals of acid-base reactions, the pH scale, and their applications in chemistry.",
      subject: "Chemistry",
      className: "Class 9",
      section: "A",
      dueDate: "2025-05-20T23:59:59",
      startDate: "2025-05-06T14:30:00",
      endDate: "2025-05-20T23:59:59",
      duration: 45,
      totalMarks: 25,
      passingScore: 13,
      showMarks: true,
      showTimer: true,
      showProgressIndicator: true,
      oneQuestionAtATime: true,
      status: "upcoming",
      score: null,
      questions: [
        {
          id: 1,
          text: "What is the pH range for acidic solutions?",
          type: "mcq",
          options: [
            { id: 1, text: "0-7", isCorrect: true },
            { id: 2, text: "7", isCorrect: false },
            { id: 3, text: "7-14", isCorrect: false },
            { id: 4, text: "14", isCorrect: false },
          ],
          marks: 2,
        },
        {
          id: 2,
          text: "Explain the concept of neutralization reactions with an example.",
          type: "long",
          marks: 5,
        },
      ],
    },
    {
      id: "a789",
      title: "World War II: Causes and Consequences",
      description:
        "An in-depth analysis of the major causes, key events, and lasting impacts of World War II on global politics and society.",
      subject: "History",
      className: "Class 10",
      section: "C",
      dueDate: "2025-05-18T23:59:59",
      startDate: "2025-05-01T10:00:00",
      endDate: "2025-05-18T23:59:59",
      duration: 90,
      totalMarks: 40,
      passingScore: 20,
      showMarks: true,
      showTimer: true,
      showProgressIndicator: true,
      oneQuestionAtATime: false,
      status: "attempted",
      score: 32,
      questions: [
        {
          id: 1,
          text: "What was the immediate trigger that started World War II?",
          type: "mcq",
          options: [
            {
              id: 1,
              text: "Assassination of Archduke Franz Ferdinand",
              isCorrect: false,
            },
            { id: 2, text: "German invasion of Poland", isCorrect: true },
            { id: 3, text: "The Great Depression", isCorrect: false },
            { id: 4, text: "Russian Revolution", isCorrect: false },
          ],
          marks: 2,
        },
        {
          id: 2,
          text: "Describe the policy of appeasement and explain why it failed to prevent World War II.",
          type: "long",
          marks: 8,
        },
      ],
    },
    {
      id: "a789",
      title: "World War II: Causes and Consequences",
      description:
        "An in-depth analysis of the major causes, key events, and lasting impacts of World War II on global politics and society.",
      subject: "History",
      className: "Class 10",
      section: "C",
      dueDate: "2025-05-18T23:59:59",
      startDate: "2025-05-01T10:00:00",
      endDate: "2025-05-18T23:59:59",
      duration: 90,
      totalMarks: 40,
      passingScore: 20,
      showMarks: true,
      showTimer: true,
      showProgressIndicator: true,
      oneQuestionAtATime: false,
      status: "attempted",
      score: 32,
      questions: [
        {
          id: 1,
          text: "What was the immediate trigger that started World War II?",
          type: "mcq",
          options: [
            {
              id: 1,
              text: "Assassination of Archduke Franz Ferdinand",
              isCorrect: false,
            },
            { id: 2, text: "German invasion of Poland", isCorrect: true },
            { id: 3, text: "The Great Depression", isCorrect: false },
            { id: 4, text: "Russian Revolution", isCorrect: false },
          ],
          marks: 2,
        },
        {
          id: 2,
          text: "Describe the policy of appeasement and explain why it failed to prevent World War II.",
          type: "long",
          marks: 8,
        },
      ],
    },
    {
      id: "a789",
      title: "World War II: Causes and Consequences",
      description:
        "An in-depth analysis of the major causes, key events, and lasting impacts of World War II on global politics and society.",
      subject: "History",
      className: "Class 10",
      section: "C",
      dueDate: "2025-05-18T23:59:59",
      startDate: "2025-05-01T10:00:00",
      endDate: "2025-05-18T23:59:59",
      duration: 90,
      totalMarks: 40,
      passingScore: 20,
      showMarks: true,
      showTimer: true,
      showProgressIndicator: true,
      oneQuestionAtATime: false,
      status: "attempted",
      score: 32,
      questions: [
        {
          id: 1,
          text: "What was the immediate trigger that started World War II?",
          type: "mcq",
          options: [
            {
              id: 1,
              text: "Assassination of Archduke Franz Ferdinand",
              isCorrect: false,
            },
            { id: 2, text: "German invasion of Poland", isCorrect: true },
            { id: 3, text: "The Great Depression", isCorrect: false },
            { id: 4, text: "Russian Revolution", isCorrect: false },
          ],
          marks: 2,
        },
        {
          id: 2,
          text: "Describe the policy of appeasement and explain why it failed to prevent World War II.",
          type: "long",
          marks: 8,
        },
      ],
    },
    {
      id: "a101",
      title: "Python Programming Fundamentals",
      description:
        "Test your understanding of Python programming basics including variables, data types, control structures, and functions.",
      subject: "Computer Science",
      className: "Class 11",
      section: "A",
      dueDate: "2025-04-25T23:59:59",
      startDate: "2025-04-20T08:00:00",
      endDate: "2025-04-25T23:59:59",
      duration: 75,
      totalMarks: 50,
      passingScore: 25,
      showMarks: true,
      showTimer: true,
      showProgressIndicator: true,
      oneQuestionAtATime: true,
      status: "completed",
      score: 42,
      questions: [
        {
          id: 1,
          text: "What is the output of the following code: print(3 * 'abc')?",
          type: "mcq",
          options: [
            { id: 1, text: "9", isCorrect: false },
            { id: 2, text: "abc3", isCorrect: false },
            { id: 3, text: "abcabcabc", isCorrect: true },
            { id: 4, text: "Error", isCorrect: false },
          ],
          marks: 2,
        },
      ],
    },
  ]);

  // States
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [savedAnswers, setSavedAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(0); // Initialize to 0, will be set when quiz is selected
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentTab, setCurrentTab] = useState("upcoming"); // upcoming or attempted

  // Added state for Navbar interaction
  const [navExpanded, setNavExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Update current time every minute to check quiz availability
  const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(getCurrentDateTime());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Added effect for mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filter quizzes by upcoming and attempted
  const upcomingQuizzes = quizzes.filter(
    (quiz) =>
      quiz.status === "upcoming" ||
      (quiz.status !== "completed" && quiz.status !== "attempted")
  );

  const attemptedQuizzes = quizzes.filter(
    (quiz) =>
      quiz.status === "attempted" || quiz.status === "completed"
  );

  // Timer effect
  useEffect(() => {
    if (!started || isSubmitted || !activeQuiz) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, isSubmitted, activeQuiz]);

  // Handle answer changes
  const handleAnswerChange = (questionId, value, optionId = null) => {
    if (!activeQuiz) return;

    const question = activeQuiz.questions.find(
      (q) => q.id === questionId
    );

    if (question.type === "mcq") {
      setAnswers({
        ...answers,
        [questionId]: optionId,
      });
    } else {
      setAnswers({
        ...answers,
        [questionId]: value,
      });
    }
  };

  // Handle saving an answer
  const handleSaveAnswer = (questionId) => {
    if (answers[questionId] !== undefined) {
      setSavedAnswers({
        ...savedAnswers,
        [questionId]: answers[questionId],
      });
    }
  };

  // Handle marking a question for review
  const handleMarkForReview = (questionId) => {
    if (markedForReview.includes(questionId)) {
      setMarkedForReview(markedForReview.filter((id) => id !== questionId));
    } else {
      setMarkedForReview([...markedForReview, questionId]);
    }
  };

  // Navigate questions
  const goToNextQuestion = () => {
    if (!activeQuiz) return;

    if (currentQuestion < activeQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goToQuestion = (index) => {
    if (!activeQuiz) return;

    if (index >= 0 && index < activeQuiz.questions.length) {
      setCurrentQuestion(index);
    }
  };

  // Handle selecting a quiz
  const handleSelectQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setTimeRemaining(quiz.duration * 60);
    // Reset states
    setAnswers({});
    setSavedAnswers({});
    setMarkedForReview([]);
    setCurrentQuestion(0);
    return null; // Return null if no active quiz or not started
  };

  // Handle start
  const handleStart = () => {
    if (activeQuiz && isQuizAvailable(activeQuiz)) {
      setStarted(true);
    }
  };

  // Handle submit
  const handleSubmit = () => {
    setIsSubmitted(true);
    // In a real app, would send only savedAnswers to the server
    console.log("Submitted answers:", savedAnswers);
  };

  // Get question status (answered, saved, marked for review)
  const getQuestionStatus = (questionId) => {
    const isAnswered = answers[questionId] !== undefined;
    const isSaved = savedAnswers[questionId] !== undefined;
    const isMarkedForReview = markedForReview.includes(questionId);

    return { isAnswered, isSaved, isMarkedForReview };
  };

  // Reset quiz state
  const resetQuiz = () => {
    setActiveQuiz(null);
    setStarted(false);
    setIsSubmitted(false);
    setAnswers({});
    setSavedAnswers({});
    setMarkedForReview([]);
  };

  return (
    <div className="bg-gray-100 p-10">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400 rounded-4xl">
        <div className="p-4 md:p-8">
          {!activeQuiz ? (
            <QuizList
              upcomingQuizzes={upcomingQuizzes}
              attemptedQuizzes={attemptedQuizzes}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              handleSelectQuiz={handleSelectQuiz}
            />
          ) : !started ? (
            <WelcomeScreen
              activeQuiz={activeQuiz}
              setActiveQuiz={setActiveQuiz}
              handleStart={handleStart}
            />
          ) : isSubmitted ? (
            <SubmittedScreen
              activeQuiz={activeQuiz}
              timeRemaining={timeRemaining}
              savedAnswers={savedAnswers}
              resetQuiz={resetQuiz}
            />
          ) : (
            <QuestionsScreen
              activeQuiz={activeQuiz}
              currentQuestion={currentQuestion}
              answers={answers}
              savedAnswers={savedAnswers}
              markedForReview={markedForReview}
              timeRemaining={timeRemaining}
              handleAnswerChange={handleAnswerChange}
              handleSaveAnswer={handleSaveAnswer}
              handleMarkForReview={handleMarkForReview}
              goToPrevQuestion={goToPrevQuestion}
              goToNextQuestion={goToNextQuestion}
              goToQuestion={goToQuestion}
              getQuestionStatus={getQuestionStatus}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentQuizInterface;