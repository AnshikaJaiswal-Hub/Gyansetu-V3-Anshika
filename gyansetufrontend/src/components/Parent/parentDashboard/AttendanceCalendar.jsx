import React, { useState, useEffect } from 'react';

const AttendanceCalendar = () => {
  // Sample student data
  const studentName = "Sadaf Aalia";
  
  // State variables
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [academicYear, setAcademicYear] = useState('2024-2025');
  const [attendanceData, setAttendanceData] = useState({});
  
  // Generate attendance data for all days in the month - restricted to academic year
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const currentDate = new Date();
    
    // Define academic year start and end dates (typically September to June)
    const academicYearStartDate = new Date(2024, 8, 1); // September 1, 2024
    const academicYearEndDate = new Date(2025, 5, 30);  // June 30, 2025
    
    // Create attendance data for each day in the month
    const mockData = {};
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      
      // Only add attendance for past days that are within the academic year
      if (date < currentDate && date >= academicYearStartDate && date <= academicYearEndDate) {
        // Mark weekends as not-attended for demonstration purposes
        const dayOfWeek = date.getDay(); // 0 is Sunday, 6 is Saturday
        let status;
        
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          // Weekends are marked as not-attended
          status = "not-attended";
        } else if (day % 10 === 1 || day % 10 === 7) {
          status = "not-attended"; // Every 1st, 7th, 11th, 17th, 21st, 27th
        } else {
          status = "attended"; // All other days
        }
        
        const dateKey = formatDate(year, month, day);
        mockData[dateKey] = status;
      }
    }
    
    setAttendanceData(mockData);
  }, [currentMonth]);
  
  // Get days in month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  // Format date to YYYY-MM-DD
  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };
  
  // Navigation to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Navigation to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Get attendance status color
  const getAttendanceStatusColor = (status) => {
    switch(status) {
      case 'attended':
        return 'bg-[#c1d956]';
      case 'not-attended':
        return 'bg-violet-500';
      default:
        return 'bg-gray-300';
    }
  };
  
  // Render calendar grid
  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const today = new Date();
    
    // Create blank days for beginning of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-12 sm:h-16 w-full"></div>
      );
    }
    
    // Create days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dateStr = formatDate(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const attendanceStatus = attendanceData[dateStr];
      const isPastDay = date < today;
      const isToday = date.getDate() === today.getDate() && 
                      date.getMonth() === today.getMonth() && 
                      date.getFullYear() === today.getFullYear();
      
      days.push(
        <div key={day} className="flex flex-col items-center h-12 sm:h-16">
          <div className={`h-6 w-6 sm:h-8 sm:w-8 mb-1 rounded-full flex items-center justify-center text-sm sm:text-base
                          ${isToday ? 'border-2 border-black' : ''}`}>
            {day}
          </div>
          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded ${
            isPastDay 
              ? (attendanceStatus ? getAttendanceStatusColor(attendanceStatus) : 'bg-gray-100')
              : 'bg-gray-100'
          }`}></div>
        </div>
      );
    }
    
    return days;
  };
  
  // Get month name
  const getMonthName = (date) => {
    return date.toLocaleString('default', { month: 'long' });
  };
  
  // Weekday headers
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  return (
    <div className='bg-gray-100 p-4 sm:p-6 md:p-10'>
      <div className="bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400 rounded-4xl min-h-screen p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-violet-600 mb-4 ml-2 sm:ml-6">Attendance</h1>
        
        <div className="bg-gray-100 rounded-4xl p-4 sm:p-6 mt-4">
          <h2 className="text-base sm:text-lg font-semibold mb-4 ml-2 sm:ml-3">{studentName}</h2>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 mb-4">
            {/* Academic year selector */}
            <div className="relative w-full sm:w-auto">
              <select 
                value={academicYear} 
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full sm:w-auto appearance-none rounded-2xl py-2 pl-3 pr-10 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm sm:text-base"
              >
                <option value="2024-2025">Academic Year 2024-2025</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
            
            {/* Month navigation */}
            <div className="flex items-center bg-white rounded-2xl w-full sm:w-auto">
              <button onClick={prevMonth} className="px-2 sm:px-3 py-2 rounded-full hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="px-2 sm:px-4 py-2 font-medium text-sm sm:text-base">{getMonthName(currentMonth)}</div>
              <button onClick={nextMonth} className="px-2 sm:px-3 py-2 rounded-full hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Calendar */}
          <div className="mt-4">
            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs sm:text-sm text-gray-500 mb-2">
              {weekdays.map((day, index) => (
                <div key={index}>{day}</div>
              ))}
            </div>
            
            {/* Day numbers with attendance indicators */}
            <div className="grid grid-cols-7 gap-1 text-center mt-2">
              {renderCalendarDays()}
            </div>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-6 sm:mt-8">
              <div className="flex items-center">
                <div className="h-3 w-3 sm:h-4 sm:w-4 bg-[#c1d956] rounded mr-2"></div>
                <span className="text-xs sm:text-sm">Attended</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 sm:h-4 sm:w-4 bg-violet-500 rounded mr-2"></div>
                <span className="text-xs sm:text-sm">Not attended</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;