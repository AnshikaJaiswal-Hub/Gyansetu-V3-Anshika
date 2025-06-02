import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Bell, Search, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data for demonstration purposes
const mockEvents = [
  { id: 1, title: 'Morning Assembly', date: new Date().toISOString().split('T')[0], time: '8:00 AM', type: 'regular', priority: 'medium' },
  { id: 2, title: 'Math Class', date: new Date().toISOString().split('T')[0], time: '9:00 AM', type: 'class', priority: 'high' },
  { id: 3, title: 'Science Lab', date: new Date().toISOString().split('T')[0], time: '11:00 AM', type: 'class', priority: 'high' },
  { id: 4, title: 'Lunch Break', date: new Date().toISOString().split('T')[0], time: '1:00 PM', type: 'regular', priority: 'low' },
  { id: 5, title: 'English Assignment Due', date: new Date().toISOString().split('T')[0], time: '3:00 PM', type: 'assignment', priority: 'high' },
  { id: 6, title: 'Sports Practice', date: new Date().toISOString().split('T')[0], time: '4:00 PM', type: 'regular', priority: 'medium' },
  { id: 7, title: 'Project Presentation', date: '2025-05-20', time: '2:00 PM', type: 'meeting', priority: 'urgent' },
  { id: 8, title: 'Computer Science Club', date: '2025-05-22', time: '4:00 PM', type: 'regular', priority: 'low' },
  { id: 9, title: 'English Essay Due', date: '2025-05-25', time: '9:00 AM', type: 'assignment', priority: 'high' },
  { id: 10, title: 'Biology Field Trip', date: '2025-05-26', time: '8:00 AM', type: 'holiday', priority: 'medium' },
  { id: 11, title: 'Independence Day Celebration', date: '2025-05-22', time: '10:00 AM', type: 'holiday', priority: 'low' },
  { id: 12, title: 'Math Competition', date: '2025-05-23', time: '9:00 AM', type: 'exam', priority: 'high' },
  { id: 13, title: 'Parent-Teacher Meeting', date: '2025-05-27', time: '4:30 PM', type: 'meeting', priority: 'high' },
  { id: 14, title: 'Library Study Session', date: '2025-05-20', time: '3:00 PM', type: 'regular', priority: 'low' },
  { id: 15, title: 'Coding Workshop', date: '2025-05-21', time: '3:30 PM', type: 'class', priority: 'medium' },
  { id: 16, title: 'School Concert', date: '2025-05-20', time: '5:00 PM', type: 'holiday', priority: 'medium' },
  { id: 17, title: 'Morning Meditation', date: '2025-05-20', time: '7:00 AM', type: 'regular', priority: 'low' },
  { id: 18, title: 'Breakfast with Study Group', date: '2025-05-20', time: '8:00 AM', type: 'meeting', priority: 'medium' },
  { id: 19, title: 'Evening Yoga Session', date: '2025-05-20', time: '6:00 PM', type: 'regular', priority: 'medium' },
  { id: 20, title: 'Research Paper Review', date: '2025-05-20', time: '9:00 AM', type: 'assignment', priority: 'high' },
  { id: 21, title: 'Late Night Study Session', date: '2025-05-29', time: '2:00 AM', type: 'regular', priority: 'low' },
];

const mockTimetable = [
  { id: 1, day: 'Monday', periods: [
    { id: 1, subject: 'Math', time: '9:00 AM - 10:00 AM', teacher: 'Dr. Smith', room: 'R101' },
    { id: 2, subject: 'Physics', time: '10:15 AM - 11:15 AM', teacher: 'Ms. Johnson', room: 'Lab 3' },
    { id: 3, subject: 'English', time: '11:30 AM - 12:30 PM', teacher: 'Mr. Williams', room: 'R201' },
    { id: 4, subject: 'Lunch Break', time: '12:30 PM - 1:30 PM', teacher: '', room: 'Cafeteria' },
    { id: 5, subject: 'Computer Science', time: '1:30 PM - 2:30 PM', teacher: 'Dr. Lee', room: 'Lab 1' },
    { id: 6, subject: 'History', time: '2:45 PM - 3:45 PM', teacher: 'Ms. Davis', room: 'R301' },
  ]},
  { id: 2, day: 'Tuesday', periods: [
    { id: 1, subject: 'Chemistry', time: '9:00 AM - 10:00 AM', teacher: 'Dr. Miller', room: 'Lab 2' },
    { id: 2, subject: 'Math', time: '10:15 AM - 11:15 AM', teacher: 'Dr. Smith', room: 'R101' },
    { id: 3, subject: 'Physical Education', time: '11:30 AM - 12:30 PM', teacher: 'Mr. Brown', room: 'Gym' },
    { id: 4, subject: 'Lunch Break', time: '12:30 PM - 1:30 PM', teacher: '', room: 'Cafeteria' },
    { id: 5, subject: 'Biology', time: '1:30 PM - 2:30 PM', teacher: 'Ms. Wilson', room: 'Lab 4' },
    { id: 6, subject: 'Geography', time: '2:45 PM - 3:45 PM', teacher: 'Mr. Taylor', room: 'R302' },
  ]},
  // More days would be added here
];

const mockAnnouncements = [
  { id: 1, title: 'School Closed Due to Weather Alert', date: '2025-05-20', content: 'Due to severe weather warnings, the school will remain closed tomorrow. All assignments will have extended deadlines.', priority: 'urgent' },
  { id: 2, title: 'Annual Function Preparation', date: '2025-05-18', content: 'All students are required to participate in the annual function preparations starting next week. Please register with your class teacher.', priority: 'high' },
  { id: 3, title: 'New Library Books', date: '2025-05-20', content: 'The library has added 200+ new books on various subjects including programming, AI, history and literature. Students are encouraged to check them out.', priority: 'medium' },
  { id: 4, title: 'Career Fair Next Month', date: '2025-05-22', content: 'A career fair will be organized next month on June 15th. Various companies and universities will be participating. Prepare your portfolios in advance.', priority: 'low' },
  { id: 5, title: 'Scholarship Applications Open', date: '2025-05-24', content: 'Applications for merit scholarships are now open. Last date to apply is June 15th. Please contact the administration office for more details.', priority: 'high' },
  { id: 6, title: 'Summer Camp Registration', date: '2025-05-19', content: 'Registration for summer camps is now open. This year we have coding, robotics, sports, and arts camps available. Limited spots!', priority: 'medium' },
];

// Helper function to generate calendar days
const generateCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];
  
  // Add previous month's days
  const firstDayOfWeek = firstDay.getDay();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = new Date(year, month, -i);
    days.push({ date: day, currentMonth: false });
  }
  
  // Add current month's days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const day = new Date(year, month, i);
    days.push({ date: day, currentMonth: true });
  }
  
  // Add next month's days to complete the grid
  const remainingDays = 42 - days.length; // 6 rows × 7 columns
  for (let i = 1; i <= remainingDays; i++) {
    const day = new Date(year, month + 1, i);
    days.push({ date: day, currentMonth: false });
  }
  
  return days;
};

// Main component
const ParentCalendar = () => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [calendarView, setCalendarView] = useState('weekly');
  const [currentDate, setCurrentDate] = useState(new Date()); // Changed to current date
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAnnouncements, setFilteredAnnouncements] = useState(mockAnnouncements);
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const timeSlots = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'];
  
  // Filter announcements based on search query
  useEffect(() => {
    setFilteredAnnouncements(
      mockAnnouncements.filter(announcement => 
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);
  
  // Format date for comparison with events
  const formatDateForComparison = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  
  // Get events for a specific date
  const getEventsForDate = (date) => {
    const formattedDate = formatDateForComparison(date);
    return mockEvents.filter(event => event.date === formattedDate);
  };
  
  // Hardcoded events for each time slot for May 20, 2025
  const getEventsForTimeSlot = (date, timeSlot) => {
    const formattedDate = formatDateForComparison(date);
    const today = new Date().toISOString().split('T')[0];
    
    // Return events for the selected date and time slot
    return mockEvents.filter(event => {
      const eventDate = event.date;
      const eventTime = event.time;
      
      // Check if event date matches the formatted date
      if (eventDate !== formattedDate) {
        return false;
      }
      
      // Check if event time is within the time slot
      // This assumes timeSlot is like '8 AM', '9 AM', etc.
      // We need to convert eventTime to a comparable format.
      const slotParts = timeSlot.split(' ');
      let slotHour = parseInt(slotParts[0]);
      const slotModifier = slotParts[1];
      
      if (slotModifier && slotModifier.toLowerCase() === 'pm' && slotHour < 12) {
        slotHour += 12;
      } else if (slotModifier && slotModifier.toLowerCase() === 'am' && slotHour === 12) {
        slotHour = 0;
      }
      
      const eventTimeObj = timeTo24Hr(eventTime);
      
      // Check if the event hour matches the slot hour
      if (eventTimeObj.hours === slotHour) {
          // For 2 AM, check if the hour is 2 and it's AM
          if (slotHour === 2 && slotModifier && slotModifier.toLowerCase() === 'am') {
              return eventTimeObj.hours === 2 && event.time.toLowerCase().includes('am');
          }
          // For other times, just check the hour
          return true;
      }
      
      return false;
    });
  };
  
  // Get event color based on type
  const getEventTypeColor = (type) => {
    switch (type) {
      case 'exam':
        return {
          bg: 'bg-red-100',
          border: 'border-l-4 border-red-500',
          text: 'text-red-800'
        };
      case 'holiday':
        return {
          bg: 'bg-purple-100',
          border: 'border-l-4 border-purple-500',
          text: 'text-purple-800'
        };
      case 'meeting':
        return {
          bg: 'bg-yellow-100',
          border: 'border-l-4 border-yellow-500',
          text: 'text-yellow-800'
        };
      case 'regular':
        return {
          bg: 'bg-blue-100',
          border: 'border-l-4 border-blue-500',
          text: 'text-blue-800'
        };
      case 'class':
        return {
          bg: 'bg-indigo-100',
          border: 'border-l-4 border-indigo-500',
          text: 'text-indigo-800'
        };
      case 'assignment':
        return {
          bg: 'bg-orange-100',
          border: 'border-l-4 border-orange-500',
          text: 'text-orange-800'
        };
      default:
        return {
          bg: 'bg-gray-100',
          border: 'border-l-4 border-gray-500',
          text: 'text-gray-800'
        };
    }
  };
  
  // Navigation functions
  const goToPreviousPeriod = () => {
    const newDate = new Date(currentDate);
    if (calendarView === 'daily') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (calendarView === 'weekly') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (calendarView === 'monthly') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (calendarView === 'quarterly') {
      newDate.setMonth(newDate.getMonth() - 3);
    } else if (calendarView === 'yearly') {
      newDate.setFullYear(newDate.getFullYear() - 1);
    }
    setCurrentDate(newDate);
  };
  
  const goToNextPeriod = () => {
    const newDate = new Date(currentDate);
    if (calendarView === 'daily') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (calendarView === 'weekly') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (calendarView === 'monthly') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (calendarView === 'quarterly') {
      newDate.setMonth(newDate.getMonth() + 3);
    } else if (calendarView === 'yearly') {
      newDate.setFullYear(newDate.getFullYear() + 1);
    }
    setCurrentDate(newDate);
  };
  
  // Get current week dates
  const getCurrentWeekDates = () => {
    const dates = [];
    const curr = new Date(currentDate);
    const firstDay = curr.getDate() - curr.getDay();
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(curr.setDate(firstDay + i));
      dates.push(day);
    }
    
    return dates;
  };

  // Helper function to convert time to 24-hour format
  const timeTo24Hr = (timeStr) => {
    // Convert "10:00 AM", "2:00 PM", etc. to 24-hour format
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    
    hours = parseInt(hours);
    minutes = minutes ? parseInt(minutes) : 0;
    
    if (modifier && modifier.toLowerCase() === 'pm' && hours < 12) {
      hours += 12;
    } else if (modifier && modifier.toLowerCase() === 'am' && hours === 12) {
      hours = 0;
    }
    
    return { hours, minutes };
  };
  
  // Helper function to check if an event occurs in a given time slot
  const isInTimeSlot = (eventTime, slotTime) => {
    // Convert slot like "10 AM" to 24hr for comparison
    const slotParts = slotTime.split(' ');
    let slotHour = parseInt(slotParts[0]);
    const slotModifier = slotParts[1];
    
    if (slotModifier.toLowerCase() === 'pm' && slotHour < 12) {
      slotHour += 12;
    } else if (slotModifier.toLowerCase() === 'am' && slotHour === 12) {
      slotHour = 0;
    }
    
    // Convert event time to 24hr
    const eventTimeObj = timeTo24Hr(eventTime);
    
    // Allow events to show up in the current hour slot
    return eventTimeObj.hours === slotHour;
  };
  
  // Render priority badge
  const renderPriorityBadge = (priority) => {
    const colors = {
      urgent: 'bg-red-600',
      high: 'bg-orange-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500',
    };
    
    return (
      <span className={`${colors[priority]} text-white text-xs px-2 py-1 rounded-full ml-2`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };
  
  // Render different calendar views
  const renderDailyView = () => {
    const eventsForToday = getEventsForDate(currentDate);
    
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">{currentDate.toDateString()}</h3>
        </div>
        <div className="overflow-y-auto max-h-96">
          {timeSlots.map((timeSlot, index) => (
            <div key={index} className="flex border-b">
              <div className="w-20 p-2 border-r bg-gray-50 text-sm">
                {timeSlot}
              </div>
              <div className="flex-1 p-2 min-h-16">
                {eventsForToday
                  .filter(event => isInTimeSlot(event.time, timeSlot))
                  .map(event => (
                    <div 
                      key={event.id} 
                      className={`p-2 mb-1 rounded ${
                        event.priority === 'high' ? 'bg-red-100 border-l-4 border-red-500' :
                        event.priority === 'medium' ? 'bg-yellow-100 border-l-4 border-yellow-500' : 'bg-green-100 border-l-4 border-green-500'
                      }`}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-gray-600">{event.time}</div>
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderWeeklyView = () => {
    const weekDates = getCurrentWeekDates();
    
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Desktop and tablet view */}
        <div className="hidden md:grid grid-cols-8 border-b">
          <div className="p-2 md:p-3 border-r bg-gray-50"></div>
          {weekDates.map((date, index) => {
            const isToday = date.toDateString() === new Date(2025, 4, 20).toDateString();
            
            return (
              <div 
                key={index} 
                className={`p-2 md:p-3 text-center border-r -ml-2 ${
                  isToday ? 'bg-purple-100 font-bold' : 'bg-gray-50'
                }`}
              >
                <div className="font-medium text-xs md:text-sm">{days[date.getDay()]}</div>
                <div className={`text-xs md:text-sm ${isToday ? 'text-purple-700' : ''}`}>{date.getDate()}</div>
              </div>
            );
          })}
        </div>
        <div className="hidden md:block overflow-y-auto max-h-[calc(100vh-300px)] md:max-h-[600px]">
          {timeSlots.map((timeSlot, timeIndex) => (
            <div key={timeIndex} className="grid grid-cols-8 border-b min-h-[60px]">
              <div className="p-1 md:p-2 border-r bg-gray-50 text-xs md:text-sm font-medium flex items-center justify-center">
                {timeSlot}
              </div>
              {weekDates.map((date, dateIndex) => {
                // Use the hardcoded events for May 20
                const eventsForThisDateAndTime = formatDateForComparison(date) === '2025-05-20' 
                  ? getEventsForTimeSlot(date, timeSlot)
                  : [];
                
                return (
                  <div key={dateIndex} className={`p-1 border-r ${
                    date.toDateString() === new Date(2025, 4, 20).toDateString() ? 'bg-purple-50' : ''
                  }`}>
                    {eventsForThisDateAndTime.map(event => {
                      const colors = getEventTypeColor(event.type);
                      return (
                        <div 
                          key={event.id} 
                          className={`p-1 md:p-2 mb-1 text-xs md:text-sm rounded-md shadow-sm ${colors.bg} ${colors.border}`}
                        >
                          <div className={`font-medium truncate ${colors.text}`}>{event.title}</div>
                          <div className="text-xs text-gray-600 truncate">{event.time}</div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        {/* Mobile view - cards for each day */}
        <div className="md:hidden">
          {weekDates.map((date, dateIndex) => {
            const isToday = date.toDateString() === new Date(2025, 4, 20).toDateString();
            const dateEvents = timeSlots.flatMap(timeSlot => 
              formatDateForComparison(date) === '2025-05-20' 
                ? getEventsForTimeSlot(date, timeSlot)
                : []
            );
            
            return (
              <div 
                key={dateIndex} 
                className={`p-3 border-b ${isToday ? 'bg-purple-50' : ''}`}
              >
                <div className={`font-bold text-sm mb-2 ${isToday ? 'text-purple-700' : ''}`}>
                  {days[date.getDay()]} {date.getDate()}
                </div>
                
                {dateEvents.length > 0 ? (
                  dateEvents.map(event => {
                    const colors = getEventTypeColor(event.type);
                    return (
                      <div 
                        key={event.id} 
                        className={`p-2 mb-2 rounded-md shadow-sm ${colors.bg} ${colors.border}`}
                      >
                        <div className={`font-medium text-sm ${colors.text}`}>{event.title}</div>
                        <div className="text-xs text-gray-600 flex justify-between items-center">
                          <span>{event.time}</span>
                          <span className="capitalize">{event.type}</span>
                          {renderPriorityBadge(event.priority)}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-xs text-gray-400 italic py-2">No events</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Render monthly view
  const renderMonthlyView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const calendarDays = generateCalendarDays(year, month);
    
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-3 md:p-4 border-b bg-purple-50">
          <h3 className="text-base md:text-lg font-medium text-purple-800">{months[month]} {year}</h3>
        </div>
        <div className="grid grid-cols-7 text-center p-1 md:p-2">
          {days.map((day, index) => (
            <div key={index} className="font-medium p-1 md:p-2 text-xs md:text-sm">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 p-1 md:p-2">
          {calendarDays.map((day, index) => {
            const eventsForThisDay = getEventsForDate(day.date);
            const isToday = day.date.toDateString() === new Date(2025, 4, 20).toDateString();
            
            return (
              <div 
                key={index} 
                className={`p-1 h-12 md:h-24 border rounded ${
                  !day.currentMonth ? 'bg-gray-100 text-gray-400' : 
                  isToday ? 'bg-purple-50 border-purple-300' : ''
                }`}
              >
                <div className={`text-right p-0.5 md:p-1 text-xs md:text-sm ${isToday ? 'font-bold text-purple-700' : ''}`}>{day.date.getDate()}</div>
                <div className="overflow-y-auto max-h-6 md:max-h-16 hidden md:block">
                  {eventsForThisDay.slice(0, 2).map(event => {
                    const colors = getEventTypeColor(event.type);
                    return (
                      <div 
                        key={event.id} 
                        className={`p-0.5 md:p-1 mb-0.5 md:mb-1 text-xs rounded truncate ${colors.bg}`}
                      >
                        <span className={`${colors.text}`}>{event.title}</span>
                      </div>
                    );
                  })}
                  {eventsForThisDay.length > 2 && (
                    <div className="text-xs text-gray-500 p-0.5 md:p-1">
                      +{eventsForThisDay.length - 2} more
                    </div>
                  )}
                </div>
                {/* Mobile view - just show dot indicators */}
                <div className="flex justify-center md:hidden">
                  {eventsForThisDay.length > 0 && (
                    <div className="flex space-x-1">
                      {eventsForThisDay.slice(0, Math.min(3, eventsForThisDay.length)).map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-purple-500"></div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Render quarterly view
  const renderQuarterlyView = () => {
    const year = currentDate.getFullYear();
    const quarter = Math.floor(currentDate.getMonth() / 3);
    const quarterMonths = [months[quarter * 3], months[quarter * 3 + 1], months[quarter * 3 + 2]];
    
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-3 md:p-4 border-b bg-purple-50">
          <h3 className="text-base md:text-lg font-medium text-purple-800">Quarter {quarter + 1}, {year}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 p-3 md:p-4">
          {quarterMonths.map((month, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-2 font-medium border-b text-sm md:text-base">
                {month}
              </div>
              <div className="p-2 max-h-64 overflow-y-auto">
                {mockEvents
                  .filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate.getFullYear() === year && Math.floor(eventDate.getMonth() / 3) === quarter;
                  })
                  .map(event => {
                    const colors = getEventTypeColor(event.type);
                    return (
                      <div 
                        key={event.id} 
                        className={`p-2 mb-2 rounded text-xs md:text-sm ${colors.bg} ${colors.border}`}
                      >
                        <div className={`font-medium ${colors.text}`}>{event.title}</div>
                        <div className="text-xs text-gray-600 flex flex-wrap justify-between">
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                          <span>{event.time}</span>
                          <span className="capitalize">({event.type})</span>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render yearly view
  const renderYearlyView = () => {
    const year = currentDate.getFullYear();
    
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-3 md:p-4 border-b bg-purple-50">
          <h3 className="text-base md:text-lg font-medium text-purple-800">Year {year}</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 p-2 md:p-4">
          {months.map((month, index) => {
            const eventsForMonth = mockEvents.filter(event => {
              const eventDate = new Date(event.date);
              return eventDate.getFullYear() === year && eventDate.getMonth() === index;
            });
            
            // Count events by type
            const eventCounts = {};
            eventsForMonth.forEach(event => {
              if (!eventCounts[event.type]) {
                eventCounts[event.type] = 0;
              }
              eventCounts[event.type]++;
            });
            
            return (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className={`p-2 font-medium border-b text-xs md:text-sm ${month === 'May' ? 'bg-purple-100 text-purple-800' : 'bg-gray-50'}`}>
                  {month}
                </div>
                <div className="p-2 h-20 md:h-32 overflow-y-auto">
                  {eventsForMonth.slice(0, 2).map(event => {
                    const colors = getEventTypeColor(event.type);
                    return (
                      <div 
                        key={event.id} 
                        className={`p-1 mb-1 rounded text-xs ${colors.bg}`}
                      >
                        <div className={`truncate ${colors.text}`}>{event.title}</div>
                        <div className="text-xs text-gray-600 truncate">{new Date(event.date).getDate()} | {event.time}</div>
                      </div>
                    );
                  })}
                  
                  {eventsForMonth.length > 2 && (
                    <div className="mt-1 pt-1 border-t text-xs">
                      <div className="font-medium text-gray-700 text-xs">Summary:</div>
                      {Object.keys(eventCounts).slice(0, 3).map(type => (
                        <div key={type} className="flex justify-between text-xs">
                          <span className="capitalize">{type}s:</span>
                          <span className="font-medium">{eventCounts[type]}</span>
                        </div>
                      ))}
                      {Object.keys(eventCounts).length > 3 && (
                        <div className="text-xs text-gray-500 italic">+{Object.keys(eventCounts).length - 3} more types</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  const renderTimetable = () => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-3 md:p-4 border-b bg-purple-50">
          <h3 className="text-base md:text-lg font-medium text-purple-800">Weekly Timetable</h3>
          <p className="text-xs md:text-sm text-gray-600 mt-1">Week of May 20 - 26, 2025</p>
        </div>
        
        {/* Desktop and tablet view */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monday</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tuesday</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Wednesday</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thursday</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Friday</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockTimetable[0].periods.map((period, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {period.time}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <div className="font-medium">{mockTimetable[0].periods[index].subject}</div>
                    <div className="text-xs text-gray-400">{mockTimetable[0].periods[index].room} • {mockTimetable[0].periods[index].teacher}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <div className="font-medium">{mockTimetable[1].periods[index].subject}</div>
                    <div className="text-xs text-gray-400">{mockTimetable[1].periods[index].room} • {mockTimetable[1].periods[index].teacher}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-purple-700 bg-purple-50">
                    <div className="font-medium">
                      {index === 0 ? 'English' : 
                       index === 1 ? 'Art' : 
                       index === 2 ? 'Computer Science' : 
                       index === 3 ? 'Lunch Break' : 
                       index === 4 ? 'Physics' : 
                       'Economics'}
                    </div>
                    <div className="text-xs text-purple-500">
                      {index === 0 ? 'R201' : 
                       index === 1 ? 'Art Studio' : 
                       index === 2 ? 'Lab 1' : 
                       index === 3 ? 'Cafeteria' : 
                       index === 4 ? 'Lab 3' : 
                       'R305'} • {
                      index === 0 ? 'Mr. Williams' : 
                      index === 1 ? 'Ms. Park' : 
                      index === 2 ? 'Dr. Lee' : 
                      index === 3 ? '' : 
                      index === 4 ? 'Ms. Johnson' : 
                      'Mr. Chen'}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <div className="font-medium">
                      {index === 0 ? 'History' : 
                       index === 1 ? 'Math' : 
                       index === 2 ? 'Biology' : 
                       index === 3 ? 'Lunch Break' : 
                       index === 4 ? 'Chemistry' : 
                       'Library'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {index === 0 ? 'R301' : 
                       index === 1 ? 'R101' : 
                       index === 2 ? 'Lab 4' : 
                       index === 3 ? 'Cafeteria' : 
                       index === 4 ? 'Lab 2' : 
                       'Library Hall'} • {
                      index === 0 ? 'Ms. Davis' : 
                      index === 1 ? 'Dr. Smith' : 
                      index === 2 ? 'Ms. Wilson' : 
                      index === 3 ? '' : 
                      index === 4 ? 'Dr. Miller' : 
                      'Ms. Thompson'}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <div className="font-medium">
                      {index === 0 ? 'Physical Education' : 
                       index === 1 ? 'Geography' : 
                       index === 2 ? 'Math' : 
                       index === 3 ? 'Lunch Break' : 
                       index === 4 ? 'English' : 
                       'Club Activities'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {index === 0 ? 'Gym' : 
                       index === 1 ? 'R302' : 
                       index === 2 ? 'R101' : 
                       index === 3 ? 'Cafeteria' : 
                       index === 4 ? 'R201' : 
                       'Various'} • {
                      index === 0 ? 'Mr. Brown' : 
                      index === 1 ? 'Mr. Taylor' : 
                      index === 2 ? 'Dr. Smith' : 
                      index === 3 ? '' : 
                      index === 4 ? 'Mr. Williams' : 
                      'Various'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Mobile view - accordion style */}
        <div className="md:hidden">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, dayIndex) => (
            <div key={dayIndex} className={`border-b ${day === 'Wednesday' ? 'bg-purple-50' : ''}`}>
              <div className={`p-3 font-medium text-sm ${day === 'Wednesday' ? 'text-purple-700' : ''}`}>
                {day}
              </div>
              <div className="px-3 pb-3">
                {mockTimetable[Math.min(dayIndex, 1)].periods.map((period, periodIndex) => (
                  <div key={periodIndex} className="mb-2 border-b pb-2 last:border-b-0 last:pb-0">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">{period.time}</span>
                      <span className={`${day === 'Wednesday' ? 'text-purple-600' : 'text-gray-600'}`}>
                        {dayIndex === 0 ? mockTimetable[0].periods[periodIndex].subject :
                         dayIndex === 1 ? mockTimetable[1].periods[periodIndex].subject :
                         dayIndex === 2 ? (
                           periodIndex === 0 ? 'English' : 
                           periodIndex === 1 ? 'Art' : 
                           periodIndex === 2 ? 'Computer Science' : 
                           periodIndex === 3 ? 'Lunch Break' : 
                           periodIndex === 4 ? 'Physics' : 
                           'Economics'
                         ) :
                         dayIndex === 3 ? (
                           periodIndex === 0 ? 'History' : 
                           periodIndex === 1 ? 'Math' : 
                           periodIndex === 2 ? 'Biology' : 
                           periodIndex === 3 ? 'Lunch Break' : 
                           periodIndex === 4 ? 'Chemistry' : 
                           'Library'
                         ) :
                         (
                           periodIndex === 0 ? 'Physical Education' : 
                           periodIndex === 1 ? 'Geography' : 
                           periodIndex === 2 ? 'Math' : 
                           periodIndex === 3 ? 'Lunch Break' : 
                           periodIndex === 4 ? 'English' : 
                           'Club Activities'
                         )}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {dayIndex === 0 ? mockTimetable[0].periods[periodIndex].room : 
                       dayIndex === 1 ? mockTimetable[1].periods[periodIndex].room :
                       dayIndex === 2 ? (
                         periodIndex === 0 ? 'R201' : 
                         periodIndex === 1 ? 'Art Studio' : 
                         periodIndex === 2 ? 'Lab 1' : 
                         periodIndex === 3 ? 'Cafeteria' : 
                         periodIndex === 4 ? 'Lab 3' : 
                         'R305'
                       ) :
                       dayIndex === 3 ? (
                         periodIndex === 0 ? 'R301' : 
                         periodIndex === 1 ? 'R101' : 
                         periodIndex === 2 ? 'Lab 4' : 
                         periodIndex === 3 ? 'Cafeteria' : 
                         periodIndex === 4 ? 'Lab 2' : 
                         'Library Hall'
                       ) :
                       (
                         periodIndex === 0 ? 'Gym' : 
                         periodIndex === 1 ? 'R302' : 
                         periodIndex === 2 ? 'R101' : 
                         periodIndex === 3 ? 'Cafeteria' : 
                         periodIndex === 4 ? 'R201' : 
                         'Various'
                       )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render announcements
  const renderAnnouncements = () => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-3 md:p-4 border-b bg-purple-50">
          <h3 className="text-base md:text-lg font-medium text-purple-800">Announcements</h3>
          <div className="mt-2 relative">
            <input
              type="text"
              className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
          </div>
        </div>
        <div className="overflow-y-auto max-h-[calc(100vh-300px)] md:max-h-[600px]">
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map(announcement => (
              <div key={announcement.id} className={`p-3 md:p-4 border-b ${
                announcement.priority === 'urgent' ? 'bg-red-50' : ''
              }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <h4 className="text-sm md:text-base font-medium mb-1 md:mb-0">
                    {announcement.title}
                    {renderPriorityBadge(announcement.priority)}
                  </h4>
                  <span className="text-xs md:text-sm text-gray-500">{new Date(announcement.date).toLocaleDateString()}</span>
                </div>
                <p className="mt-2 text-xs md:text-sm text-gray-600">{announcement.content}</p>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">
              No announcements found matching "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Simpler, more visible styling for the Calendar tab
  return (
    <div className='bg-gray-100 pt-10 pr-10 pb-10'>
    <div className="min-h-screen bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400 rounded-[30px] p-6">
      <main className="container mx-auto px-3 md:px-4 py-3 md:py-6">
        <h1 className="text-3xl text-center font-medium text-black">Calendar</h1>
        {/* Tab navigation */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'calendar'
                ? "border-b-2 border-violet-500 text-violet-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab('calendar')}
          >
            <Calendar className="inline-block mr-1 md:mr-2" size={16} />
            Calendar
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'timetable'
                ? "border-b-2 border-violet-500 text-violet-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab('timetable')}
          >
            <Clock className="inline-block mr-1 md:mr-2" size={16} />
            Timetable
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'announcements'
                ? "border-b-2 border-violet-500 text-violet-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab('announcements')}
          >
            <Bell className="inline-block mr-1 md:mr-2" size={16} />
            Announcements
          </button>
        </div>
        
        {/* Calendar view navigation */}
        {activeTab === 'calendar' && (
          <div className="mb-4 md:mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
              <div className="flex flex-wrap gap-4 w-full md:w-auto mb-6">
                <button
                  className={`px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-md ${calendarView === 'daily' ? 'bg-purple-600 text-white font-medium' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setCalendarView('daily')}
                >
                  Day
                </button>
                <button
                  className={`px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-md ${calendarView === 'weekly' ? 'bg-purple-600 text-white font-medium' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setCalendarView('weekly')}
                >
                  Week
                </button>
                <button
                  className={`px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-md ${calendarView === 'monthly' ? 'bg-purple-600 text-white font-medium' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setCalendarView('monthly')}
                >
                  Month
                </button>
                <button
                  className={`px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-md ${calendarView === 'quarterly' ? 'bg-purple-600 text-white font-medium' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setCalendarView('quarterly')}
                >
                  Quarter
                </button>
                <button
                  className={`px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-md ${calendarView === 'yearly' ? 'bg-purple-600 text-white font-medium' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setCalendarView('yearly')}
                >
                  Year
                </button>
              </div>
              
              <div className="flex items-center w-full md:w-auto justify-between md:justify-end space-x-2 md:space-x-4">
                <button
                  className="p-1 rounded-full hover:bg-gray-200"
                  onClick={goToPreviousPeriod}
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="font-medium text-sm md:text-base truncate max-w-[200px]">
                  {calendarView === 'daily' && currentDate.toDateString()}
                  {calendarView === 'weekly' && `Week of ${getCurrentWeekDates()[0].toLocaleDateString()} - ${getCurrentWeekDates()[6].toLocaleDateString()}`}
                  {calendarView === 'monthly' && `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                  {calendarView === 'quarterly' && `Q${Math.floor(currentDate.getMonth() / 3) + 1} ${currentDate.getFullYear()}`}
                  {calendarView === 'yearly' && currentDate.getFullYear()}
                </span>
                <button
                  className="p-1 rounded-full hover:bg-gray-200"
                  onClick={goToNextPeriod}
                >
                  <ChevronRight size={18} />
                </button>
                <button
                  className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-purple-600 text-white rounded-md border hover:bg-purple-700"
                  onClick={() => setCurrentDate(new Date())}
                >
                  Today
                </button>
              </div>
            </div>
            
            {calendarView === 'daily' && renderDailyView()}
            {calendarView === 'weekly' && renderWeeklyView()}
            {calendarView === 'monthly' && renderMonthlyView()}
            {calendarView === 'quarterly' && renderQuarterlyView()}
            {calendarView === 'yearly' && renderYearlyView()}
          </div>
        )}
        
        {/* Timetable view */}
        {activeTab === 'timetable' && renderTimetable()}
        
        {/* Announcements view */}
        {activeTab === 'announcements' && renderAnnouncements()}
      </main>
    </div>
    </div>
  );
};

export default ParentCalendar;