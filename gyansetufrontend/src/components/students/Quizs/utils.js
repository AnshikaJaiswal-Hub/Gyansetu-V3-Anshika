// Format time in hours, minutes, and seconds
export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours > 0 ? `${hours}h ` : ""}${
    minutes > 0 ? `${minutes}m ` : ""
  }${remainingSeconds}s`;
};

// Format date string for display
export const formatDateTimeRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startDateStr = start.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const startTimeStr = start.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endDateStr = end.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const endTimeStr = end.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (startDateStr === endDateStr) {
    return `${startDateStr} (${startTimeStr} - ${endTimeStr})`;
  } else {
    return `${startDateStr} ${startTimeStr} - ${endDateStr} ${endTimeStr}`;
  }
};

// Format due date
export const formatDueDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Get current date and time
export const getCurrentDateTime = () => {
  return new Date();
};

// Check if quiz is available for taking based on scheduled time
export const isQuizAvailable = (quiz) => {
  const currentDateTime = getCurrentDateTime();
  const startDateTime = new Date(quiz.startDate);
  const endDateTime = new Date(quiz.endDate);

  return currentDateTime >= startDateTime && currentDateTime <= endDateTime;
};

// Subject colors for assignment cards
export const subjectColors = {
  default: "bg-white", // Default color
};