import React, { createContext, useContext, useState } from 'react';

const InstituteContext = createContext();

export const InstituteProvider = ({ children }) => {
  // Shared state for classes
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Class 10-A",
      grade: "10",
      section: "A",
      subject: "Mathematics",
      teacher: { id: 1, name: "Sarah Wilson", email: "sarah.wilson@school.edu" },
      students: [
        {
          id: 1,
          firstName: "Rahul",
          lastName: "Sharma",
          rollNumber: "STU001",
          email: "rahul.sharma@gyansetu.edu",
          phone: "+91 98765 43210",
          parentPhone: "+91 98765 43200",
          address: "123 MG Road, Delhi",
          dateOfBirth: "2008-05-15",
          joiningDate: "2023-01-15",
          password: "Rahul@123"
        },
        {
          id: 2,
          firstName: "Priya",
          lastName: "Patel",
          rollNumber: "STU002",
          email: "priya.patel@gyansetu.edu",
          phone: "+91 98765 43211",
          parentPhone: "+91 98765 43201",
          address: "456 Park Street, Mumbai",
          dateOfBirth: "2008-08-22",
          joiningDate: "2023-02-20",
          password: "Priya@456"
        }
      ],
      schedule: {
        days: ["Monday", "Wednesday", "Friday"],
        time: "9:00 AM - 10:30 AM"
      },
      room: "Room 101",
      capacity: 30,
      status: "Active",
      description: "Advanced Mathematics for Grade 10 students",
      createdDate: "2023-01-10"
    },
    {
      id: 2,
      name: "Class 9-B",
      grade: "9",
      section: "B",
      subject: "Physics",
      teacher: { id: 2, name: "John Smith", email: "john.smith@school.edu" },
      students: [
        {
          id: 4,
          firstName: "Sneha",
          lastName: "Gupta",
          rollNumber: "STU004",
          email: "sneha.gupta@gyansetu.edu",
          phone: "+91 98765 43213",
          parentPhone: "+91 98765 43203",
          address: "321 Sector 12, Noida",
          dateOfBirth: "2009-07-18",
          joiningDate: "2023-03-10",
          password: "Sneha@789"
        },
        {
          id: 5,
          firstName: "Karan",
          lastName: "Mehta",
          rollNumber: "STU005",
          email: "karan.mehta@gyansetu.edu",
          phone: "+91 98765 43214",
          parentPhone: "+91 98765 43204",
          address: "654 Bandra West, Mumbai",
          dateOfBirth: "2009-11-25",
          joiningDate: "2023-04-05",
          password: "Karan@123"
        }
      ],
      schedule: {
        days: ["Tuesday", "Thursday"],
        time: "11:00 AM - 12:30 PM"
      },
      room: "Room 203",
      capacity: 25,
      status: "Active",
      description: "Introduction to Physics concepts",
      createdDate: "2023-02-15"
    }
  ]);

  // Shared state for teachers
  const [teachers] = useState([
    { id: 1, name: "Sarah Wilson", subject: "Mathematics", email: "sarah.wilson@school.edu" },
    { id: 2, name: "John Smith", subject: "Physics", email: "john.smith@school.edu" },
    { id: 3, name: "Emily Johnson", subject: "Chemistry", email: "emily.johnson@school.edu" },
    { id: 4, name: "Michael Brown", subject: "English", email: "michael.brown@school.edu" },
    { id: 5, name: "Lisa Davis", subject: "History", email: "lisa.davis@school.edu" },
    { id: 6, name: "David Wilson", subject: "Biology", email: "david.wilson@school.edu" }
  ]);

  // Function to add a new class
  const addClass = (newClass) => {
    setClasses(prevClasses => [...prevClasses, newClass]);
  };

  // Function to update a class
  const updateClass = (updatedClass) => {
    setClasses(prevClasses => 
      prevClasses.map(c => c.id === updatedClass.id ? updatedClass : c)
    );
  };

  // Function to delete a class
  const deleteClass = (classId) => {
    setClasses(prevClasses => prevClasses.filter(c => c.id !== classId));
  };

  // Function to add a student to a class
  const addStudentToClass = (classId, student) => {
    setClasses(prevClasses =>
      prevClasses.map(c =>
        c.id === classId
          ? { ...c, students: [...c.students, student] }
          : c
      )
    );
  };

  // Function to remove a student from a class
  const removeStudentFromClass = (classId, studentId) => {
    setClasses(prevClasses =>
      prevClasses.map(c =>
        c.id === classId
          ? { ...c, students: c.students.filter(s => s.id !== studentId) }
          : c
      )
    );
  };

  // Function to get all students across all classes
  const getAllStudents = () => {
    return classes.reduce((allStudents, classItem) => {
      const studentsWithClass = classItem.students.map(student => ({
        ...student,
        class: classItem.name,
        subject: classItem.subject
      }));
      return [...allStudents, ...studentsWithClass];
    }, []);
  };

  return (
    <InstituteContext.Provider value={{
      classes,
      teachers,
      addClass,
      updateClass,
      deleteClass,
      addStudentToClass,
      removeStudentFromClass,
      getAllStudents
    }}>
      {children}
    </InstituteContext.Provider>
  );
};

export const useInstitute = () => {
  const context = useContext(InstituteContext);
  if (!context) {
    throw new Error('useInstitute must be used within an InstituteProvider');
  }
  return context;
}; 