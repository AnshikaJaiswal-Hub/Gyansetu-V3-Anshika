import React, { useState, useEffect } from "react";
import { Calendar, Settings } from "lucide-react";
import CalendarView from "./teacherCalender/TeacherCalenderView";
import SchedulingTools from "./TeacherScheduling";
import TimeTableGenerator from "./TeacherTimetable";
import AnnouncementsManager from "./TeacherAnnouncements";
import Navbar from "../TeacherNavbar";
import authService from "../../../services/api/authService";

const TeacherMainCalender = () => {
  const [activeTab, setActiveTab] = useState("calendar");
  const [navExpanded, setNavExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock data for events, notifications, announcements, and timetables (unchanged)
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Staff Meeting",
      date: "2025-04-30",
      start: "09:00",
      end: "10:00",
      type: "meeting",
      priority: "medium",
      description: "Monthly staff meeting",
    },
    {
      id: 2,
      title: "Parent-Teacher Conference",
      date: "2025-05-02",
      start: "14:00",
      end: "16:00",
      type: "conference",
      priority: "high",
      description: "End of term parent-teacher meetings",
    },
    {
      id: 3,
      title: "Final Exam Week",
      startDate: "2025-05-15",
      endDate: "2025-05-22",
      allDay: true,
      type: "exam",
      priority: "urgent",
      description: "End of year examination period",
    },
    {
      id: 4,
      title: "Sports Day",
      date: "2025-05-10",
      allDay: true,
      type: "event",
      priority: "medium",
      description: "Annual school sports day",
    },
    {
      id: 5,
      title: "Teacher Development Workshop",
      date: "2025-05-05",
      start: "13:00",
      end: "16:00",
      type: "training",
      priority: "medium",
      description: "Professional development workshop",
    },
    {
      id: 6,
      title: "School Holiday - Labor Day",
      date: "2025-05-01",
      allDay: true,
      type: "holiday",
      priority: "medium",
      description: "Public holiday - school closed",
    },
  ]);

  const [scheduledNotifications, setScheduledNotifications] = useState([
    {
      id: 101,
      title: "Fee Reminder",
      date: "2025-05-05",
      target: "parents",
      priority: "high",
      message: "Monthly fee reminder for all parents",
    },
    {
      id: 102,
      title: "Grade Submission Deadline",
      date: "2025-05-10",
      target: "teachers",
      priority: "medium",
      message: "Final grades submission reminder for teachers",
    },
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: 201,
      title: "Final Exam Schedule Released",
      date: "2025-04-28",
      priority: "urgent",
      target: "all",
      content:
        "The final examination schedule has been released. Please check the academic calendar for details.",
    },
    {
      id: 202,
      title: "Teacher Evaluation Forms Due",
      date: "2025-04-29",
      priority: "high",
      target: "teachers",
      content:
        "All teacher evaluation forms must be submitted by the end of the month.",
    },
    {
      id: 203,
      title: "School Closure Due to Weather",
      date: "2025-05-03",
      priority: "urgent",
      target: "all",
      content:
        "School will be closed on May 3rd due to severe weather warnings.",
    },
  ]);

  const [timeTables, setTimeTables] = useState([
    {
      id: 301,
      grade: "Grade 9",
      section: "A",
      academicYear: "2024-2025",
      schedule: {},
    },
    {
      id: 302,
      grade: "Grade 10",
      section: "B",
      academicYear: "2024-2025",
      schedule: {},
    },
  ]);

  // Event handlers (unchanged)
  const handleAddEvent = (newEvent) => {
    const eventWithId = { ...newEvent, id: events.length + 1 };
    setEvents([...events, eventWithId]);
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const handleAddNotification = (newNotification) => {
    const notificationWithId = {
      ...newNotification,
      id: scheduledNotifications.length + 101,
    };
    setScheduledNotifications([...scheduledNotifications, notificationWithId]);
  };

  const handleAddAnnouncement = (newAnnouncement) => {
    const announcementWithId = {
      ...newAnnouncement,
      id: announcements.length + 201,
    };
    setAnnouncements([...announcements, announcementWithId]);
  };

  const handleAddTimeTable = (newTimeTable) => {
    const timeTableWithId = { ...newTimeTable, id: timeTables.length + 301 };
    setTimeTables([...timeTables, timeTableWithId]);
  };

  // Handle navbar toggle
  const handleNavToggle = (expanded) => {
    setNavExpanded(expanded);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom top header bar with logo and menu button */}
      <div className="w-full bg-purple-100 flex items-center justify-between px-4 py-3 shadow-sm z-[9997] fixed top-0 left-0 right-0">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md mr-3">
            <div className="w-4 h-4 rounded-full bg-white opacity-80" />
          </div>
          <span className="font-bold text-lg text-gray-700">GyanSetu</span>
        </div>
        {isMobile && (
          <button 
            onClick={toggleMobileMenu}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col justify-between h-5 w-5">
              <span className="h-0.5 w-full bg-gray-500 rounded"></span>
              <span className="h-0.5 w-3/4 bg-gray-500 rounded"></span>
              <span className="h-0.5 w-full bg-gray-500 rounded"></span>
            </div>
          </button>
        )}
      </div>
      
      {/* Add space to push content below fixed header */}
      <div className="h-[56px]"></div>
      
      {/* Mobile Menu - Only visible when toggled on mobile */}
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998]">
          <div className="fixed top-0 right-0 h-screen w-3/4 bg-white shadow-lg z-[9999]">
            <div className="flex items-center justify-between w-full px-6 py-4 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-white opacity-90" />
                </div>
                <span className="ml-3 font-bold text-xl whitespace-nowrap text-gray-800">
                  GyanSetu
                </span>
              </div>

              {/* Close button */}
              <button onClick={toggleMobileMenu} className="p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation items */}
            <div className="flex flex-col space-y-2 px-4 mt-6">
              <a
                href="/teacher"
                className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                <span className="ml-3">Dashboard</span>
              </a>
              <a
                href="/teacher/create-assignment"
                className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                <span className="ml-3">Create Assignments</span>
              </a>
              <a
                href="/teacher/generate-assignment"
                className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                <span className="ml-3">Generate Assignments</span>
              </a>
              <a
                href="/teacher/analytics"
                className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                <span className="ml-3">Analytics</span>
              </a>
              <a
                href="/teacher/calendar"
                className="flex items-center px-4 py-3 rounded-lg bg-purple-100"
              >
                <span className="ml-3">Calendar</span>
              </a>
              
              {/* Logout Button */}
              <div 
                className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 mt-6 cursor-pointer"
                onClick={() => {
                  authService.logout();
                  window.location.href = '/login';
                }}
              >
                <span className="ml-3">Logout</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row">
        <Navbar onNavToggle={handleNavToggle} />
        <div
          className={`flex-1 transition-all duration-300 pt-[20px] md:pt-0 ${
            navExpanded ? "ml-0 md:ml-[330px]" : "ml-0 md:ml-[100px]"
          }`}
        >
          <div className="p-6 md:p-8">
            {/* Tab Navigation */}
            <div className="bg-white shadow rounded-lg mb-6">
              <div className="flex flex-wrap items-center p-4 space-x-3 md:space-x-6">
                <button
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === "calendar"
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("calendar")}
                >
                  <Calendar size={18} className="mr-2" />
                  Calendar
                </button>
                <button
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === "scheduling"
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("scheduling")}
                >
                  <Settings size={18} className="mr-2" />
                  Scheduling
                </button>
                <button
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === "timetable"
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("timetable")}
                >
                  <Settings size={18} className="mr-2" />
                  Time Table
                </button>
                <button
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === "announcements"
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("announcements")}
                >
                  <Settings size={18} className="mr-2" />
                  Announcements
                </button>
              </div>
            </div>

            {/* Dynamic Content based on Active Tab */}
            {activeTab === "calendar" && (
              <CalendarView
                events={events || []}
                onAddEvent={handleAddEvent}
                onEditEvent={handleEditEvent}
                onDeleteEvent={handleDeleteEvent}
                classes={[
                  {
                    id: 1,
                    name: "Math 101",
                    sections: [
                      { id: 1, name: "Section A" },
                      { id: 2, name: "Section B" },
                    ],
                  },
                  {
                    id: 2,
                    name: "Science 201",
                    sections: [
                      { id: 3, name: "Section A" },
                      { id: 4, name: "Section B" },
                    ],
                  },
                ]}
              />
            )}

            {/* Content for Scheduling Tab */}
            {activeTab === "scheduling" && (
              <SchedulingTools
                scheduledNotifications={scheduledNotifications}
                onAddNotification={handleAddNotification}
              />
            )}

            {/* Content for Timetable Tab */}
            {activeTab === "timetable" && (
              <TimeTableGenerator
                timeTables={timeTables}
                onAddTimeTable={handleAddTimeTable}
              />
            )}

            {/* Content for Announcements Tab */}
            {activeTab === "announcements" && (
              <AnnouncementsManager
                announcements={announcements}
                onAddAnnouncement={handleAddAnnouncement}
              />
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 767px) {
          .p-6 {
            padding: 1rem;
          }
          /* Ensure our fixed elements aren't covered by content */
          .fixed {
            position: fixed !important;
          }
          .z-[9999] {
            z-index: 9999 !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .p-6,
          .md\\:p-8 {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TeacherMainCalender;
