import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Filter,
  MoreVertical,
  Users,
  Clock,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronRight,
  Edit,
  Trash2,
  UserPlus,
  Eye,
  X,
  Save,
  User,
  Check
} from 'lucide-react';
import { useInstitute } from '../../context/InstituteContext';

const Classes = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedClasses, setExpandedClasses] = useState({});
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [showAssignTeacherModal, setShowAssignTeacherModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const { 
    classes, 
    addClass, 
    updateClass, 
    deleteClass 
  } = useInstitute();

  // Check for openAddClass state when component mounts
  useEffect(() => {
    if (location.state?.openAddClass) {
      setShowAddClassModal(true);
    }
  }, [location.state]);

  // Available subjects
  const subjects = [
    "Mathematics", 
    "Physics", 
    "Chemistry", 
    "Biology", 
    "English", 
    "History", 
    "Geography", 
    "Computer Science",
    "Economics",
    "Business Studies",
    "Physical Education",
    "Art",
    "Music",
    "Social Studies",
    "Environmental Science"
  ];

  // Available teachers
  const availableTeachers = [
    { id: 1, name: "Dr. Sarah Johnson", email: "sarah.j@example.com", subject: "Mathematics", qualification: "Ph.D. in Mathematics" },
    { id: 2, name: "Prof. Michael Chen", email: "michael.c@example.com", subject: "Physics", qualification: "Ph.D. in Physics" },
    { id: 3, name: "Dr. Emily Brown", email: "emily.b@example.com", subject: "Chemistry", qualification: "Ph.D. in Chemistry" },
    { id: 4, name: "Dr. James Wilson", email: "james.w@example.com", subject: "Biology", qualification: "Ph.D. in Biology" },
    { id: 5, name: "Ms. Lisa Anderson", email: "lisa.a@example.com", subject: "English", qualification: "M.A. in English Literature" },
    { id: 6, name: "Mr. David Kumar", email: "david.k@example.com", subject: "History", qualification: "M.A. in History" },
    { id: 7, name: "Ms. Priya Sharma", email: "priya.s@example.com", subject: "Geography", qualification: "M.Sc. in Geography" },
    { id: 8, name: "Mr. Alex Thompson", email: "alex.t@example.com", subject: "Computer Science", qualification: "M.Tech in Computer Science" },
    { id: 9, name: "Dr. Robert Martinez", email: "robert.m@example.com", subject: "Economics", qualification: "Ph.D. in Economics" },
    { id: 10, name: "Ms. Rachel Green", email: "rachel.g@example.com", subject: "Business Studies", qualification: "MBA" },
    { id: 11, name: "Mr. John Smith", email: "john.s@example.com", subject: "Physical Education", qualification: "B.P.Ed" },
    { id: 12, name: "Ms. Sophia Lee", email: "sophia.l@example.com", subject: "Art", qualification: "M.F.A. in Fine Arts" },
    { id: 13, name: "Mr. Daniel Park", email: "daniel.p@example.com", subject: "Music", qualification: "M.Mus in Music" },
    { id: 14, name: "Dr. Maria Garcia", email: "maria.g@example.com", subject: "Social Studies", qualification: "Ph.D. in Sociology" },
    { id: 15, name: "Ms. Aisha Khan", email: "aisha.k@example.com", subject: "Environmental Science", qualification: "M.Sc. in Environmental Science" },
    { id: 16, name: "Dr. William Taylor", email: "william.t@example.com", subject: "Mathematics", qualification: "Ph.D. in Applied Mathematics" },
    { id: 17, name: "Ms. Emma Davis", email: "emma.d@example.com", subject: "Physics", qualification: "M.Sc. in Physics" },
    { id: 18, name: "Mr. Raj Patel", email: "raj.p@example.com", subject: "Chemistry", qualification: "M.Sc. in Chemistry" },
    { id: 19, name: "Dr. Susan White", email: "susan.w@example.com", subject: "Biology", qualification: "Ph.D. in Molecular Biology" },
    { id: 20, name: "Mr. Kevin Zhang", email: "kevin.z@example.com", subject: "Computer Science", qualification: "M.Tech in Software Engineering" }
  ];

  // Form state for adding new class
  const [newClass, setNewClass] = useState({
    name: '',
    grade: '',
    section: '',
    teacherId: '',
    room: '',
    capacity: ''
  });

  const handleAddClass = () => {
    const selectedTeacher = availableTeachers.find(t => t.id === parseInt(newClass.teacherId));
    
    const classToAdd = {
      id: classes.length + 1,
      name: `Class ${newClass.grade}-${newClass.section}`,
      grade: newClass.grade,
      section: newClass.section,
      teachers: selectedTeacher ? [{ id: selectedTeacher.id, name: selectedTeacher.name, email: selectedTeacher.email }] : [],
      students: [],
      room: newClass.room,
      capacity: parseInt(newClass.capacity),
      createdDate: new Date().toISOString().split('T')[0]
    };

    addClass(classToAdd);
    setShowAddClassModal(false);
    setNewClass({
      name: '',
      grade: '',
      section: '',
      teacherId: '',
      room: '',
      capacity: ''
    });
  };

  const handleAssignTeacher = (teacherId) => {
    const selectedTeacher = availableTeachers.find(t => t.id === parseInt(teacherId));
    
    if (selectedClass && selectedTeacher) {
      const isTeacherAlreadyAssigned = selectedClass.teachers?.some(t => t.id === selectedTeacher.id);
      
      const updatedTeachers = isTeacherAlreadyAssigned
        ? selectedClass.teachers.filter(t => t.id !== selectedTeacher.id)
        : [...(selectedClass.teachers || []), { 
            id: selectedTeacher.id, 
            name: selectedTeacher.name, 
            email: selectedTeacher.email,
            subject: selectedTeacher.subject,
            qualification: selectedTeacher.qualification
          }];

      const updatedClass = {
        ...selectedClass,
        teachers: updatedTeachers
      };

      // Update the class in the context
      updateClass(updatedClass);
      
      // Update the local selectedClass state to reflect changes immediately
      setSelectedClass(updatedClass);
    }
  };

  const handleRemoveTeacher = (teacherId) => {
    if (selectedClass) {
      const updatedTeachers = selectedClass.teachers.filter(t => t.id !== teacherId);
      
      const updatedClass = {
        ...selectedClass,
        teachers: updatedTeachers
      };

      // Update the class in the context
      updateClass(updatedClass);
      
      // Update the local selectedClass state to reflect changes immediately
      setSelectedClass(updatedClass);
    }
  };

  const handleDeleteClass = (classId) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      deleteClass(classId);
    }
  };

  const toggleClassExpanded = (classId) => {
    setExpandedClasses(prev => ({
      ...prev,
      [classId]: !prev[classId]
    }));
  };

  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.teachers?.some(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-4">
        <div className="bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400 rounded-3xl p-8 min-h-screen">
          <div className="max-w-full mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-violet-600 mb-2">Classes Management</h1>
              <p className="text-gray-600">Manage classes, assign teachers, and monitor student enrollment.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="text-blue-600" size={24} />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">{classes.length}</p>
                    <p className="text-gray-600 text-sm">Total Classes</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="text-green-600" size={24} />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {classes.reduce((sum, c) => sum + c.students.length, 0)}
                    </p>
                    <p className="text-gray-600 text-sm">Total Students</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <User className="text-purple-600" size={24} />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">{availableTeachers.length}</p>
                    <p className="text-gray-600 text-sm">Total Teachers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Actions Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search classes, subjects, or teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-600 focus:outline-none"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowAddClassModal(true)}
                  className="flex items-center px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                >
                  <Plus size={20} className="mr-2" />
                  Add Class
                </button>
              </div>
            </div>

            {/* Classes List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teachers</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredClasses.map((classItem) => (
                      <React.Fragment key={classItem.id}>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <button
                                onClick={() => toggleClassExpanded(classItem.id)}
                                className="mr-2 text-gray-400 hover:text-gray-600"
                              >
                                {expandedClasses[classItem.id] ? (
                                  <ChevronDown size={20} />
                                ) : (
                                  <ChevronRight size={20} />
                                )}
                              </button>
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                                  <BookOpen className="text-white" size={20} />
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{classItem.name}</div>
                                <div className="text-sm text-gray-500">{classItem.subject}</div>
                                <div className="text-xs text-gray-400">Grade {classItem.grade}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {classItem.teachers && classItem.teachers.length > 0 ? (
                              <div className="space-y-1">
                                {classItem.teachers.map(teacher => (
                                  <div key={teacher.id} className="flex items-center space-x-2">
                                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                                      <span className="text-white text-xs font-medium">
                                        {teacher.name.split(' ').map(n => n[0]).join('')}
                                      </span>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">{teacher.name}</p>
                                      <p className="text-xs text-gray-500">{teacher.email}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-sm text-red-500">No teachers assigned</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-gray-500">
                              <Users size={14} className="mr-2" />
                              {classItem.students.length}/{classItem.capacity}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div 
                                className="bg-blue-600 h-1.5 rounded-full" 
                                style={{ width: `${(classItem.students.length / classItem.capacity) * 100}%` }}
                              ></div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin size={14} className="mr-2" />
                              {classItem.room}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => {
                                  setSelectedClass(classItem);
                                  setShowAssignTeacherModal(true);
                                }}
                                className="text-violet-600 hover:text-violet-900 flex items-center gap-1"
                                title="Teachers"
                              >
                                <UserPlus size={16} />
                                <span className="text-xs">Teachers</span>
                              </button>
                              <button 
                                onClick={() => handleDeleteClass(classItem.id)}
                                className="text-red-600 hover:text-red-900"
                                title="Delete Class"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {expandedClasses[classItem.id] && (
                          <tr>
                            <td colSpan="5" className="px-6 py-4 bg-gray-50">
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <h3 className="text-sm font-medium text-gray-900 mb-3">Class Information</h3>
                                    <div className="space-y-2 text-sm">
                                      <p><span className="font-medium">Created:</span> {classItem.createdDate}</p>
                                      <p><span className="font-medium">Capacity:</span> {classItem.capacity} students</p>
                                    </div>
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-medium text-gray-900 mb-3">Enrolled Students ({classItem.students.length})</h3>
                                    <div className="max-h-48 overflow-y-auto">
                                      {classItem.students.length > 0 ? (
                                        <div className="space-y-2">
                                          {classItem.students.map((student) => (
                                            <div key={student.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                                              <div className="flex items-center space-x-3">
                                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                                  <span className="text-white text-xs font-medium">
                                                    {student.firstName[0]}{student.lastName[0]}
                                                  </span>
                                                </div>
                                                <div>
                                                  <p className="text-sm font-medium text-gray-900">
                                                    {student.firstName} {student.lastName}
                                                  </p>
                                                  <p className="text-xs text-gray-500">Roll No: {student.rollNumber}</p>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <p className="text-sm text-gray-500">No students enrolled yet.</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Class Modal */}
      {showAddClassModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold text-gray-900">Add New Class</h2>
              <button 
                onClick={() => setShowAddClassModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                <input
                  type="text"
                  value={newClass.grade}
                  onChange={(e) => setNewClass({...newClass, grade: e.target.value})}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600 focus:outline-none"
                  placeholder="e.g., 10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                <input
                  type="text"
                  value={newClass.section}
                  onChange={(e) => setNewClass({...newClass, section: e.target.value})}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600 focus:outline-none"
                  placeholder="e.g., A"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
                <select
                  value={newClass.teacherId}
                  onChange={(e) => setNewClass({...newClass, teacherId: e.target.value})}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600 focus:outline-none"
                >
                  <option value="">Select Teacher</option>
                  {availableTeachers.map(teacher => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name} - {teacher.subject}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                <input
                  type="text"
                  value={newClass.room}
                  onChange={(e) => setNewClass({...newClass, room: e.target.value})}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600 focus:outline-none"
                  placeholder="e.g., Room 101"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
              <input
                type="number"
                value={newClass.capacity}
                onChange={(e) => setNewClass({...newClass, capacity: e.target.value})}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600 focus:outline-none"
                placeholder="e.g., 30"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddClassModal(false)}
                className="px-4 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClass}
                disabled={!newClass.grade || !newClass.section}
                className="px-4 py-1.5 bg-violet-600 text-white rounded-md hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
              >
                <Save size={16} className="mr-2" />
                Add Class
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Teacher Modal */}
      {showAssignTeacherModal && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4 h-[80vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Teachers</h2>
                <p className="text-sm text-gray-500">{selectedClass.name} - Grade {selectedClass.grade}</p>
              </div>
              <button 
                onClick={() => setShowAssignTeacherModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Teachers Grid */}
            <div className="flex-1 p-4 overflow-y-auto rounded-b-lg">
              <div className="grid grid-cols-2 gap-3">
                {availableTeachers.map(teacher => {
                  const isSelected = selectedClass.teachers?.some(t => t.id === teacher.id);
                  return (
                    <div 
                      key={teacher.id}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-violet-500 bg-violet-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => handleAssignTeacher(teacher.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            {teacher.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{teacher.name}</p>
                          <p className="text-xs text-gray-500">{teacher.subject}</p>
                          <p className="text-xs text-gray-400">{teacher.email}</p>
                        </div>
                      </div>
                      <div className={`flex items-center justify-center w-6 h-6 rounded-full ${
                        isSelected
                          ? 'bg-violet-600 text-white'
                          : 'border border-gray-300 text-gray-300'
                      }`}>
                        {isSelected ? <Check size={14} /> : <UserPlus size={14} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;