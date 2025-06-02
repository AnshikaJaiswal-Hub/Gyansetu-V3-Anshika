import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  Search, 
  Plus, 
  Filter,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Key,
  User,
  Calendar,
  BookOpen,
  UserPlus,
  Settings,
  X,
  RefreshCw
} from 'lucide-react';
import { useInstitute } from '../../context/InstituteContext';

const Teachers = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordTeacher, setPasswordTeacher] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const { classes } = useInstitute();

  // Check for openAddTeacher state when component mounts
  useEffect(() => {
    if (location.state?.openAddTeacher) {
      setShowAddModal(true);
    }
  }, [location.state]);

  const [teachers, setTeachers] = useState([
    {
      id: 1,
      teacherId: "teacher001@gyansetu.edu",
      name: "Sarah Wilson",
      subject: "Mathematics",
      email: "sarah.wilson@gyansetu.edu",
      phone: "+91 98765 43210",
      location: "Delhi",
      joiningDate: "2023-01-15",
      password: "Sarah@123",
      experience: "5 years",
      qualification: "M.Sc Mathematics",
      salary: "₹45,000",
      classes: ["Class 10-A", "Class 12-B"]
    },
    {
      id: 2,
      teacherId: "teacher002@gyansetu.edu",
      name: "John Smith",
      subject: "Physics",
      email: "john.smith@gyansetu.edu",
      phone: "+91 98765 43211",
      location: "Mumbai",
      joiningDate: "2023-02-20",
      password: "John@456",
      experience: "8 years",
      qualification: "Ph.D Physics",
      salary: "₹55,000",
      classes: ["Class 11-A", "Class 12-A"]
    },
    {
      id: 3,
      teacherId: "teacher003@gyansetu.edu",
      name: "Priya Sharma",
      subject: "Chemistry",
      email: "priya.sharma@gyansetu.edu",
      phone: "+91 98765 43212",
      location: "Bangalore",
      joiningDate: "2022-08-10",
      password: "Priya@789",
      experience: "3 years",
      qualification: "M.Sc Chemistry",
      salary: "₹40,000",
      classes: ["Class 11-B", "Class 12-C"]
    },
    {
      id: 4,
      teacherId: "teacher004@gyansetu.edu",
      name: "Rajesh Kumar",
      subject: "Biology",
      email: "rajesh.kumar@gyansetu.edu",
      phone: "+91 98765 43213",
      location: "Chennai",
      joiningDate: "2023-03-05",
      password: "Rajesh@123",
      experience: "6 years",
      qualification: "M.Sc Biology",
      salary: "₹48,000",
      classes: ["Class 9-A", "Class 10-B"]
    },
    {
      id: 5,
      teacherId: "teacher005@gyansetu.edu",
      name: "Meera Patel",
      subject: "English",
      email: "meera.patel@gyansetu.edu",
      phone: "+91 98765 43214",
      location: "Ahmedabad",
      joiningDate: "2022-11-15",
      password: "Meera@456",
      experience: "4 years",
      qualification: "M.A. English Literature",
      salary: "₹42,000",
      classes: ["Class 8-A", "Class 9-B"]
    },
    {
      id: 6,
      teacherId: "teacher006@gyansetu.edu",
      name: "Amit Singh",
      subject: "Computer Science",
      email: "amit.singh@gyansetu.edu",
      phone: "+91 98765 43215",
      location: "Pune",
      joiningDate: "2023-04-20",
      password: "Amit@789",
      experience: "7 years",
      qualification: "M.Tech Computer Science",
      salary: "₹52,000",
      classes: ["Class 11-C", "Class 12-D"]
    },
    {
      id: 7,
      teacherId: "teacher007@gyansetu.edu",
      name: "Neha Gupta",
      subject: "History",
      email: "neha.gupta@gyansetu.edu",
      phone: "+91 98765 43216",
      location: "Kolkata",
      joiningDate: "2022-09-01",
      password: "Neha@123",
      experience: "5 years",
      qualification: "M.A. History",
      salary: "₹45,000",
      classes: ["Class 9-C", "Class 10-D"]
    },
    {
      id: 8,
      teacherId: "teacher008@gyansetu.edu",
      name: "Vikram Malhotra",
      subject: "Geography",
      email: "vikram.malhotra@gyansetu.edu",
      phone: "+91 98765 43217",
      location: "Hyderabad",
      joiningDate: "2023-01-10",
      password: "Vikram@456",
      experience: "4 years",
      qualification: "M.Sc Geography",
      salary: "₹43,000",
      classes: ["Class 8-B", "Class 9-D"]
    },
    {
      id: 9,
      teacherId: "teacher009@gyansetu.edu",
      name: "Ananya Reddy",
      subject: "Economics",
      email: "ananya.reddy@gyansetu.edu",
      phone: "+91 98765 43218",
      location: "Bangalore",
      joiningDate: "2022-12-05",
      password: "Ananya@789",
      experience: "6 years",
      qualification: "M.A. Economics",
      salary: "₹47,000",
      classes: ["Class 11-D", "Class 12-E"]
    },
    {
      id: 10,
      teacherId: "teacher010@gyansetu.edu",
      name: "Rahul Verma",
      subject: "Physical Education",
      email: "rahul.verma@gyansetu.edu",
      phone: "+91 98765 43219",
      location: "Delhi",
      joiningDate: "2023-02-15",
      password: "Rahul@123",
      experience: "3 years",
      qualification: "B.P.Ed",
      salary: "₹38,000",
      classes: ["Class 6-A", "Class 7-B"]
    },
    {
      id: 11,
      teacherId: "teacher011@gyansetu.edu",
      name: "Sneha Joshi",
      subject: "Hindi",
      email: "sneha.joshi@gyansetu.edu",
      phone: "+91 98765 43220",
      location: "Mumbai",
      joiningDate: "2022-10-20",
      password: "Sneha@456",
      experience: "5 years",
      qualification: "M.A. Hindi",
      salary: "₹44,000",
      classes: ["Class 7-C", "Class 8-D"]
    },
    {
      id: 12,
      teacherId: "teacher012@gyansetu.edu",
      name: "Arjun Nair",
      subject: "Mathematics",
      email: "arjun.nair@gyansetu.edu",
      phone: "+91 98765 43221",
      location: "Chennai",
      joiningDate: "2023-03-25",
      password: "Arjun@789",
      experience: "7 years",
      qualification: "M.Sc Mathematics",
      salary: "₹50,000",
      classes: ["Class 9-E", "Class 10-F"]
    },
    {
      id: 13,
      teacherId: "teacher013@gyansetu.edu",
      name: "Pooja Sharma",
      subject: "Physics",
      email: "pooja.sharma@gyansetu.edu",
      phone: "+91 98765 43222",
      location: "Pune",
      joiningDate: "2022-11-30",
      password: "Pooja@123",
      experience: "4 years",
      qualification: "M.Sc Physics",
      salary: "₹46,000",
      classes: ["Class 11-E", "Class 12-F"]
    }
  ]);

  const [newTeacher, setNewTeacher] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
    location: '',
    qualification: '',
    password: '',
    classes: []
  });

  // Get available classes for selection
  const availableClasses = classes.map(c => c.name);

  const handleClassToggle = (className) => {
    setNewTeacher(prev => ({
      ...prev,
      classes: prev.classes.includes(className)
        ? prev.classes.filter(c => c !== className)
        : [...prev.classes, className]
    }));
  };

  const handleEditClassToggle = (className) => {
    setEditingTeacher(prev => ({
      ...prev,
      classes: prev.classes.includes(className)
        ? prev.classes.filter(c => c !== className)
        : [...prev.classes, className]
    }));
  };

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const generateTeacherId = () => {
    const nextId = teachers.length + 1;
    const paddedId = String(nextId).padStart(3, '0');
    return `teacher${paddedId}@gyansetu.edu`;
  };

  const handleAddTeacher = () => {
    const teacherId = generateTeacherId();
    const teacher = {
      id: Date.now(),
      teacherId,
      ...newTeacher,
      joiningDate: new Date().toISOString().split('T')[0]
    };
    setTeachers([...teachers, teacher]);
    setNewTeacher({
      name: '',
      subject: '',
      email: '',
      phone: '',
      location: '',
      qualification: '',
      password: '',
      classes: []
    });
    setShowAddModal(false);
  };

  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setShowEditModal(true);
  };

  const handleUpdateTeacher = () => {
    setTeachers(teachers.map(t => t.id === editingTeacher.id ? editingTeacher : t));
    setShowEditModal(false);
    setEditingTeacher(null);
  };

  const handleDeleteTeacher = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(teachers.filter(t => t.id !== id));
    }
  };

  const togglePasswordVisibility = (teacherId) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [teacherId]: !prev[teacherId]
    }));
  };

  const resetPassword = (teacher) => {
    setPasswordTeacher(teacher);
    setNewPassword('');
    setShowPasswordModal(true);
  };

  const confirmPasswordReset = () => {
    if (passwordTeacher && newPassword) {
      setTeachers(teachers.map(t => 
        t.id === passwordTeacher.id ? { ...t, password: newPassword } : t
      ));
      setShowPasswordModal(false);
      setPasswordTeacher(null);
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
              <h1 className="text-3xl font-bold text-violet-600 mb-2">Teachers Management</h1>
              <p className="text-gray-600">Manage and monitor your teaching staff with comprehensive controls.</p>
              <div className="flex gap-4 mt-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-4xl font-bold text-violet-600">{teachers.length}</div>
                  <div className="text-sm text-gray-600">Total Teachers</div>
                </div>
              </div>
            </div>

            {/* Search and Actions Bar */}
                          <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
              <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                <div className="relative w-full md:w-96">
                  <input
                    type="text"
                    placeholder="Search by name, subject, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-600 focus:border-violet-600 focus:outline-none"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                >
                  <UserPlus size={20} className="mr-2" />
                  Add Teacher
                </button>
              </div>
            </div>

            {/* Teachers List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher Info</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject & Classes</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credentials</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTeachers.map((teacher) => (
                      <tr key={teacher.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                                <GraduationCap className="text-white" size={24} />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                              <div className="text-xs text-gray-400">Joined {teacher.joiningDate}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium">{teacher.subject}</div>
                          <div className="text-xs text-gray-500">{teacher.classes?.join(', ')}</div>
                          <div className="text-xs text-gray-400">{teacher.qualification}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col space-y-1">
                            <div className="flex items-center text-sm text-gray-500">
                              <Mail size={14} className="mr-2" />
                              {teacher.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Phone size={14} className="mr-2" />
                              {teacher.phone}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin size={14} className="mr-2" />
                              {teacher.location}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center text-sm">
                              <User size={14} className="mr-2 text-gray-400" />
                              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                {teacher.teacherId}
                              </span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Key size={14} className="mr-2 text-gray-400" />
                              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                {visiblePasswords[teacher.id] ? teacher.password : '••••••••'}
                              </span>
                              <button
                                onClick={() => togglePasswordVisibility(teacher.id)}
                                className="ml-2 text-gray-400 hover:text-violet-600"
                              >
                                {visiblePasswords[teacher.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditTeacher(teacher)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit Teacher"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => resetPassword(teacher)}
                              className="text-yellow-600 hover:text-yellow-900"
                              title="Reset Password"
                            >
                              <Key size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteTeacher(teacher.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete Teacher"
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

            {/* Add Teacher Modal */}
            {showAddModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Add New Teacher</h2>
                    <button 
                      onClick={() => setShowAddModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      placeholder="Full Name"
                      value={newTeacher.name}
                      onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600 focus:outline-none"
                    />
                    <input
                      placeholder="Subject"
                      value={newTeacher.subject}
                      onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600 focus:outline-none"
                    />
                    <input
                      placeholder="Email"
                      type="email"
                      value={newTeacher.email}
                      onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600 focus:outline-none"
                    />
                    <input
                      placeholder="Phone"
                      value={newTeacher.phone}
                      onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600 focus:outline-none"
                    />
                    <input
                      placeholder="Location"
                      value={newTeacher.location}
                      onChange={(e) => setNewTeacher({...newTeacher, location: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600 focus:outline-none"
                    />
                    <input
                      placeholder="Qualification"
                      value={newTeacher.qualification}
                      onChange={(e) => setNewTeacher({...newTeacher, qualification: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600 focus:outline-none"
                    />
                    <input
                      placeholder="Password"
                      type="password"
                      value={newTeacher.password}
                      onChange={(e) => setNewTeacher({...newTeacher, password: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600 focus:outline-none"
                    />
                  </div>
                  
                  {/* Class Selection */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assign Classes</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {availableClasses.map(className => (
                        <label key={className} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newTeacher.classes.includes(className)}
                            onChange={() => handleClassToggle(className)}
                            className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                          />
                          <span className="text-sm text-gray-700">{className}</span>
                        </label>
                      ))}
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
                      onClick={handleAddTeacher}
                      className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                    >
                      Add Teacher
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Teacher Modal */}
            {showEditModal && editingTeacher && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Edit Teacher</h2>
                    <button 
                      onClick={() => setShowEditModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      placeholder="Full Name"
                      value={editingTeacher.name}
                      onChange={(e) => setEditingTeacher({...editingTeacher, name: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-600"
                    />
                    <input
                      placeholder="Subject"
                      value={editingTeacher.subject}
                      onChange={(e) => setEditingTeacher({...editingTeacher, subject: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-600"
                    />
                    <input
                      placeholder="Email"
                      type="email"
                      value={editingTeacher.email}
                      onChange={(e) => setEditingTeacher({...editingTeacher, email: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-600"
                    />
                    <input
                      placeholder="Phone"
                      value={editingTeacher.phone}
                      onChange={(e) => setEditingTeacher({...editingTeacher, phone: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-600"
                    />
                    <input
                      placeholder="Location"
                      value={editingTeacher.location}
                      onChange={(e) => setEditingTeacher({...editingTeacher, location: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-600"
                    />
                    <input
                      placeholder="Qualification"
                      value={editingTeacher.qualification || ''}
                      onChange={(e) => setEditingTeacher({...editingTeacher, qualification: e.target.value})}
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-600"
                    />
                  </div>

                  {/* Class Selection */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assign Classes</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {availableClasses.map(className => (
                        <label key={className} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingTeacher.classes.includes(className)}
                            onChange={() => handleEditClassToggle(className)}
                            className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                          />
                          <span className="text-sm text-gray-700">{className}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setShowEditModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateTeacher}
                      className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                    >
                      Update Teacher
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Reset Password Modal */}
            {showPasswordModal && passwordTeacher && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Reset Password</h2>
                    <button 
                      onClick={() => {
                        setShowPasswordModal(false);
                        setPasswordTeacher(null);
                        setNewPassword('');
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Resetting password for <span className="font-medium">{passwordTeacher.name}</span>
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Teacher ID: <span className="font-medium">{passwordTeacher.teacherId}</span>
                    </p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-violet-600 focus:outline-none"
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Please enter a new password for the teacher.
                    </p>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setShowPasswordModal(false);
                        setPasswordTeacher(null);
                        setNewPassword('');
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmPasswordReset}
                      className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                    >
                      Confirm Reset
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

export default Teachers;