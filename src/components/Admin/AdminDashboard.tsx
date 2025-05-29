// This file is now .jsx. All TypeScript types/interfaces removed. Tailwind classes replaced with placeholder CSS classes. Move styles to a CSS file.
import React, { useState, useEffect } from 'react';
import { 
  IoHomeOutline, 
  IoChatboxOutline, 
  IoCalendarOutline,
  IoHelpBuoyOutline, 
  IoBookOutline,
  IoPeopleOutline
} from "react-icons/io5";
import { Users, CreditCard, AlertCircle, TrendingUp, Calendar as CalendarIcon, Bell, PieChart, 
  BookOpen, GraduationCap, Award, Clock, FileText, School, List, Megaphone, Clock as ClockIcon, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Dialog } from '@headlessui/react';

// Colors
const THEME_COLORS = {
  primary: '#3b82f6', // blue
  secondary: '#10b981', // emerald
  accent: '#8b5cf6', // violet
  warning: '#f97316', // orange
  error: '#ef4444', // red
  success: '#22c55e', // green
  info: '#06b6d4', // cyan
  background: '#f8fafc', // light blue gray
};

// Update the color theme constants
const DISTRIBUTION_COLORS = {
  darkGray: '#374151',
  mediumGray: '#6B7280',
  lightGray: '#9CA3AF',
  lightPurple: '#8B5CF6'
};

const TeacherNavbar = ({ onNavToggle, expanded, setExpanded, activeItem, setActiveItem, isMobile }: {
  onNavToggle?: any;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
  isMobile: boolean;
}) => {
  const navItems = [
    { name: "Dashboard", icon: <IoHomeOutline className="text-lg" /> },
    { name: "Finance", icon: <CreditCard className="text-lg" /> },
    { name: "Calendar", icon: <IoCalendarOutline className="text-lg" /> },
    { name: "Teacher", icon: <Users className="text-lg" /> },
    { name: "Students", icon: <IoPeopleOutline className="text-lg" /> },
    { name: "Scheduling", icon: <Clock className="text-lg" /> },
  ];

  // Mobile view - horizontal layout at the top
  if (isMobile && !expanded) {
    return (
      <nav className="fixed top-0 left-0 w-full bg-white flex items-center justify-between px-4 py-6 shadow-sm z-50">
        {/* Logo */}
        <div className="flex items-center cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
            <div className="w-4 h-4 rounded-full bg-white opacity-80" />
          </div>
          <span className="ml-3 font-bold text-lg whitespace-nowrap text-gray-700">
            GyanSetu
          </span>
        </div>

        {/* Hamburger menu */}
        <div className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <div className="flex flex-col justify-between h-5 w-5">
              <span className="h-0.5 w-full bg-gray-500 rounded"></span>
              <span className="h-0.5 w-3/4 bg-gray-500 rounded"></span>
              <span className="h-0.5 w-full bg-gray-500 rounded"></span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Mobile expanded view or desktop/tablet view
  return (
    <nav
      className={`fixed top-0 left-0 h-screen transition-all duration-300 z-50 flex flex-col 
        ${
          isMobile
            ? "bg-gradient-to-r from-purple-50 to-gray-100"
            : "bg-gradient-to-b from-gray-100 to-purple-50"
        }
        ${expanded ? (isMobile ? "w-full" : "w-[330px]") : "w-[100px]"}`}
    >
      {/* Mobile expanded header with hamburger at right */}
      {isMobile && expanded && (
        <div className="flex items-center justify-between w-full px-4 py-6">
          {/* Logo */}
          <div className="flex items-center cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
              <div className="w-4 h-4 rounded-full bg-white opacity-80" />
            </div>
            <span className="ml-3 font-bold text-lg whitespace-nowrap text-gray-700">
              GyanSetu
            </span>
          </div>

          {/* Hamburger menu for mobile */}
          <div className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              <div className="flex flex-col justify-between h-5 w-5">
                <span className="h-0.5 w-full bg-gray-500 rounded"></span>
                <span className="h-0.5 w-3/4 bg-gray-500 rounded"></span>
                <span className="h-0.5 w-full bg-gray-500 rounded"></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop/Tablet Logo section and hamburger */}
      {!isMobile && (
        <>
          <div className="flex items-center px-5 py-6 cursor-pointer ml-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
              <div className="w-4 h-4 rounded-full bg-white opacity-80" />
            </div>
            {expanded && (
              <span className="ml-3 font-bold text-lg whitespace-nowrap text-gray-700">
                GyanSetu
              </span>
            )}
          </div>

          <div
            className="flex items-center px-5 py-3 cursor-pointer mb-4 ml-2"
            onClick={() => setExpanded(!expanded)}
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              <div className="flex flex-col justify-between h-5 w-5">
                <span className="h-0.5 w-full bg-gray-500 rounded"></span>
                <span className="h-0.5 w-3/4 bg-gray-500 rounded"></span>
                <span className="h-0.5 w-full bg-gray-500 rounded"></span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Navigation items */}
      <div
        className={`flex flex-col h-full space-y-3 px-2 ${
          isMobile && expanded ? "mt-4" : ""
        }`}
      >
        {navItems.map((item) => (
          <div
            key={item.name}
            className={`relative flex items-center cursor-pointer transition-all duration-200
              ${
                expanded
                  ? "px-3 py-3 rounded-xl " +
                    (activeItem === item.name
                      ? "bg-gradient-to-r from-purple-200 to-purple-50 text-purple-700 shadow-sm"
                      : "text-gray-500 hover:bg-purple-50")
                  : "justify-center py-3"
              }`}
            onClick={() => setActiveItem(item.name)}
          >
            <div
              className={`flex items-center justify-center min-w-[40px] w-10 h-10 rounded-full flex-shrink-0
              ${
                activeItem === item.name
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-500"
              }`}
            >
              {item.icon}
            </div>
            {expanded && (
              <span
                className={`ml-4 font-medium whitespace-nowrap ${
                  activeItem === item.name ? "text-gray-700" : "text-gray-600"
                }`}
              >
                {item.name}
              </span>
            )}

            {/* Active indicator for collapsed state */}
            {!expanded && activeItem === item.name && (
              <div className="absolute left-0 h-10 w-1 bg-purple-500 rounded-r-md"></div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom decoration - subtle gradient accent */}
      <div className="mt-auto mb-6 mx-auto">
        {expanded ? (
          <div className="w-32 h-1 bg-gradient-to-r from-purple-300 to-transparent rounded-full"></div>
        ) : (
          <div className="w-8 h-1 bg-gradient-to-r from-purple-300 to-transparent rounded-full"></div>
        )}
      </div>
    </nav>
  );
};

const EVENT_CATEGORIES = [
  { name: 'Academic Events', color: 'bg-blue-500' },
  { name: 'School Activities', color: 'bg-green-500' },
  { name: 'Resource Management', color: 'bg-yellow-500' },
  { name: 'Administrative Tasks', color: 'bg-purple-500' },
];
const NATIONAL_HOLIDAYS = [
  { name: 'New Year Celebration', date: '2025-01-01' },
  { name: 'Republic Day', date: '2025-01-26' },
];
const SCHOOL_PROFILE = {
  name: 'Springfield High School',
  established: 1985,
  principal: 'Dr. Jane Smith',
  students: 1250,
  staff: 85,
  academicYear: '2023-2024',
};

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  category: string;
  color: string;
  description?: string;
}

function CalendarDashboard() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [showModal, setShowModal] = React.useState(false);
  const [modalEvent, setModalEvent] = React.useState<CalendarEvent | null>(null);
  const [events, setEvents] = React.useState<CalendarEvent[]>([
    { id: 1, title: 'Staff Meeting', date: '2025-04-05', category: 'Administrative Tasks', color: 'bg-purple-500', description: 'Monthly staff meeting.' },
    { id: 2, title: 'IT Equipment Maint.', date: '2025-04-10', category: 'Resource Management', color: 'bg-yellow-500', description: 'Maintenance of IT equipment.' },
    { id: 3, title: 'Final Exams', date: '2025-04-15', category: 'Academic Events', color: 'bg-blue-500', description: 'Final exams for all classes.' },
    { id: 4, title: 'Sports Day', date: '2025-04-20', category: 'School Activities', color: 'bg-green-500', description: 'Annual sports day.' },
  ]);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [newEvent, setNewEvent] = React.useState<{ title: string; date: string; category: string; description?: string }>({ title: '', date: '', category: EVENT_CATEGORIES[0].name, description: '' });

  // Calendar grid helpers
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  const days: (Date | null)[] = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  while (days.length % 7 !== 0) {
    days.push(null);
  }

  // Event handlers
  function openEventModal(event: CalendarEvent) {
    setModalEvent(event);
    setShowModal(true);
  }
  function closeEventModal() {
    setShowModal(false);
    setModalEvent(null);
  }
  function openAddModal(date?: Date) {
    setNewEvent({ title: '', date: date ? date.toISOString().slice(0, 10) : '', category: EVENT_CATEGORIES[0].name, description: '' });
    setShowAddModal(true);
  }
  function handleAddEvent() {
    setEvents([
      ...events,
      {
        ...newEvent,
        id: Date.now(),
        color: (EVENT_CATEGORIES.find(c => c.name === newEvent.category)?.color) || 'bg-blue-500',
      } as CalendarEvent,
    ]);
    setShowAddModal(false);
  }

  // Responsive sidebar toggle (for mobile)
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Chart type state
  const [attendanceChartType, setAttendanceChartType] = React.useState('line');

  // Color palette for attendance chart
  const attendanceColors = {
    attendance: '#8b5cf6', // purple
    previousYear: '#52525b', // dark gray
    target: '#a3a3a3', // gray
    attendanceFill: '#ede9fe', // light purple for area fill
    previousYearFill: '#e5e7eb', // light gray for area fill
  };

  // Add state for new sidebar tools
  const [timeTables, setTimeTables] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [scheduledNotifications, setScheduledNotifications] = useState<any[]>([]);

  const handleAddTimeTable = (newTimeTable) => {
    setTimeTables((prev) => [...prev, { ...newTimeTable, id: Date.now() }]);
  };
  const handleAddAnnouncement = (newAnnouncement) => {
    setAnnouncements((prev) => [...prev, { ...newAnnouncement, id: Date.now() }]);
  };
  const handleAddNotification = (newNotification) => {
    setScheduledNotifications((prev) => [...prev, { ...newNotification, id: Date.now() }]);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* Sidebar/Tools */}
      <aside className="w-full max-w-xs flex-shrink-0 mb-4 lg:mb-0 flex flex-col gap-4">
        {/* <TimeTableGenerator timeTables={timeTables} onAddTimeTable={handleAddTimeTable} /> */}
        {/* <AnnouncementsManager announcements={announcements} onAddAnnouncement={handleAddAnnouncement} /> */}
        {/* <SchedulingTools scheduledNotifications={scheduledNotifications} onAddNotification={handleAddNotification} /> */}
      </aside>
      {/* Calendar Main */}
      <section className="flex-1 bg-white/90 rounded-2xl shadow-md p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
          <h2 className="text-xl font-bold text-gray-900">School Calendar</h2>
          <div className="flex gap-2 items-center">
            <button onClick={() => setSelectedDate(new Date())} className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium shadow hover:bg-blue-700 transition">Today</button>
            <button onClick={() => setSelectedDate(new Date(year, month - 1, 1))} className="text-2xl px-2 py-1 rounded hover:bg-gray-200">&#60;</button>
            <span className="font-semibold text-lg px-2">{selectedDate.toLocaleString('default', { month: 'long' })} {year}</span>
            <button onClick={() => setSelectedDate(new Date(year, month + 1, 1))} className="text-2xl px-2 py-1 rounded hover:bg-gray-200">&#62;</button>
          </div>
        </div>
        {/* Calendar Grid */}
        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 border rounded-xl bg-white">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <div key={day} className="py-2 px-1 text-center font-bold text-xs text-gray-700 border-b">{day}</div>
            ))}
            {days.map((date, idx) => {
              const isWeekend = date && (date.getDay() === 0 || date.getDay() === 6);
              const isToday = date && (date.toDateString() === new Date().toDateString());
              const dayEvents = date ? events.filter(ev => ev.date === date.toISOString().slice(0, 10)) : [];
              return (
                <div
                  key={idx}
                  className={`h-20 md:h-24 border-b border-r last:border-r-0 flex flex-col items-stretch justify-start p-1 relative ${isWeekend ? 'text-red-500 bg-red-50' : 'text-gray-700'} ${!date ? 'bg-gray-50 text-gray-300' : ''} ${isToday ? 'ring-2 ring-blue-400 bg-blue-50' : ''}`}
                  onClick={() => date && openAddModal(date as Date)}
                  style={{ cursor: date ? 'pointer' : 'default' }}
                  title={date ? date.toDateString() : ''}
                >
                  <div className="text-xs font-semibold mb-1 text-center">{date ? date.getDate() : ''}</div>
                  <div className="flex flex-col gap-1 flex-1">
                    {dayEvents.map(ev => (
                      <div
                        key={ev.id}
                        className={`truncate px-1 py-0.5 rounded text-xs text-white ${ev.color} cursor-pointer hover:opacity-90`}
                        onClick={e => { e.stopPropagation(); openEventModal(ev); }}
                        title={ev.title}
                      >
                        {ev.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Event Details for selected day */}
        <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold text-gray-800">Events for {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
            <button onClick={() => openAddModal(selectedDate as Date)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium shadow hover:bg-blue-700 transition">+ Add Event</button>
          </div>
          <ul className="space-y-2">
            {events.filter(ev => ev.date === selectedDate.toISOString().slice(0, 10)).length === 0 && (
              <li className="text-gray-400 text-sm">No events scheduled for this day.</li>
            )}
            {events.filter(ev => ev.date === selectedDate.toISOString().slice(0, 10)).map(ev => (
              <li key={ev.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-100">
                <span className={`w-3 h-3 rounded-full inline-block ${ev.color}`}></span>
                <span className="font-medium text-gray-700 text-sm flex-1">{ev.title}</span>
                <span className="text-xs text-gray-500">{ev.category}</span>
                <button onClick={() => openEventModal(ev)} className="text-blue-600 text-xs underline">Details</button>
              </li>
            ))}
          </ul>
        </div>
        {/* Event Details Modal */}
        <Dialog open={showModal} onClose={closeEventModal} className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 z-10 relative">
              <button onClick={closeEventModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
              {modalEvent && (
                <>
                  <Dialog.Title className="text-lg font-bold mb-2">{modalEvent.title}</Dialog.Title>
                  <div className="mb-2 text-xs text-gray-500">{formatDate(modalEvent.date)}</div>
                  <div className="mb-2 text-sm"><span className="font-semibold">Category:</span> {modalEvent.category}</div>
                  <div className="mb-2 text-sm"><span className="font-semibold">Description:</span> {modalEvent.description || 'No description.'}</div>
                </>
              )}
            </div>
          </div>
        </Dialog>
        {/* Add/Edit Event Modal */}
        <Dialog open={showAddModal} onClose={() => setShowAddModal(false)} className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 z-10 relative">
              <button onClick={() => setShowAddModal(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
              <Dialog.Title className="text-lg font-bold mb-4">Add New Event</Dialog.Title>
              <div className="mb-2">
                <input type="text" placeholder="Event Title" className="w-full border rounded px-3 py-2 mb-2" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} />
                <select className="w-full border rounded px-3 py-2 mb-2" value={newEvent.category} onChange={e => setNewEvent({ ...newEvent, category: e.target.value })}>
                  {EVENT_CATEGORIES.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
                </select>
                <textarea placeholder="Description" className="w-full border rounded px-3 py-2 mb-2" value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} />
                <input type="date" className="w-full border rounded px-3 py-2 mb-2" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} />
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded bg-gray-100 text-gray-700">Cancel</button>
                <button onClick={handleAddEvent} className="px-4 py-2 rounded bg-blue-600 text-white font-semibold">Add Event</button>
              </div>
            </div>
          </div>
        </Dialog>
      </section>
    </div>
  );
}

// Finance mock data
const financeData = {
  feeCollected: [
    { month: 'Jul', amount: 1200000 },
    { month: 'Aug', amount: 1350000 },
    { month: 'Sep', amount: 1280000 },
    { month: 'Oct', amount: 1400000 },
    { month: 'Nov', amount: 1320000 },
    { month: 'Dec', amount: 1543250 },
  ],
  duePayments: [
    { month: 'Jul', amount: 250000 },
    { month: 'Aug', amount: 210000 },
    { month: 'Sep', amount: 230000 },
    { month: 'Oct', amount: 200000 },
    { month: 'Nov', amount: 220000 },
    { month: 'Dec', amount: 238400 },
  ],
  admissions: [
    { month: 'Jul', count: 30 },
    { month: 'Aug', count: 45 },
    { month: 'Sep', count: 38 },
    { month: 'Oct', count: 50 },
    { month: 'Nov', count: 42 },
    { month: 'Dec', count: 55 },
  ],
};

// Finance Section Component
const FinanceSection = () => (
  <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 overflow-x-auto" style={{ minWidth: 0 }}>
    {/* Fee Collected Card */}
    <motion.div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-5 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="h-5 w-5 text-[#8b5cf6]" />
        <h2 className="text-lg font-semibold text-gray-900">Fee Collected</h2>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={financeData.feeCollected}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={v => `₹${(v/100000).toFixed(2)}L`} />
            <Tooltip formatter={v => `₹${v.toLocaleString('en-IN')}`} />
            <Line type="monotone" dataKey="amount" stroke="#8b5cf6" strokeWidth={2} activeDot={{ r: 7 }} name="Fee Collected" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
    {/* Due Payments Card */}
    <motion.div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-5 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="h-5 w-5 text-orange-500" />
        <h2 className="text-lg font-semibold text-gray-900">Due Payments</h2>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={financeData.duePayments}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={v => `₹${(v/100000).toFixed(2)}L`} />
            <Tooltip formatter={v => `₹${v.toLocaleString('en-IN')}`} />
            <Bar dataKey="amount" fill="#f59e42" radius={[6, 6, 0, 0]} name="Due Payments" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
    {/* Admissions Card */}
    <motion.div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-5 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-5 w-5 text-green-500" />
        <h2 className="text-lg font-semibold text-gray-900">No. of Admissions</h2>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={financeData.admissions}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} name="Admissions" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  </div>
);

// Scheduling Section Component
const SchedulingSection = () => (
  <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 overflow-x-auto" style={{ minWidth: 0 }}>
    {/* TO-DO Card */}
    <motion.div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-5 flex flex-col min-h-[220px]">
      <div className="flex items-center gap-2 mb-4">
        <List className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">TO-DO</h2>
      </div>
      <ul className="flex-1 space-y-2 text-sm text-gray-700">
        <li>✔️ Complete monthly report</li>
        <li>✔️ Review student assignments</li>
        <li>⬜ Schedule parent meeting</li>
        <li>⬜ Update attendance records</li>
      </ul>
    </motion.div>
    {/* PLANNING Card */}
    <motion.div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-5 flex flex-col min-h-[220px]">
      <div className="flex items-center gap-2 mb-4">
        <CalendarIcon className="h-5 w-5 text-purple-500" />
        <h2 className="text-lg font-semibold text-gray-900">PLANNING</h2>
      </div>
      <ul className="flex-1 space-y-2 text-sm text-gray-700">
        <li>📅 Plan next week's timetable</li>
        <li>📅 Organize workshop for teachers</li>
        <li>📅 Prepare exam schedule</li>
      </ul>
    </motion.div>
    {/* FEEDBACK MANAGEMENT Card */}
    <motion.div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-5 flex flex-col min-h-[220px]">
      <div className="flex items-center gap-2 mb-4">
        <Megaphone className="h-5 w-5 text-green-500" />
        <h2 className="text-lg font-semibold text-gray-900">FEEDBACK MANAGEMENT</h2>
      </div>
      <ul className="flex-1 space-y-2 text-sm text-gray-700">
        <li>📝 Collect feedback from students</li>
        <li>📝 Analyze feedback trends</li>
        <li>📝 Respond to parent suggestions</li>
      </ul>
    </motion.div>
  </div>
);

function StudentDashboard() {
  // Mock dynamic data
  const summary = [
    { label: 'Average Attendance', value: '91.4%', color: 'bg-blue-50', text: 'text-blue-700' },
    { label: 'Total School', value: '680', color: 'bg-green-50', text: 'text-green-700' },
    { label: 'Teacher Rating', value: '4.7/5', color: 'bg-purple-50', text: 'text-purple-700' },
    { label: 'Average Performance', value: '80.6%', color: 'bg-yellow-50', text: 'text-yellow-700' },
  ];
  const attendanceTrends = [
    { month: 'Jan', attendance: 95, previousYear: 90, target: 95 },
    { month: 'Feb', attendance: 97, previousYear: 89, target: 95 },
    { month: 'Mar', attendance: 91, previousYear: 88, target: 95 },
    { month: 'Apr', attendance: 89, previousYear: 87, target: 95 },
    { month: 'May', attendance: 86, previousYear: 85, target: 95 },
    { month: 'Jun', attendance: 94, previousYear: 92, target: 95 },
    { month: 'Jul', attendance: 97, previousYear: 94, target: 95 },
    { month: 'Aug', attendance: 95, previousYear: 93, target: 95 },
    { month: 'Sep', attendance: 90, previousYear: 90, target: 95 },
    { month: 'Oct', attendance: 89, previousYear: 89, target: 95 },
    { month: 'Nov', attendance: 88, previousYear: 88, target: 95 },
    { month: 'Dec', attendance: 87, previousYear: 87, target: 95 },
  ];
  const gradeDistribution = [
    { name: 'A', value: 25, color: '#8b5cf6' },
    { name: 'B', value: 35, color: '#a3a3a3' },
    { name: 'C', value: 25, color: '#d4d4d8' },
    { name: 'D', value: 10, color: '#6366f1' },
    { name: 'F', value: 5, color: '#e5e7eb' },
  ];
  const subjectPerformance = [
    { subject: 'Math', avgScore: 75, passRate: 90, difficulty: 3 },
    { subject: 'Science', avgScore: 80, passRate: 95, difficulty: 2 },
    { subject: 'English', avgScore: 70, passRate: 85, difficulty: 2.5 },
    { subject: 'History', avgScore: 78, passRate: 92, difficulty: 3 },
    { subject: 'Art', avgScore: 82, passRate: 98, difficulty: 1.5 },
  ];

  // Chart type state
  const [attendanceChartType, setAttendanceChartType] = React.useState('line');

  // Add activeTab state for tab switching
  const [activeTab, setActiveTab] = React.useState('Dashboard');

  // Color palette for attendance chart
  const attendanceColors = {
    attendance: '#8b5cf6', // purple
    previousYear: '#52525b', // dark gray
    target: '#a3a3a3', // gray
    attendanceFill: '#ede9fe', // light purple for area fill
    previousYearFill: '#e5e7eb', // light gray for area fill
  };

  // Example Enrollment summary data (replace with real data if available)
  const enrollmentSummary = [
    { label: 'Total Students', value: 680, color: 'text-blue-700', bg: 'bg-gray-100', sub: '↑ NaN% growth' },
    { label: 'Male Students', value: 330, color: 'text-blue-500', bg: 'bg-gray-100', sub: '48.5% of total' },
    { label: 'Female Students', value: 350, color: 'text-pink-500', bg: 'bg-pink-50', sub: '51.5% of total' },
    { label: 'International', value: 95, color: 'text-orange-500', bg: 'bg-yellow-50', sub: '14.0% of total' },
  ];

  return (
    <div className="p-2 sm:p-4 md:p-8 w-full">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">School Analytics Dashboard</h1>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button className={`${activeTab === 'Dashboard' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'} px-4 py-1.5 rounded font-medium shadow`} onClick={() => setActiveTab('Dashboard')}>Dashboard</button>
        <button className={`${activeTab === 'Performance' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'} px-4 py-1.5 rounded font-medium`} onClick={() => setActiveTab('Performance')}>Performance</button>
        <button className={`${activeTab === 'Attendance' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'} px-4 py-1.5 rounded font-medium`} onClick={() => setActiveTab('Attendance')}>Attendance</button>
        <button className={`${activeTab === 'Enrollment' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'} px-4 py-1.5 rounded font-medium`} onClick={() => setActiveTab('Enrollment')}>Enrollment</button>
        <div className="ml-auto flex gap-2">
          <select className="border rounded px-2 py-1 text-sm">
            <option>Export as CSV</option>
            <option>Export as XLSX</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-1.5 rounded font-medium shadow">Export Report</button>
        </div>
      </div>

      {/* Conditionally render tab content */}
      {activeTab === 'Dashboard' && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {summary.map((card, idx) => (
              <div key={idx} className="rounded-xl p-4 shadow bg-gray-100 flex flex-col">
                <div className="text-xs font-medium mb-1 text-gray-500">{card.label}</div>
                <div className={`text-2xl font-bold ${card.text}`}>{card.value}</div>
              </div>
            ))}
          </div>
          {/* Student Attendance (Dynamic Chart) & Grade Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white rounded-xl shadow p-4 md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-gray-800">Student Attendance</div>
                <div className="flex gap-2 text-xs">
                  <button
                    className={`px-2 py-0.5 rounded border ${attendanceChartType === 'line' ? 'bg-blue-600 text-white' : 'text-blue-600 border-blue-200 bg-blue-50'}`}
                    onClick={() => setAttendanceChartType('line')}
                  >Line</button>
                  <button
                    className={`px-2 py-0.5 rounded border ${attendanceChartType === 'bar' ? 'bg-blue-600 text-white' : 'text-blue-600 border-blue-200 bg-blue-50'}`}
                    onClick={() => setAttendanceChartType('bar')}
                  >Bar</button>
                  <button
                    className={`px-2 py-0.5 rounded border ${attendanceChartType === 'area' ? 'bg-blue-600 text-white' : 'text-blue-600 border-blue-200 bg-blue-50'}`}
                    onClick={() => setAttendanceChartType('area')}
                  >Area</button>
                </div>
              </div>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {attendanceChartType === 'line' ? (
                    <LineChart data={attendanceTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[60, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="attendance" stroke={attendanceColors.attendance} strokeWidth={2} name="attendance" />
                      <Line type="monotone" dataKey="previousYear" stroke={attendanceColors.previousYear} strokeWidth={2} name="previousYear" strokeDasharray="5 5" />
                      <Line type="monotone" dataKey="target" stroke={attendanceColors.target} strokeWidth={2} name="target" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                    </LineChart>
                  ) : attendanceChartType === 'bar' ? (
                    <BarChart data={attendanceTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[60, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="attendance" fill={attendanceColors.attendance} name="attendance" />
                      <Bar dataKey="previousYear" fill={attendanceColors.previousYear} name="previousYear" />
                    </BarChart>
                  ) : (
                    <AreaChart data={attendanceTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[60, 100]} />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="attendance" stroke={attendanceColors.attendance} fill={attendanceColors.attendanceFill} name="attendance" />
                      <Area type="monotone" dataKey="previousYear" stroke={attendanceColors.previousYear} fill={attendanceColors.previousYearFill} name="previousYear" />
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
              <div className="font-semibold text-gray-800 mb-2">Grade Distribution</div>
              <div className="h-48 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie data={gradeDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                      {gradeDistribution.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-2 text-xs">
                {gradeDistribution.map((g, idx) => (
                  <li key={g.name} className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{background: g.color}}></span>{g.name} ({g.value}%)</li>
                ))}
              </ul>
            </div>
          </div>
          {/* Subject Performance Analysis */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="font-semibold text-gray-800 mb-2">Subject Performance Analysis</div>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="avgScore" fill="#a78bfa" name="Average Score (%)" />
                  <Bar yAxisId="left" dataKey="passRate" fill="#34d399" name="Passing Rate (%)" />
                  <Line yAxisId="right" type="monotone" dataKey="difficulty" stroke="#f59e42" name="Difficulty (1-5)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
      {activeTab === 'Enrollment' && (
        <>
          {/* Enrollment Trends Chart */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Enrollment Trends</h2>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="attendance" stroke={attendanceColors.attendance} strokeWidth={2} name="attendance" />
                  <Line type="monotone" dataKey="previousYear" stroke={attendanceColors.previousYear} strokeWidth={2} name="previousYear" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="target" stroke={attendanceColors.target} strokeWidth={2} name="target" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Enrollment Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4 mt-4">
            {enrollmentSummary.map((card, idx) => (
              <div key={idx} className={`rounded-xl p-4 shadow ${card.bg} flex flex-col`}>
                <div className="text-xs font-medium mb-1 text-gray-500">{card.label}</div>
                <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
                <div className="text-xs text-gray-400 mt-1">{card.sub}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const Dashboard = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('6months');
  const [view, setView] = useState('all');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      name: 'Total Students',
      value: '2,543',
      icon: Users,
      change: '+5.4%',
      changeType: 'increase',
      description: 'Active enrollments this semester',
      color: THEME_COLORS.primary
    },
    {
      name: 'Total Teachers',
      value: '186',
      icon: School,
      change: '+3.2%',
      changeType: 'increase',
      description: 'Active faculty members',
      color: THEME_COLORS.success
    },
    {
      name: 'Fee Collected',
      value: '₹15,43,250',
      icon: CreditCard,
      change: '+12.3%',
      changeType: 'increase',
      description: 'Total collections this month',
      color: THEME_COLORS.warning
    },
    {
      name: 'Attendance Rate',
      value: '92.6%',
      icon: Clock,
      change: '+1.8%',
      changeType: 'increase',
      description: 'Average this month',
      color: THEME_COLORS.accent,
      options: [
        { label: 'Teacher', value: '94.2%' },
        { label: 'Student', value: '91.8%' }
      ]
    }
  ];

  const extraStats = [
    {
      name: 'Academic Performance',
      value: '87.3%',
      icon: GraduationCap,
      change: '+2.4%',
      changeType: 'increase',
      description: 'Average scores',
      color: THEME_COLORS.info
    },
    {
      name: 'Library Books',
      value: '12,450',
      icon: BookOpen,
      change: '+120',
      changeType: 'increase',
      description: 'Total collection',
      color: THEME_COLORS.secondary
    },
    {
      name: 'Scholarships',
      value: '₹8,75,000',
      icon: Award,
      change: '+15.2%',
      changeType: 'increase',
      description: 'Awarded this year',
      color: THEME_COLORS.success
    },
    {
      name: 'Faculty Count',
      value: '186',
      icon: School,
      change: '+12',
      changeType: 'increase',
      description: 'Teaching staff',
      color: THEME_COLORS.primary
    }
  ];

  const recentActivity = [
    {
      id: 1,
      title: 'New Student Registration',
      description: 'Rajesh Kumar registered for Computer Science',
      timestamp: '2 hours ago',
      icon: Users,
      action: 'View Profile'
    },
    {
      id: 2,
      title: 'Fee Payment Received',
      description: 'Priya Sharma paid ₹45,000 for Term 2',
      timestamp: '4 hours ago',
      icon: CreditCard,
      action: 'Receipt'
    },
    {
      id: 3,
      title: 'Due Date Reminder',
      description: 'Fee payment due for 125 students in Class 10',
      timestamp: '5 hours ago',
      icon: Bell,
      action: 'Send Reminder'
    },
    {
      id: 4,
      title: 'Exam Results Published',
      description: 'Class 12 Mid-term results are now available',
      timestamp: '8 hours ago',
      icon: FileText,
      action: 'View Results'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Parent-Teacher Meeting',
      date: 'March 1, 2025',
      time: '10:00 AM',
      location: 'Main Auditorium',
      description: 'Discussion about academic progress of students'
    },
    {
      id: 2,
      title: 'Annual Sports Day',
      date: 'March 5, 2025',
      time: '9:00 AM',
      location: 'School Grounds',
      description: 'Annual sports competition with various track and field events'
    },
    {
      id: 3,
      title: 'Science Exhibition',
      date: 'March 12, 2025',
      time: '11:00 AM',
      location: 'Science Block',
      description: 'Students showcase innovative science projects'
    }
  ];

  // Sample data for charts
  const feeCollectionData = [
    { month: 'Jan', amount: 1250000 },
    { month: 'Feb', amount: 1350000 },
    { month: 'Mar', amount: 1543250 },
    { month: 'Apr', amount: 1650000 },
    { month: 'May', amount: 1440000 },
    { month: 'Jun', amount: 1380000 },
    { month: 'Jul', amount: 1580000 },
    { month: 'Aug', amount: 1720000 },
    { month: 'Sep', amount: 1650000 },
    { month: 'Oct', amount: 1490000 },
    { month: 'Nov', amount: 1420000 },
    { month: 'Dec', amount: 1350000 },
  ];

  const filteredFeeData = timeframe === '6months' 
    ? feeCollectionData.slice(-6) 
    : feeCollectionData;

  // Update the distribution data
  const departmentDistribution = [
    { name: 'Total Boys', value: 1350, color: DISTRIBUTION_COLORS.darkGray },
    { name: 'Total Girls', value: 1193, color: DISTRIBUTION_COLORS.lightPurple },
    { name: 'Total Teachers', value: 186, color: DISTRIBUTION_COLORS.mediumGray },
    { name: 'Total Workers', value: 45, color: DISTRIBUTION_COLORS.lightGray },
  ];

  // Update the stats below pie chart
  const distributionStats = [
    {
      label: 'Total Members',
      value: '2,774',
      bgColor: 'bg-gray-50'
    },
    {
      label: 'Students',
      value: '2,543',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Staff',
      value: '231',
      bgColor: 'bg-gray-100'
    }
  ];

  // Attendance data
  const attendanceData = [
    { name: 'Class 6', value: 94 },
    { name: 'Class 7', value: 91 },
    { name: 'Class 8', value: 89 },
    { name: 'Class 9', value: 92 },
    { name: 'Class 10', value: 96 },
    { name: 'Class 11', value: 88 },
    { name: 'Class 12', value: 94 },
  ];

  const formatIndianRupee = (value: number) => {
    // Convert to crores/lakhs format for larger numbers
    if (value >= 10000000) { // 1 crore
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) { // 1 lakh
      return `₹${(value / 100000).toFixed(2)} L`;
    }
    
    // Otherwise use standard Indian formatting
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.4 }
    })
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-200 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-200 via-white to-gray-100">
      <TeacherNavbar 
        expanded={expanded} 
        setExpanded={setExpanded} 
        activeItem={activeItem} 
        setActiveItem={setActiveItem} 
        isMobile={isMobile} 
      />
      <main className={`flex-1 px-2 sm:px-4 md:px-8 py-4 sm:py-6 transition-all duration-300 ${
        expanded 
          ? isMobile 
            ? 'ml-0' // Mobile expanded - no margin
            : 'ml-[330px]' // Desktop expanded - match sidebar width
          : isMobile 
            ? 'ml-0' // Mobile collapsed - no margin
            : 'ml-[100px]' // Desktop collapsed - match collapsed sidebar width
      }`}>
        {/* Conditionally render content based on activeItem */}
        {activeItem === 'Dashboard' && (
          <div className="min-h-screen p-6">
            <div className="mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Institute Dashboard</h1>
                <p className="mt-1 text-sm sm:text-base text-gray-600">
                  Welcome back! Here's your Institute overview for today.
                </p>
              </div>
            </div>

            <motion.div 
              className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto"
              style={{ minWidth: 0 }}
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {stats.map((item, index) => (
                <motion.div 
                  key={item.name} 
                  className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-4"
                  variants={cardVariants}
                  custom={index}
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg p-2.5 bg-gray-100/80">
                      <item.icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-500 mb-1">{item.name}</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-xl font-semibold text-gray-900 truncate">{item.value}</p>
                        <span className={`text-xs font-medium ${
                          item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.change}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500 truncate">{item.description}</p>
                      {item.options && (
                        <div className="mt-2 flex gap-3">
                          {item.options.map((option, idx) => (
                            <div key={idx} className="flex items-center gap-1.5">
                              <span className="text-xs font-medium text-gray-600">{option.label}:</span>
                              <span className="text-xs font-semibold text-gray-900">{option.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {view !== 'finance' && (
              <motion.div 
                className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                }}
              >
                {/* Fee Collection Chart */}
                <motion.div 
                  className="bg-white/70 backdrop-blur-lg rounded-xl shadow-md p-5"
                  variants={cardVariants}
                  custom={0}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-[#8b5cf6]" aria-hidden="true" />
                      <h2 className="text-lg font-semibold text-gray-900">Fee Collection Trend</h2>
                    </div>
                    <select 
                      className="text-sm border rounded-lg px-3 py-1.5 bg-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                    >
                      <option value="6months">Last 6 Months</option>
                      <option value="12months">Last Year</option>
                    </select>
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={filteredFeeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => formatIndianRupee(value).replace('₹', '')} />
                        <Tooltip formatter={(value: number) => [formatIndianRupee(value), 'Amount']} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="amount" 
                          stroke="#8b5cf6"
                          strokeWidth={2}
                          activeDot={{ r: 8 }} 
                          name="Fee Collection" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Total Collected:</span>
                        <span className="text-sm font-semibold">{formatIndianRupee(9800000)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Outstanding:</span>
                        <span className="text-sm font-semibold text-orange-600">{formatIndianRupee(2384000)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Department Distribution */}
                <motion.div 
                  className="bg-white/70 backdrop-blur-lg rounded-xl shadow-md p-5"
                  variants={cardVariants}
                  custom={1}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-gray-600" aria-hidden="true" />
                      <h2 className="text-lg font-semibold text-gray-900">Population Distribution</h2>
                    </div>
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={departmentDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({name, percent}: {name: string; percent: number}) => 
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {departmentDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`${value} members`, 'Count']} />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {distributionStats.map((stat, index) => (
                        <div key={index} className={`text-center p-2 ${stat.bgColor} rounded-lg`}>
                          <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                          <p className="text-sm font-semibold text-gray-900">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Secondary Stats Grid */}
            <motion.div 
              className="mt-6 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto"
              style={{ minWidth: 0 }}
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {extraStats.slice(0, 4).map((item, index) => (
                <motion.div 
                  key={item.name} 
                  className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-4"
                  variants={cardVariants}
                  custom={index}
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg p-2.5 bg-gray-100/80">
                      <item.icon className="h-5 w-5 text-[#8b5cf6]" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-500 mb-1">{item.name}</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-xl font-semibold text-gray-900 truncate">{item.value}</p>
                        <span className={`text-xs font-medium ${
                          item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.change}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Activity and Events Section */}
            <motion.div 
              className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
              }}
            >
              {/* Recent Activity Card */}
              <motion.div 
                className="bg-white/70 backdrop-blur-lg rounded-xl shadow-md p-5"
                variants={cardVariants}
                custom={0}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-[#8b5cf6]" />
                    <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                  </div>
                  <button className="text-sm text-[#8b5cf6] hover:text-purple-700 font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <motion.div 
                      key={activity.id} 
                      className="flex items-start gap-3 p-3 hover:bg-gray-50/70 rounded-lg transition-colors duration-150"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <div className="bg-purple-100 rounded-lg p-2 flex-shrink-0">
                        <activity.icon className="h-4 w-4 text-[#8b5cf6]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 mb-0.5">{activity.title}</p>
                        <p className="text-xs text-gray-500 mb-1">{activity.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-400">{activity.timestamp}</p>
                          <button className="text-xs text-[#8b5cf6] hover:text-purple-700 font-medium">
                            {activity.action}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Upcoming Events Card */}
              <motion.div 
                className="bg-white/70 backdrop-blur-lg rounded-xl shadow-md p-5"
                variants={cardVariants}
                custom={1}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-[#8b5cf6]" />
                    <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
                  </div>
                  <button className="text-sm bg-[#8b5cf6] hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg transition-colors">
                    Add Event
                  </button>
                </div>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <motion.div 
                      key={event.id} 
                      className="flex items-start gap-3 p-3 bg-gray-50/70 hover:bg-purple-50/70 rounded-lg transition-colors duration-150"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <div className="bg-purple-100 rounded-lg p-2 text-center min-w-[4rem]">
                        <p className="text-xs font-medium text-[#8b5cf6] mb-0.5">
                          {event.date.split(',')[0]}
                        </p>
                        <p className="text-sm font-bold text-purple-800">
                          {event.time.split(' ')[0]}
                        </p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 mb-1">{event.title}</p>
                        <p className="text-xs text-gray-500 mb-0.5">{event.location}</p>
                        <p className="text-xs text-gray-500">{event.description}</p>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button className="text-xs bg-purple-50 text-[#8b5cf6] px-3 py-1 rounded-lg hover:bg-purple-100 transition-colors font-medium">
                          Details
                        </button>
                        <button className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors">
                          RSVP
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
        {activeItem === 'Finance' && <FinanceSection />}
        {activeItem === 'Scheduling' && <SchedulingSection />}
        {/* Render Calendar Section when active */}
        {activeItem === 'Calendar' && <CalendarDashboard />}
        {/* Add other sections here for Chatbot, Quiz, Content */}
        {activeItem === 'Students' && <StudentDashboard />}
      </main>
    </div>
  );
};

export default Dashboard;