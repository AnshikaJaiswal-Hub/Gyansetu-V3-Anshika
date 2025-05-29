import React, { useState, useRef, useCallback } from "react";
import {
  Calendar,
  Clock,
  User,
  MessageSquare,
  CheckCircle,
  Bell,
  Check,
  X,
  Eye,
  UserCheck,
  AlertCircle,
  Moon,
  Sun,
  UserCircle,
} from "lucide-react";

const TeacherMeetingManager = () => {
  // Mock theme context - replace with actual theme hook
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);

  const [activeTab, setActiveTab] = useState("requests");
  const [profileImage, setProfileImage] = useState(null);
  const [showRequestDetails, setShowRequestDetails] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseType, setResponseType] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // Create Meeting Form States
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingReason, setMeetingReason] = useState("");
  const [messageToParent, setMessageToParent] = useState("");
  const [selectedParentInfo, setSelectedParentInfo] = useState(null);
  const [showCreateSuccess, setShowCreateSuccess] = useState(false);

  // Mock teacher data - replace with actual teacher context
  const teacherInfo = {
    id: 1,
    name: "Mrs. Priya Sharma",
    subject: "Mathematics",
    avatar: "/api/placeholder/40/40",
  };

  // Mock classes data
  const classesData = {
    8: {
      sections: ["A", "B", "C"],
      students: {
        A: [
          {
            id: 1,
            name: "Rahul Kumar",
            rollNumber: "15",
            parentName: "Mr. Amit Kumar",
            parentContact: "+91 98765 43210",
            parentEmail: "amit.kumar@email.com",
          },
          {
            id: 2,
            name: "Priya Patel",
            rollNumber: "08",
            parentName: "Mrs. Sunita Patel",
            parentContact: "+91 98765 43211",
            parentEmail: "sunita.patel@email.com",
          },
          {
            id: 3,
            name: "Arjun Singh",
            rollNumber: "05",
            parentName: "Mrs. Deepika Singh",
            parentContact: "+91 98765 43213",
            parentEmail: "deepika.singh@email.com",
          },
        ],
        B: [
          {
            id: 4,
            name: "Aarav Gupta",
            rollNumber: "22",
            parentName: "Dr. Rajesh Gupta",
            parentContact: "+91 98765 43212",
            parentEmail: "rajesh.gupta@email.com",
          },
          {
            id: 5,
            name: "Kavya Sharma",
            rollNumber: "18",
            parentName: "Mr. Vikash Sharma",
            parentContact: "+91 98765 43214",
            parentEmail: "vikash.sharma@email.com",
          },
          {
            id: 6,
            name: "Riya Agarwal",
            rollNumber: "12",
            parentName: "Mrs. Meera Agarwal",
            parentContact: "+91 98765 43215",
            parentEmail: "meera.agarwal@email.com",
          },
        ],
        C: [
          {
            id: 7,
            name: "Dev Malhotra",
            rollNumber: "03",
            parentName: "Mr. Suresh Malhotra",
            parentContact: "+91 98765 43216",
            parentEmail: "suresh.malhotra@email.com",
          },
          {
            id: 8,
            name: "Anaya Joshi",
            rollNumber: "20",
            parentName: "Mrs. Pooja Joshi",
            parentContact: "+91 98765 43217",
            parentEmail: "pooja.joshi@email.com",
          },
        ],
      },
    },
    9: {
      sections: ["A", "B"],
      students: {
        A: [
          {
            id: 9,
            name: "Ishaan Verma",
            rollNumber: "11",
            parentName: "Mr. Rohit Verma",
            parentContact: "+91 98765 43218",
            parentEmail: "rohit.verma@email.com",
          },
          {
            id: 10,
            name: "Sneha Reddy",
            rollNumber: "07",
            parentName: "Mrs. Lakshmi Reddy",
            parentContact: "+91 98765 43219",
            parentEmail: "lakshmi.reddy@email.com",
          },
        ],
        B: [
          {
            id: 11,
            name: "Karthik Nair",
            rollNumber: "14",
            parentName: "Mr. Sunil Nair",
            parentContact: "+91 98765 43220",
            parentEmail: "sunil.nair@email.com",
          },
          {
            id: 12,
            name: "Diya Kapoor",
            rollNumber: "09",
            parentName: "Mrs. Nisha Kapoor",
            parentContact: "+91 98765 43221",
            parentEmail: "nisha.kapoor@email.com",
          },
        ],
      },
    },
  };

  // Available time slots
  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
  ];

  // Meeting reasons/purposes
  const meetingReasons = [
    "Academic Progress Discussion",
    "Homework & Study Support",
    "Exam Preparation Strategy",
    "Behavioral Concerns",
    "General Consultation",
    "Subject-specific Guidance",
    "Parent-Teacher Conference",
    "Student Performance Review",
    "Learning Difficulties",
    "Extracurricular Activities",
    "Career Guidance",
    "Other",
  ];

  // Handle class selection
  const handleClassChange = (classValue) => {
    setSelectedClass(classValue);
    setSelectedSection("");
    setSelectedStudent("");
    setSelectedParentInfo(null);
  };

  // Handle section selection
  const handleSectionChange = (sectionValue) => {
    setSelectedSection(sectionValue);
    setSelectedStudent("");
    setSelectedParentInfo(null);
  };

  // Handle student selection
  const handleStudentSelection = (studentId) => {
    setSelectedStudent(studentId);

    if (selectedClass && selectedSection && studentId) {
      const student = classesData[selectedClass].students[selectedSection].find(
        (s) => s.id.toString() === studentId
      );
      if (student) {
        setSelectedParentInfo({
          parentName: student.parentName,
          parentContact: student.parentContact,
          parentEmail: student.parentEmail,
        });
      }
    }
  };

  // Handle meeting creation
  const handleCreateMeeting = () => {
    if (
      !selectedClass ||
      !selectedSection ||
      !selectedStudent ||
      !meetingDate ||
      !meetingTime ||
      !meetingReason
    ) {
      return;
    }

    const student = classesData[selectedClass].students[selectedSection].find(
      (s) => s.id.toString() === selectedStudent
    );

    if (student) {
      const newMeeting = {
        id: Date.now(),
        parentName: student.parentName,
        studentName: student.name,
        class: `${selectedClass}-${selectedSection}`,
        rollNumber: student.rollNumber,
        date: meetingDate,
        time: meetingTime,
        meetingType: meetingReason,
        status: "confirmed",
        notes: messageToParent || `Meeting scheduled by ${teacherInfo.name}`,
      };

      setConfirmedMeetings((prev) => [...prev, newMeeting]);

      // Reset form
      setSelectedClass("");
      setSelectedSection("");
      setSelectedStudent("");
      setMeetingDate("");
      setMeetingTime("");
      setMeetingReason("");
      setMessageToParent("");
      setSelectedParentInfo(null);

      // Show success message
      setShowCreateSuccess(true);
      setTimeout(() => {
        setShowCreateSuccess(false);
      }, 3000);
    }
  };

  // Mock meeting requests data
  const [meetingRequests, setMeetingRequests] = useState([
    {
      id: 1,
      parentName: "Mr. Amit Kumar",
      studentName: "Rahul Kumar",
      class: "8-A",
      rollNumber: "15",
      requestDate: "2025-05-23",
      preferredDate: "2025-05-26",
      preferredTime: "10:00 AM",
      meetingType: "Academic Progress Discussion",
      message:
        "I would like to discuss Rahul's performance in recent mathematics tests and get guidance on how to help him improve.",
      status: "pending",
      priority: "high",
      parentContact: "+91 98765 43210",
      parentEmail: "amit.kumar@email.com",
    },
    {
      id: 2,
      parentName: "Mrs. Sunita Patel",
      studentName: "Priya Patel",
      class: "8-A",
      rollNumber: "08",
      requestDate: "2025-05-22",
      preferredDate: "2025-05-28",
      preferredTime: "2:30 PM",
      meetingType: "Homework & Study Support",
      message:
        "Priya is struggling with homework completion. I need strategies to help her manage her study time better.",
      status: "pending",
      priority: "medium",
      parentContact: "+91 98765 43211",
      parentEmail: "sunita.patel@email.com",
    },
    {
      id: 3,
      parentName: "Dr. Rajesh Gupta",
      studentName: "Aarav Gupta",
      class: "8-B",
      rollNumber: "22",
      requestDate: "2025-05-21",
      preferredDate: "2025-05-30",
      preferredTime: "4:00 PM",
      meetingType: "Exam Preparation Strategy",
      message:
        "With upcoming exams, I want to understand Aarav's preparation level and areas that need more focus.",
      status: "pending",
      priority: "high",
      parentContact: "+91 98765 43212",
      parentEmail: "rajesh.gupta@email.com",
    },
  ]);

  // Mock confirmed meetings
  const [confirmedMeetings, setConfirmedMeetings] = useState([
    {
      id: 4,
      parentName: "Mrs. Deepika Singh",
      studentName: "Arjun Singh",
      class: "8-A",
      rollNumber: "05",
      date: "2025-05-25",
      time: "11:00 AM",
      meetingType: "Behavioral Concerns",
      status: "confirmed",
      notes: "Discuss Arjun's classroom participation and social interaction.",
    },
    {
      id: 5,
      parentName: "Mr. Vikash Sharma",
      studentName: "Kavya Sharma",
      class: "8-B",
      rollNumber: "18",
      date: "2025-05-27",
      time: "3:00 PM",
      meetingType: "General Consultation",
      status: "confirmed",
      notes: "Regular progress review and parent feedback session.",
    },
  ]);

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

  const handleRequestResponse = (requestId, action) => {
    setMeetingRequests((prev) =>
      prev.map((request) =>
        request.id === requestId ? { ...request, status: action } : request
      )
    );

    if (action === "approved") {
      const approvedRequest = meetingRequests.find((r) => r.id === requestId);
      if (approvedRequest) {
        const newMeeting = {
          id: Date.now(),
          parentName: approvedRequest.parentName,
          studentName: approvedRequest.studentName,
          class: approvedRequest.class,
          rollNumber: approvedRequest.rollNumber,
          date: approvedRequest.preferredDate,
          time: approvedRequest.preferredTime,
          meetingType: approvedRequest.meetingType,
          status: "confirmed",
          notes: approvedRequest.message,
        };
        setConfirmedMeetings((prev) => [...prev, newMeeting]);
      }
    }

    setResponseType(action);
    setShowResponseModal(true);
    setTimeout(() => {
      setShowResponseModal(false);
      setShowRequestDetails(null);
    }, 2000);
  };

  const CreateMeetingForm = () => (
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
        <Calendar
          className={`mr-3 ${darkMode ? "text-purple-400" : "text-blue-600"}`}
        />
        Create New Meeting
      </h2>

      <div className="space-y-6">
        {/* Class and Section Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } mb-2 transition-colors duration-300`}
            >
              Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
              className={`w-full p-3 border rounded-lg transition-all duration-300 ${
                darkMode
                  ? "border-gray-600 bg-[#2a0c2e] text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  : "border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              }`}
              required
            >
              <option value="">Select Class</option>
              {Object.keys(classesData).map((classNum) => (
                <option key={classNum} value={classNum}>
                  Class {classNum}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } mb-2 transition-colors duration-300`}
            >
              Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => handleSectionChange(e.target.value)}
              disabled={!selectedClass}
              className={`w-full p-3 border rounded-lg transition-all duration-300 ${
                !selectedClass ? "opacity-50 cursor-not-allowed" : ""
              } ${
                darkMode
                  ? "border-gray-600 bg-[#2a0c2e] text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  : "border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              }`}
              required
            >
              <option value="">Select Section</option>
              {selectedClass &&
                classesData[selectedClass].sections.map((section) => (
                  <option key={section} value={section}>
                    Section {section}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Student Selection */}
        <div>
          <label
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } mb-2 transition-colors duration-300`}
          >
            Student Name
          </label>
          <select
            value={selectedStudent}
            onChange={(e) => handleStudentSelection(e.target.value)}
            disabled={!selectedClass || !selectedSection}
            className={`w-full p-3 border rounded-lg transition-all duration-300 ${
              !selectedClass || !selectedSection
                ? "opacity-50 cursor-not-allowed"
                : ""
            } ${
              darkMode
                ? "border-gray-600 bg-[#2a0c2e] text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                : "border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            }`}
            required
          >
            <option value="">Select Student</option>
            {selectedClass &&
              selectedSection &&
              classesData[selectedClass].students[selectedSection].map(
                (student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} (Roll #{student.rollNumber})
                  </option>
                )
              )}
          </select>
        </div>

        {/* Parent Information Display */}
        {selectedParentInfo && (
          <div
            className={`${
              darkMode ? "bg-[#2a0c2e]" : "bg-gray-50"
            } rounded-lg p-4 transition-colors duration-300`}
          >
            <h4
              className={`font-semibold ${
                darkMode ? "text-white" : "text-gray-800"
              } mb-3 transition-colors duration-300`}
            >
              Parent Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } transition-colors duration-300`}
                >
                  Parent Name:
                </span>
                <p
                  className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-800"
                  } transition-colors duration-300`}
                >
                  {selectedParentInfo.parentName}
                </p>
              </div>
              <div>
                <span
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } transition-colors duration-300`}
                >
                  Contact:
                </span>
                <p
                  className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-800"
                  } transition-colors duration-300`}
                >
                  {selectedParentInfo.parentContact}
                </p>
              </div>
              <div className="md:col-span-2">
                <span
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } transition-colors duration-300`}
                >
                  Email:
                </span>
                <p
                  className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-800"
                  } transition-colors duration-300`}
                >
                  {selectedParentInfo.parentEmail}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Meeting Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } mb-2 transition-colors duration-300`}
            >
              Meeting Date
            </label>
            <input
              type="date"
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
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
              Meeting Time
            </label>
            <select
              value={meetingTime}
              onChange={(e) => setMeetingTime(e.target.value)}
              className={`w-full p-3 border rounded-lg transition-all duration-300 ${
                darkMode
                  ? "border-gray-600 bg-[#2a0c2e] text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  : "border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              }`}
              required
            >
              <option value="">Select Time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Meeting Reason */}
        <div>
          <label
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } mb-2 transition-colors duration-300`}
          >
            Meeting Purpose
          </label>
          <select
            value={meetingReason}
            onChange={(e) => setMeetingReason(e.target.value)}
            className={`w-full p-3 border rounded-lg transition-all duration-300 ${
              darkMode
                ? "border-gray-600 bg-[#2a0c2e] text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                : "border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            }`}
            required
          >
            <option value="">Select meeting purpose</option>
            {meetingReasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </div>

        {/* Optional Message to Parent */}
        <div>
          <label
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } mb-2 transition-colors duration-300`}
          >
            Message to Parent (Optional)
          </label>
          <textarea
            value={messageToParent}
            onChange={(e) => setMessageToParent(e.target.value)}
            rows={4}
            placeholder="Write a message to the parent about the meeting purpose or any specific points to discuss..."
            className={`w-full p-3 border rounded-lg transition-all duration-300 resize-none ${
              darkMode
                ? "border-gray-600 bg-[#2a0c2e] text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                : "border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            }`}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleCreateMeeting}
          disabled={
            !selectedClass ||
            !selectedSection ||
            !selectedStudent ||
            !meetingDate ||
            !meetingTime ||
            !meetingReason
          }
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center ${
            !selectedClass ||
            !selectedSection ||
            !selectedStudent ||
            !meetingDate ||
            !meetingTime ||
            !meetingReason
              ? "bg-gray-400 cursor-not-allowed"
              : darkMode
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Meeting
        </button>
      </div>
    </div>
  );

  const getPriorityColor = (priority) => {
    if (priority === "high") {
      return darkMode ? "text-red-400" : "text-red-600";
    } else if (priority === "medium") {
      return darkMode ? "text-yellow-400" : "text-yellow-600";
    }
    return darkMode ? "text-green-400" : "text-green-600";
  };

  const RequestDetailsModal = ({ request }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`${
          darkMode ? "bg-[#100e10]" : "bg-white"
        } rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-300`}
      >
        <div className="flex justify-between items-start mb-6">
          <h3
            className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            } transition-colors duration-300`}
          >
            Meeting Request Details
          </h3>
          <button
            onClick={() => setShowRequestDetails(null)}
            className={`p-2 rounded-full ${
              darkMode
                ? "hover:bg-[#341b47] text-gray-400"
                : "hover:bg-gray-100 text-gray-600"
            } transition-colors duration-300`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Student Info */}
          <div
            className={`${
              darkMode ? "bg-[#2a0c2e]" : "bg-gray-50"
            } rounded-lg p-4 transition-colors duration-300`}
          >
            <h4
              className={`font-semibold ${
                darkMode ? "text-white" : "text-gray-800"
              } mb-3 transition-colors duration-300`}
            >
              Student Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } transition-colors duration-300`}
                >
                  Student Name:
                </span>
                <p
                  className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-800"
                  } transition-colors duration-300`}
                >
                  {request.studentName}
                </p>
              </div>
              <div>
                <span
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } transition-colors duration-300`}
                >
                  Class & Roll No:
                </span>
                <p
                  className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-800"
                  } transition-colors duration-300`}
                >
                  {request.class} - Roll #{request.rollNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Parent Info */}
          <div
            className={`${
              darkMode ? "bg-[#2a0c2e]" : "bg-gray-50"
            } rounded-lg p-4 transition-colors duration-300`}
          >
            <h4
              className={`font-semibold ${
                darkMode ? "text-white" : "text-gray-800"
              } mb-3 transition-colors duration-300`}
            >
              Parent Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } transition-colors duration-300`}
                >
                  Parent Name:
                </span>
                <p
                  className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-800"
                  } transition-colors duration-300`}
                >
                  {request.parentName}
                </p>
              </div>
              <div>
                <span
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } transition-colors duration-300`}
                >
                  Contact:
                </span>
                <p
                  className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-800"
                  } transition-colors duration-300`}
                >
                  {request.parentContact}
                </p>
              </div>
              <div className="md:col-span-2">
                <span
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } transition-colors duration-300`}
                >
                  Email:
                </span>
                <p
                  className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-800"
                  } transition-colors duration-300`}
                >
                  {request.parentEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Meeting Details */}
          <div
            className={`${
              darkMode ? "bg-[#2a0c2e]" : "bg-gray-50"
            } rounded-lg p-4 transition-colors duration-300`}
          >
            <h4
              className={`font-semibold ${
                darkMode ? "text-white" : "text-gray-800"
              } mb-3 transition-colors duration-300`}
            >
              Meeting Details
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <span
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } transition-colors duration-300`}
                >
                  Purpose:
                </span>
                <p
                  className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-800"
                  } transition-colors duration-300`}
                >
                  {request.meetingType}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span
                    className={`${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    } transition-colors duration-300`}
                  >
                    Preferred Date:
                  </span>
                  <p
                    className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-800"
                    } transition-colors duration-300`}
                  >
                    {new Date(request.preferredDate).toLocaleDateString(
                      "en-IN",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div>
                  <span
                    className={`${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    } transition-colors duration-300`}
                  >
                    Preferred Time:
                  </span>
                  <p
                    className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-800"
                    } transition-colors duration-300`}
                  >
                    {request.preferredTime}
                  </p>
                </div>
              </div>
              <div>
                <span
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } transition-colors duration-300`}
                >
                  Message:
                </span>
                <p
                  className={`${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mt-2 p-3 rounded border transition-colors duration-300 ${
                    darkMode
                      ? "border-gray-600 bg-[#341b47]"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {request.message}
                </p>
              </div>
              <div>
                <span
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } transition-colors duration-300`}
                >
                  Priority:
                </span>
                <span
                  className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
                    request.priority
                  )}`}
                >
                  {request.priority.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {request.status === "pending" && (
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleRequestResponse(request.id, "approved")}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center ${
                  darkMode
                    ? "bg-green-700 hover:bg-green-800 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                <Check className="mr-2 h-4 w-4" />
                Approve Meeting
              </button>
              <button
                onClick={() => handleRequestResponse(request.id, "rejected")}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center ${
                  darkMode
                    ? "bg-red-700 hover:bg-red-800 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                <X className="mr-2 h-4 w-4" />
                Decline Meeting
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const MeetingRequests = () => (
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
        <MessageSquare
          className={`mr-3 ${darkMode ? "text-purple-400" : "text-blue-600"}`}
        />
        Meeting Requests
        {meetingRequests.filter((r) => r.status === "pending").length > 0 && (
          <span
            className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
              darkMode ? "bg-red-900 text-red-300" : "bg-red-100 text-red-800"
            }`}
          >
            {meetingRequests.filter((r) => r.status === "pending").length}{" "}
            pending
          </span>
        )}
      </h2>

      {meetingRequests.filter((r) => r.status === "pending").length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare
            className={`mx-auto h-12 w-12 ${
              darkMode ? "text-gray-600" : "text-gray-400"
            } mb-4 transition-colors duration-300`}
          />
          <p
            className={`${
              darkMode ? "text-gray-400" : "text-gray-500"
            } transition-colors duration-300`}
          >
            No pending meeting requests
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {meetingRequests
            .filter((r) => r.status === "pending")
            .map((request) => (
              <div
                key={request.id}
                className={`border rounded-lg p-4 transition-all duration-300 ${
                  darkMode
                    ? "border-gray-600 bg-[#2a0c2e] hover:shadow-lg hover:shadow-purple-500/20"
                    : "border-gray-200 bg-white hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <User
                        className={`h-10 w-10 ${
                          darkMode
                            ? "text-gray-400 bg-[#341b47]"
                            : "text-gray-400 bg-gray-100"
                        } rounded-full p-2 transition-colors duration-300`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`font-semibold ${
                            darkMode ? "text-white" : "text-gray-800"
                          } transition-colors duration-300`}
                        >
                          {request.parentName}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
                            request.priority
                          )}`}
                        >
                          {request.priority.toUpperCase()} PRIORITY
                        </span>
                      </div>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        } transition-colors duration-300`}
                      >
                        Parent of {request.studentName} ({request.class} - Roll
                        #{request.rollNumber})
                      </p>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-500" : "text-gray-500"
                        } mt-1 transition-colors duration-300`}
                      >
                        {request.meetingType}
                      </p>

                      <div
                        className={`flex flex-wrap items-center mt-2 gap-4 text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        } transition-colors duration-300`}
                      >
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(request.preferredDate).toLocaleDateString(
                            "en-IN",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {request.preferredTime}
                        </div>
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Requested{" "}
                          {new Date(request.requestDate).toLocaleDateString(
                            "en-IN",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </div>

                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        } mt-2 line-clamp-2 transition-colors duration-300`}
                      >
                        {request.message}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button
                    onClick={() => setShowRequestDetails(request)}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-300 flex items-center justify-center ${
                      darkMode
                        ? "bg-[#341b47] hover:bg-[#4a2458] text-purple-300"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </button>
                  <button
                    onClick={() =>
                      handleRequestResponse(request.id, "approved")
                    }
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-300 flex items-center justify-center ${
                      darkMode
                        ? "bg-green-700 hover:bg-green-800 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      handleRequestResponse(request.id, "rejected")
                    }
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-300 flex items-center justify-center ${
                      darkMode
                        ? "bg-red-700 hover:bg-red-800 text-white"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Decline
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );

  const ConfirmedMeetings = () => (
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
        Confirmed Meetings
      </h2>

      {confirmedMeetings.length === 0 ? (
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
            No confirmed meetings scheduled
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {confirmedMeetings.map((meeting) => (
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
                    <UserCheck
                      className={`h-10 w-10 ${
                        darkMode
                          ? "text-green-400 bg-[#341b47]"
                          : "text-green-600 bg-green-100"
                      } rounded-full p-2 transition-colors duration-300`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${
                        darkMode ? "text-white" : "text-gray-800"
                      } transition-colors duration-300`}
                    >
                      {meeting.parentName}
                    </h3>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      } transition-colors duration-300`}
                    >
                      Parent of {meeting.studentName} ({meeting.class} - Roll #
                      {meeting.rollNumber})
                    </p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-500" : "text-gray-500"
                      } mt-1 transition-colors duration-300`}
                    >
                      {meeting.meetingType}
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

                    {meeting.notes && (
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        } mt-2 transition-colors duration-300`}
                      >
                        <span className="font-medium">Notes:</span>{" "}
                        {meeting.notes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0">
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
          <div className="pr-24">
            <h1
              className={`text-2xl md:text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              } mb-2 transition-colors duration-300`}
            >
              Teacher Meeting Manager
            </h1>
            <p
              className={`${
                darkMode ? "text-gray-300" : "text-gray-600"
              } transition-colors duration-300 text-sm md:text-base`}
            >
              Manage parent meeting requests and view your scheduled
              appointments with students' families.
            </p>
            <div
              className={`mt-2 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              } transition-colors duration-300`}
            >
              <span className="font-medium">{teacherInfo.name}</span> -{" "}
              {teacherInfo.subject} Teacher
            </div>
          </div>

          {/* Utility Icons */}
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
                <Sun className="text-xl" />
              ) : (
                <Moon className="text-xl" />
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
                <UserCircle className="text-xl" />
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
            onClick={() => setActiveTab("requests")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300 ${
              activeTab === "requests"
                ? darkMode
                  ? "bg-[#341b47] text-purple-300 shadow-sm"
                  : "bg-white text-blue-600 shadow-sm"
                : darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <MessageSquare className="inline h-4 w-4 mr-2" />
            Meeting Requests
            {meetingRequests.filter((r) => r.status === "pending").length >
              0 && (
              <span
                className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                  activeTab === "requests"
                    ? darkMode
                      ? "bg-purple-600 text-white"
                      : "bg-blue-600 text-white"
                    : darkMode
                    ? "bg-red-900 text-red-300"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {meetingRequests.filter((r) => r.status === "pending").length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300 ${
              activeTab === "create"
                ? darkMode
                  ? "bg-[#341b47] text-purple-300 shadow-sm"
                  : "bg-white text-blue-600 shadow-sm"
                : darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Calendar className="inline h-4 w-4 mr-2" />
            Create Meeting
          </button>
          <button
            onClick={() => setActiveTab("confirmed")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300 ${
              activeTab === "confirmed"
                ? darkMode
                  ? "bg-[#341b47] text-purple-300 shadow-sm"
                  : "bg-white text-blue-600 shadow-sm"
                : darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Bell className="inline h-4 w-4 mr-2" />
            Confirmed Meetings
          </button>
        </div>

        {/* Content */}
        <div className="mr-6 ml-0 md:ml-0">
          {activeTab === "requests" ? (
            <MeetingRequests />
          ) : activeTab === "create" ? (
            <CreateMeetingForm />
          ) : (
            <ConfirmedMeetings />
          )}
        </div>

        {/* Create Meeting Success Modal */}
        {showCreateSuccess && (
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
                  Meeting Created!
                </h3>
                <p
                  className={`${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  } mb-4 transition-colors duration-300`}
                >
                  The meeting has been scheduled successfully. The parent will
                  be notified.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Request Details Modal */}
        {showRequestDetails && (
          <RequestDetailsModal request={showRequestDetails} />
        )}

        {/* Response Success Modal */}
        {showResponseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              className={`${
                darkMode ? "bg-[#100e10]" : "bg-white"
              } rounded-lg p-6 max-w-sm mx-4 transition-colors duration-300`}
            >
              <div className="text-center">
                {responseType === "approved" ? (
                  <CheckCircle
                    className={`mx-auto h-12 w-12 ${
                      darkMode ? "text-green-400" : "text-green-500"
                    } mb-4 transition-colors duration-300`}
                  />
                ) : (
                  <X
                    className={`mx-auto h-12 w-12 ${
                      darkMode ? "text-red-400" : "text-red-500"
                    } mb-4 transition-colors duration-300`}
                  />
                )}
                <h3
                  className={`text-lg font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  } mb-2 transition-colors duration-300`}
                >
                  {responseType === "approved"
                    ? "Meeting Approved!"
                    : "Meeting Declined"}
                </h3>
                <p
                  className={`${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  } mb-4 transition-colors duration-300`}
                >
                  {responseType === "approved"
                    ? "The parent has been notified about the approved meeting."
                    : "The parent has been notified about the declined meeting."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherMeetingManager;
