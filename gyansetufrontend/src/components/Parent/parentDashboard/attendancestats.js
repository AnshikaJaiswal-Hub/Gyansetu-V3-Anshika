// attendancestats.js
import { useState, useEffect } from 'react';

// Function to generate attendance data for a given academic year
export const generateAttendanceData = (academicYear = '2024-2025') => {
  // Define academic year boundaries based on the selected academic year
  let yearStart, yearEnd;
  
  if (academicYear === '2024-2025') {
    yearStart = new Date(2024, 8, 1); // September 1, 2024
    yearEnd = new Date(2025, 5, 30);  // June 30, 2025
  } else if (academicYear === '2023-2024') {
    yearStart = new Date(2023, 8, 1); // September 1, 2023
    yearEnd = new Date(2024, 5, 30);  // June 30, 2024 
  } else {
    // Default to current academic year
    yearStart = new Date(2024, 8, 1);
    yearEnd = new Date(2025, 5, 30);
  }
  
  const currentDate = new Date();
  
  const mockData = {};
  let totalSchoolDays = 0;
  let daysAttended = 0;
  
  // Loop through each day of the academic year
  let currentDay = new Date(yearStart);
  while (currentDay <= yearEnd) {
    // Only add attendance for past days
    if (currentDay < currentDate) {
      const year = currentDay.getFullYear();
      const month = currentDay.getMonth();
      const day = currentDay.getDate();
      
      // Mark weekends and specific pattern days as not-attended
      const dayOfWeek = currentDay.getDay(); // 0 is Sunday, 6 is Saturday
      let status;
      
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        // Weekends are marked as not-attended
        status = "not-attended";
      } else {
        // Count as a school day
        totalSchoolDays++;
        
        // Create a more interesting pattern with some randomness
        // About 90% attendance rate with some patterns
        if (
          day % 14 === 3 || // Every 3rd, 17th of month
          (month === 11 && day >= 1 && day <= 2) || // Absent after Thanksgiving
          (month === 2 && (day === 3 || day === 22)) || // Random absences
          Math.random() < 0.05 // Random 5% absences
        ) {
          status = "not-attended";
        } else {
          status = "attended";
          daysAttended++;
        }
      }
      
      // Also mark some special holidays as not-attended
      const monthDay = `${month+1}-${day}`;
      if (
        monthDay === "12-25" || // Christmas
        monthDay === "1-1" ||   // New Year's Day
        monthDay === "11-24" || // Thanksgiving
        monthDay === "11-25" || // Day after Thanksgiving
        monthDay === "10-31" || // Halloween
        (month === 11 && day >= 20 && day <= 31) || // Winter break
        (month === 2 && day >= 15 && day <= 21)    // Spring break
      ) {
        status = "not-attended";
      }
      
      const dateKey = formatDate(year, month, day);
      mockData[dateKey] = status;
    }
    
    // Move to next day
    currentDay.setDate(currentDay.getDate() + 1);
  }
  
  // Calculate attendance statistics
  const stats = {
    total: totalSchoolDays,
    attended: daysAttended,
    absent: totalSchoolDays - daysAttended,
    percentage: totalSchoolDays > 0 ? Math.round((daysAttended / totalSchoolDays) * 100) : 0
  };
  
  return { attendanceData: mockData, attendanceStats: stats };
};

// Static attendance data for demo purposes (in case direct import is needed)
export const staticAttendanceStats = {
  total: 120,
  attended: 108,
  absent: 12,
  percentage: 90
};

// Custom hook to calculate and manage attendance statistics
export const useAttendanceStats = (academicYear) => {
  const [attendanceData, setAttendanceData] = useState({});
  const [attendanceStats, setAttendanceStats] = useState({
    total: 0,
    attended: 0,
    absent: 0,
    percentage: 0
  });
  
  // Generate attendance data and calculate statistics
  useEffect(() => {
    const { attendanceData: data, attendanceStats: stats } = generateAttendanceData(academicYear);
    setAttendanceData(data);
    setAttendanceStats(stats);
  }, [academicYear]);
  
  return { attendanceData, attendanceStats };
};

// Function to get attendance status color
export const getAttendanceStatusColor = (status) => {
  switch(status) {
    case 'attended':
      return 'bg-emerald-400';
    case 'not-attended':
      return 'bg-red-400';
    default:
      return 'bg-gray-200';
  }
};

// Helper functions for calendar operations
export const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getFirstDayOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

export const getMonthName = (date) => {
  return date.toLocaleString('default', { month: 'long' });
};

export const formatDate = (year, month, day) => {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};