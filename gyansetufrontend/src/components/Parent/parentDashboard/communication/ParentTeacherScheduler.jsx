import React, { useState, useRef, useCallback } from "react";
import {
  Calendar,
  Clock,
  User,
  MessageSquare,
  CheckCircle,
  Bell,
  Send,
  X,
} from "lucide-react";
import {
  IoMoonOutline,
  IoSunnyOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { useTheme } from "../../../../context/ThemeContext"; // Import the theme hook

const ParentTeacherMeeting = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [meetingType, setMeetingType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  // Add ref for textarea to prevent scroll issues
  const textareaRef = useRef(null);

  // Use the theme context instead of local state
  const { darkMode, toggleTheme } = useTheme();

  // Mock data - replace with actual API calls
  const teachers = [
    {
      id: 1,
      name: "Mrs. Priya Sharma",
      subject: "Mathematics",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 2,
      name: "Mr. Rajesh Kumar",
      subject: "Science",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 3,
      name: "Ms. Anita Singh",
      subject: "English",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 4,
      name: "Mr. Vikram Patel",
      subject: "Social Studies",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 5,
      name: "Mrs. Deepika Gupta",
      subject: "Hindi",
      avatar: "/api/placeholder/40/40",
    },
  ];

  const principal = {
    id: "principal",
    name: "Dr. Sunita Verma",
    role: "Principal",
    avatar: "/api/placeholder/40/40",
  };

  const upcomingMeetings = [
    {
      id: 1,
      teacher: "Mrs. Priya Sharma",
      subject: "Mathematics",
      date: "2025-05-26",
      time: "10:00 AM",
      status: "confirmed",
      type: "Academic Discussion",
    },
    {
      id: 2,
      teacher: "Mr. Rajesh Kumar",
      subject: "Science",
      date: "2025-05-28",
      time: "2:30 PM",
      status: "pending",
      type: "Progress Review",
    },
  ];

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
  ];

  // Fix the message change handler to prevent scrolling
  const handleMessageChange = useCallback((e) => {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    setMessage(e.target.value);

    // Prevent scroll jump by maintaining scroll position
    requestAnimationFrame(() => {
      window.scrollTo(0, currentScrollTop);
    });
  }, []);

  const handleSubmitRequest = () => {
    // Here you would make API call to submit meeting request
    if (!selectedTeacher || !meetingType || !selectedDate || !selectedTime) {
      return; // Validation check
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Reset form
      setSelectedTeacher("");
      setMeetingType("");
      setSelectedDate("");
      setSelectedTime("");
      setMessage("");
    }, 2000);
  };

  const handleProfileClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setProfileImage(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  const ScheduleMeetingForm = () => (
    <div
      className={`${
        darkMode ? "bg-[#100e10]" : "bg-white"
      } rounded-lg shadow-md p-4
       md:p-6 transition-colors duration-300 w-full max-w-full`}
    >
      <h2
        className={`text-xl md:text-2xl font-bold ${
          darkMode ? "text-white" : "text-gray-800"
        } mb-4 md:mb-6 flex items-center transition-colors duration-300 justify-center md:justify-start`}
      >
        <Calendar
          className={`mr-3 ${darkMode ? "text-purple-400" : "text-blue-600"}`}
        />
        Schedule Meeting Request
      </h2>

      <div className="space-y-6">
        {/* Teacher/Principal Selection */}
        <div>
          <label
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } mb-3 transition-colors duration-300`}
          >
            Select Teacher or Principal
          </label>

          {/* Principal Option */}
          <div className="mb-4">
            <div
              className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                selectedTeacher === "principal"
                  ? darkMode
                    ? "border-purple-400 bg-[#341b47]"
                    : "border-blue-500 bg-blue-50"
                  : darkMode
                  ? "border-gray-600 hover:border-gray-500 bg-[#2a0c2e]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedTeacher("principal")}
            >
              <img
                src={principal.avatar}
                alt={principal.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p
                  className={`font-semibold ${
                    darkMode ? "text-white" : "text-gray-800"
                  } transition-colors duration-300`}
                >
                  {principal.name}
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } transition-colors duration-300`}
                >
                  {principal.role}
                </p>
              </div>
            </div>
          </div>

          {/* Teachers List */}
          <div>
            <p
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-600"
              } mb-3 transition-colors duration-300`}
            >
              Subject Teachers:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className={`flex items-center p-2 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedTeacher === teacher.id
                      ? darkMode
                        ? "border-purple-400 bg-[#341b47]"
                        : "border-blue-500 bg-blue-50"
                      : darkMode
                      ? "border-gray-600 hover:border-gray-500 bg-[#2a0c2e]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedTeacher(teacher.id)}
                >
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-semibold text-xs sm:text-sm truncate transition-colors duration-300 ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {teacher.name}
                    </p>
                    <p
                      className={`text-xs transition-colors duration-300 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {teacher.subject}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Meeting Type */}
        <div>
          <label
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } mb-2 transition-colors duration-300`}
          >
            Purpose of Meeting
          </label>
          <select
            value={meetingType}
            onChange={(e) => setMeetingType(e.target.value)}
            className={`w-full p-3 border rounded-lg transition-all duration-300 ${
              darkMode
                ? "border-gray-600 bg-[#2a0c2e] text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                : "border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            }`}
            required
          >
            <option value="">Select meeting purpose</option>
            <option value="academic-progress">
              Academic Progress Discussion
            </option>
            <option value="behavioral-concern">Behavioral Concerns</option>
            <option value="homework-support">Homework & Study Support</option>
            <option value="exam-preparation">Exam Preparation Strategy</option>
            <option value="extracurricular">Extracurricular Activities</option>
            <option value="general-consultation">General Consultation</option>
          </select>
        </div>

        {/* Date Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } mb-2 transition-colors duration-300`}
            >
              Preferred Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className={`w-full p-3 border rounded-lg transition-all duration-300 ${
                darkMode
                  ? "border-gray-600 bg-[#2a0c2e] text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  : "border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              }`}
              required
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } mb-2 transition-colors duration-300`}
            >
              Preferred Time
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className={`w-full p-3 border rounded-lg transition-all duration-300 ${
                darkMode
                  ? "border-gray-600 bg-[#2a0c2e] text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  : "border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              }`}
              required
            >
              <option value="">Select time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmitRequest}
          disabled={
            !selectedTeacher || !meetingType || !selectedDate || !selectedTime
          }
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center ${
            !selectedTeacher || !meetingType || !selectedDate || !selectedTime
              ? "bg-gray-400 cursor-not-allowed"
              : darkMode
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <Send className="mr-2 h-4 w-4" />
          Send Meeting Request
        </button>
      </div>
    </div>
  );

  const UpcomingMeetings = () => (
    <div
      className={`${
        darkMode ? "bg-[#100e10]" : "bg-white"
      } rounded-lg shadow-md p-4 md:p-6 transition-colors duration-300 w-full max-w-full`}
    >
      <h2
        className={`text-xl md:text-2xl font-bold ${
          darkMode ? "text-white" : "text-gray-800"
        } mb-4 md:mb-6 flex items-center transition-colors duration-300 justify-center md:justify-start`}
      >
        <Clock
          className={`mr-3 ${darkMode ? "text-green-400" : "text-green-600"}`}
        />
        Upcoming Meetings
      </h2>

      {upcomingMeetings.length === 0 ? (
        <div className="text-center py-8">
          <Calendar
            className={`mx-auto h-12 w-12 ${
              darkMode ? "text-gray-600" : "text-gray-400"
            } mb-4 transition-colors duration-300`}
          />
          <p
            className={`${
              darkMode ? "text-gray-400" : "text-gray-500"
            } transition-colors duration-300`}
          >
            No upcoming meetings scheduled
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className={`border rounded-lg p-4 transition-all duration-300 ${
                darkMode
                  ? "border-gray-600 bg-[#2a0c2e] hover:shadow-lg hover:shadow-purple-500/20"
                  : "border-gray-200 bg-white hover:shadow-md"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <User
                      className={`h-10 w-10 ${
                        darkMode
                          ? "text-gray-400 bg-[#341b47]"
                          : "text-gray-400 bg-gray-100"
                      } rounded-full p-2 transition-colors duration-300`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${
                        darkMode ? "text-white" : "text-gray-800"
                      } transition-colors duration-300`}
                    >
                      {meeting.teacher}
                    </h3>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      } transition-colors duration-300`}
                    >
                      {meeting.subject}
                    </p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-500" : "text-gray-500"
                      } mt-1 transition-colors duration-300`}
                    >
                      {meeting.type}
                    </p>

                    <div
                      className={`flex items-center mt-2 space-x-4 text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      } transition-colors duration-300`}
                    >
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(meeting.date).toLocaleDateString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {meeting.time}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {meeting.status === "confirmed" ? (
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        darkMode
                          ? "bg-green-900 text-green-300"
                          : "bg-green-100 text-green-800"
                      } transition-colors duration-300`}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Confirmed
                    </span>
                  ) : (
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        darkMode
                          ? "bg-yellow-900 text-yellow-300"
                          : "bg-yellow-100 text-yellow-800"
                      } transition-colors duration-300`}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      Pending
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-[#5b3a64]" : "bg-gray-100"
      } pt-10 pr-10 pb-10 pl-10 md:pl-0`}
      style={{
        scrollBehavior: "smooth",
        overflowX: "hidden",
      }}
    >
      <div
        className={`${
          darkMode
            ? "bg-gradient-to-br from-[#100e10] via-[#5b3a64] to-[#2a0c2e]"
            : "bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400"
        } rounded-[30px] min-h-screen p-1 pl-6 transition-colors duration-300 mx-auto max-w-full`}
      >
        {/* Header */}
        <div className="mb-8 pt-6 pr-6 relative">
          {/* Main header content */}
          <div className="pr-24">
            {" "}
            {/* Add right padding to prevent overlap with icons */}
            <h1
              className={`text-2xl md:text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              } mb-2 transition-colors duration-300`}
            >
              Parent-Teacher Communication
            </h1>
            <p
              className={`${
                darkMode ? "text-gray-300" : "text-gray-600"
              } transition-colors duration-300 text-sm md:text-base`}
            >
              Schedule meetings with your child's teachers or principal to
              discuss academic progress and concerns.
            </p>
          </div>

          {/* Utility Icons - positioned absolutely in top right */}
          <div className="absolute top-6 right-6 flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                darkMode
                  ? "hover:bg-[#341b47] text-white"
                  : "hover:bg-violet-200 text-violet-700"
              } transition-colors duration-300`}
            >
              {darkMode ? (
                <IoSunnyOutline className="text-xl" />
              ) : (
                <IoMoonOutline className="text-xl" />
              )}
            </button>
            <button
              onClick={handleProfileClick}
              className={`p-2 rounded-full ${
                darkMode
                  ? "hover:bg-[#341b47] text-white"
                  : "hover:bg-violet-200 text-violet-700"
              } transition-colors duration-300`}
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <IoPersonCircleOutline className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div
          className={`flex space-x-1 ${
            darkMode ? "bg-[#2a0c2e]" : "bg-gray-100"
          } p-1 rounded-lg mb-6 mr-6 ml-0 md:ml-0 transition-colors duration-300`}
        >
          <button
            onClick={() => setActiveTab("schedule")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300 ${
              activeTab === "schedule"
                ? darkMode
                  ? "bg-[#341b47] text-purple-300 shadow-sm"
                  : "bg-white text-blue-600 shadow-sm"
                : darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <MessageSquare className="inline h-4 w-4 mr-2" />
            Schedule Meeting
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300 ${
              activeTab === "upcoming"
                ? darkMode
                  ? "bg-[#341b47] text-purple-300 shadow-sm"
                  : "bg-white text-blue-600 shadow-sm"
                : darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Bell className="inline h-4 w-4 mr-2" />
            Upcoming Meetings
          </button>
        </div>

        {/* Content */}
        <div className="mr-6 ml-0 md:ml-0">
          {activeTab === "schedule" ? (
            <ScheduleMeetingForm />
          ) : (
            <UpcomingMeetings />
          )}
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              className={`${
                darkMode ? "bg-[#100e10]" : "bg-white"
              } rounded-lg p-6 max-w-sm mx-4 transition-colors duration-300`}
            >
              <div className="text-center">
                <CheckCircle
                  className={`mx-auto h-12 w-12 ${
                    darkMode ? "text-green-400" : "text-green-500"
                  } mb-4 transition-colors duration-300`}
                />
                <h3
                  className={`text-lg font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  } mb-2 transition-colors duration-300`}
                >
                  Request Sent!
                </h3>
                <p
                  className={`${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  } mb-4 transition-colors duration-300`}
                >
                  Your meeting request has been sent successfully. You'll
                  receive a notification once it's confirmed.
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className={`${
                    darkMode
                      ? "bg-green-700 hover:bg-green-800"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white px-4 py-2 rounded-lg transition-colors duration-300`}
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentTeacherMeeting;
