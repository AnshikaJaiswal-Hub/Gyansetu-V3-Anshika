import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Users, 
  Search, 
  Plus, 
  Filter,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Eye,
  Edit,
  Trash2,
  BookOpen,
  User,
  X,
  Save,
  ChevronDown,
  ChevronRight,
  Calendar,
  Key,
  EyeOff,
  KeyRound
} from 'lucide-react';
import { useInstitute } from '../../context/InstituteContext';

const Students = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [expandedClasses, setExpandedClasses] = useState({});
  const [editingStudent, setEditingStudent] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [selectedStudentForReset, setSelectedStudentForReset] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  const { classes, getAllStudents, addStudentToClass, removeStudentFromClass } = useInstitute();

  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    class: '',
    rollNumber: '',
    email: '',
    password: '',
    phone: '',
    parentPhone: '',
    address: '',
  });

  // Check for openAddStudent state when component mounts
  useEffect(() => {
    if (location.state?.openAddStudent) {
      setShowAddModal(true);
    }
  }, [location.state]);

  // Get all students from classes
  const students = useMemo(() => getAllStudents(), [classes]);

  // Get unique class names for the dropdown
  const classOptions = useMemo(() => {
    const uniqueClasses = ['All Classes', ...new Set(classes.map(c => c.name))];
    return uniqueClasses;
  }, [classes]);

  // Initialize all passwords as visible
  useEffect(() => {
    const initialVisibility = {};
    students.forEach(student => {
      initialVisibility[student.id] = true;
    });
    setVisiblePasswords(initialVisibility);
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = 
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesClass = selectedClass === 'All Classes' || student.class === selectedClass;

      return matchesSearch && matchesClass;
    });
  }, [students, searchTerm, selectedClass]);

  const handleAddStudent = () => {
    if (newStudent.firstName && newStudent.lastName && newStudent.class && newStudent.email) {
      const student = {
        ...newStudent,
        id: students.length + 1,
        rollNumber: newStudent.rollNumber || `STU${String(students.length + 1).padStart(3, '0')}`,
        joiningDate: new Date().toISOString().split('T')[0],
        profileImage: null
      };

      // Find the class to add the student to
      const targetClass = classes.find(c => c.name === newStudent.class);
      if (targetClass) {
        addStudentToClass(targetClass.id, student);
      }

      setNewStudent({
        firstName: '',
        lastName: '',
        class: '',
        rollNumber: '',
        email: '',
        password: '',
        phone: '',
        parentPhone: '',
        address: '',
      });
      setShowAddModal(false);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowEditModal(true);
  };

  const handleUpdateStudent = () => {
    if (editingStudent) {
      // Find the class containing the student
      const targetClass = classes.find(c => 
        c.students.some(s => s.id === editingStudent.id)
      );
      
      if (targetClass) {
        // Remove the old student record
        removeStudentFromClass(targetClass.id, editingStudent.id);
        // Add the updated student record
        addStudentToClass(targetClass.id, editingStudent);
      }

      setShowEditModal(false);
      setEditingStudent(null);
    }
  };

  const togglePasswordVisibility = (studentId) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const handlePasswordReset = (student) => {
    setSelectedStudentForReset(student);
    setShowPasswordResetModal(true);
  };

  const handleResetPassword = () => {
    if (selectedStudentForReset && newPassword) {
      // Find the class containing the student
      const targetClass = classes.find(c => 
        c.students.some(s => s.id === selectedStudentForReset.id)
      );
      
      if (targetClass) {
        // Update the student's password
        const updatedStudent = {
          ...selectedStudentForReset,
          password: newPassword
        };
        
        // Remove the old student record
        removeStudentFromClass(targetClass.id, selectedStudentForReset.id);
        // Add the updated student record
        addStudentToClass(targetClass.id, updatedStudent);
      }

      setShowPasswordResetModal(false);
      setSelectedStudentForReset(null);
      setNewPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-4">
        <div className="bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400 rounded-3xl p-8 min-h-screen">
          <div className="max-w-full mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-violet-600 mb-2">Student Management</h1>
              <p className="text-gray-700 text-sm md:text-base">Manage and monitor your student records with ease.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-3xl font-bold text-violet-600">{students.length}</p>
                  </div>
                  <Users className="text-violet-500" size={32} />
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Classes</p>
                    <p className="text-3xl font-bold text-yellow-600">{classes.length - 1}</p>
                  </div>
                  <BookOpen className="text-yellow-500" size={32} />
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                <div className="relative w-full lg:w-96">
                  <input
                    type="text"
                    placeholder="Search students by name, roll number, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-600 bg-white/80"
                  />
                  <Search className="absolute left-4 top-2.5 text-gray-400" size={20} />
                </div>
                
                <div className="flex flex-wrap gap-4 items-center">
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-600 bg-white/80"
                  >
                    {classOptions.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                  
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                  >
                    <Plus size={20} className="mr-2" />
                    Add Student
                  </button>
                </div>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Info</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credentials</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                                <User className="text-white" size={24} />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {student.firstName} {student.lastName}
                              </div>
                              <div className="text-sm text-gray-500">{student.rollNumber}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.class}</div>
                          <div className="text-sm text-gray-500">{student.subject}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.phone}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center text-sm">
                              <Mail size={14} className="mr-2 text-gray-400" />
                              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                {student.email}
                              </span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Key size={14} className="mr-2 text-gray-400" />
                              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                {visiblePasswords[student.id] ? (student.password || 'Not set') : '••••••••'}
                              </span>
                              <button
                                onClick={() => togglePasswordVisibility(student.id)}
                                className="ml-2 text-gray-400 hover:text-gray-600"
                              >
                                {visiblePasswords[student.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleEditStudent(student)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit Student"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handlePasswordReset(student)}
                              className="text-violet-600 hover:text-violet-900"
                              title="Reset Password"
                            >
                              <KeyRound size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(student.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete Student"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Student Modal */}
            {showAddModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Add New Student</h2>
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      placeholder="First Name"
                      value={newStudent.firstName}
                      onChange={(e) => setNewStudent({...newStudent, firstName: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-600"
                    />
                    <input
                      placeholder="Last Name"
                      value={newStudent.lastName}
                      onChange={(e) => setNewStudent({...newStudent, lastName: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-600"
                    />
                    <select
                      value={newStudent.class}
                      onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-600"
                    >
                      <option value="">Select Class</option>
                      {classOptions.filter(cls => cls !== 'All Classes').map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                    <input
                      placeholder="Roll Number"
                      value={newStudent.rollNumber}
                      onChange={(e) => setNewStudent({...newStudent, rollNumber: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-600"
                    />
                    <input
                      placeholder="Email"
                      type="email"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-600"
                    />
                    <input
                      placeholder="Phone"
                      type="tel"
                      value={newStudent.phone}
                      onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-600"
                    />
                    <input
                      placeholder="Parent Phone"
                      type="tel"
                      value={newStudent.parentPhone}
                      onChange={(e) => setNewStudent({...newStudent, parentPhone: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-600"
                    />
                    <div className="md:col-span-2">
                      <textarea
                        placeholder="Address"
                        value={newStudent.address}
                        onChange={(e) => setNewStudent({...newStudent, address: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-600"
                        rows="2"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddStudent}
                      className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                    >
                      Add Student
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Student Modal */}
            {showEditModal && editingStudent && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Edit Student</h2>
                    <button
                      onClick={() => {
                        setShowEditModal(false);
                        setEditingStudent(null);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      placeholder="First Name"
                      value={editingStudent.firstName}
                      onChange={(e) => setEditingStudent({...editingStudent, firstName: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-600"
                    />
                    <input
                      placeholder="Last Name"
                      value={editingStudent.lastName}
                      onChange={(e) => setEditingStudent({...editingStudent, lastName: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-600"
                    />
                    <select
                      value={editingStudent.class}
                      onChange={(e) => setEditingStudent({...editingStudent, class: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-600"
                    >
                      <option value="">Select Class</option>
                      {classOptions.filter(cls => cls !== 'All Classes').map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                    <input
                      placeholder="Roll Number"
                      value={editingStudent.rollNumber}
                      onChange={(e) => setEditingStudent({...editingStudent, rollNumber: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-600"
                    />
                    <input
                      placeholder="Email"
                      type="email"
                      value={editingStudent.email}
                      onChange={(e) => setEditingStudent({...editingStudent, email: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-600"
                    />
                    <input
                      placeholder="Password"
                      type="password"
                      value={editingStudent.password}
                      onChange={(e) => setEditingStudent({...editingStudent, password: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-600"
                    />
                    <input
                      placeholder="Phone"
                      type="tel"
                      value={editingStudent.phone}
                      onChange={(e) => setEditingStudent({...editingStudent, phone: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-600"
                    />
                    <input
                      placeholder="Parent Phone"
                      type="tel"
                      value={editingStudent.parentPhone}
                      onChange={(e) => setEditingStudent({...editingStudent, parentPhone: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-600"
                    />
                    <div className="md:col-span-2">
                      <textarea
                        placeholder="Address"
                        value={editingStudent.address}
                        onChange={(e) => setEditingStudent({...editingStudent, address: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-600"
                        rows="2"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => {
                        setShowEditModal(false);
                        setEditingStudent(null);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateStudent}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Update Student
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Password Reset Modal */}
            {showPasswordResetModal && selectedStudentForReset && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Reset Password</h2>
                    <button
                      onClick={() => {
                        setShowPasswordResetModal(false);
                        setSelectedStudentForReset(null);
                        setNewPassword('');
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Reset password for {selectedStudentForReset.firstName} {selectedStudentForReset.lastName}
                    </p>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-600"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setShowPasswordResetModal(false);
                        setSelectedStudentForReset(null);
                        setNewPassword('');
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleResetPassword}
                      className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;