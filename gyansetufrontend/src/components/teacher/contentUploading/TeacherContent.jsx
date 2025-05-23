import React, { useState, useEffect } from 'react';
import { Upload, File, Image, Type, X, Plus, Check, BookOpen } from 'lucide-react';

const TeacherUploadInterface = () => {
  const [activeTab, setActiveTab] = useState('pdf');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [textContent, setTextContent] = useState('');
  const [recentUploads, setRecentUploads] = useState([
    { id: 1, type: 'pdf', title: 'Physics Notes - Chapter 5', class: 'Class 12', section: 'Section A', subject: 'Physics', date: '28 Apr 2025' },
    { id: 2, type: 'image', title: 'Chemistry Diagram - Periodic Table', class: 'Class 11', section: 'Section B', subject: 'Chemistry', date: '30 Apr 2025' },
    { id: 3, type: 'text', title: 'Mathematics Practice Problems', class: 'Class 10', section: 'Section C', subject: 'Maths', date: '02 May 2025' },
    { id: 4, type: 'pdf', title: 'History Timeline - Medieval India', class: 'Class 8', section: 'Section D', subject: 'History', date: '01 May 2025' },
    { id: 5, type: 'text', title: 'Computer Science Algorithms', class: 'Class 11', section: 'Section A', subject: 'Computer', date: '29 Apr 2025' },
  ]);

  // Class options
  const classOptions = [
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
  ];

  // Section options
  const sectionOptions = [
    "Section A",
    "Section B",
    "Section C",
    "Section D",
    "Section E",
    "Section F",
  ];

  // Stream options for Class 11 and 12
  const streamOptions = {
    "Class 11": [
      "Non Medical",
      "Medical",
      "Medical with Maths",
      "Commerce with Maths",
      "Commerce without Maths",
      "Arts with Maths",
      "Arts without Maths",
    ],
    "Class 12": [
      "Non Medical",
      "Medical",
      "Medical with Maths",
      "Commerce with Maths",
      "Commerce without Maths",
      "Arts with Maths",
      "Arts without Maths",
    ],
  };

  // Subject options based on class and stream
  const subjectOptions = {
    "Class 6": [
      "English",
      "Maths",
      "Hindi",
      "History",
      "Geography",
      "Civics",
      "Science",
      "Sanskrit",
      "French",
    ],
    "Class 7": [
      "English",
      "Maths",
      "Hindi",
      "History",
      "Geography",
      "Civics",
      "Science",
      "Sanskrit",
      "French",
    ],
    "Class 8": [
      "English",
      "Maths",
      "Hindi",
      "History",
      "Geography",
      "Civics",
      "Science",
      "Sanskrit",
      "French",
    ],
    "Class 9": [
      "English",
      "Maths",
      "Hindi",
      "History",
      "Geography",
      "Civics",
      "Economics",
      "Science",
      "Sanskrit",
      "French",
    ],
    "Class 10": [
      "English",
      "Maths",
      "Hindi",
      "History",
      "Geography",
      "Civics",
      "Economics",
      "Science",
      "Sanskrit",
      "French",
    ],
    "Class 11": {
      "Non Medical": [
        "Physics",
        "Chemistry",
        "Maths",
        "English",
        "Physical Education",
        "Computer",
      ],
      "Medical": [
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "Physical Education",
        "Computer",
      ],
      "Medical with Maths": [
        "Physics",
        "Chemistry",
        "Maths",
        "Biology",
        "English",
        "Physical Education",
        "Computer",
      ],
      "Commerce with Maths": [
        "Accounts",
        "Maths",
        "Economics",
        "English",
        "Physical Education",
        "Computer",
      ],
      "Commerce without Maths": [
        "Accounts",
        "Economics",
        "English",
        "Physical Education",
        "Computer",
      ],
      "Arts with Maths": [
        "History",
        "Political Science",
        "Sociology",
        "Geography",
        "Psychology",
        "Economics",
        "English",
        "Maths",
        "Physical Education",
        "Computer",
      ],
      "Arts without Maths": [
        "History",
        "Political Science",
        "Sociology",
        "Geography",
        "Psychology",
        "Economics",
        "English",
        "Physical Education",
        "Computer",
      ],
    },
    "Class 12": {
      "Non Medical": [
        "Physics",
        "Chemistry",
        "Maths",
        "English",
        "Physical Education",
        "Computer",
      ],
      "Medical": [
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "Physical Education",
        "Computer",
      ],
      "Medical with Maths": [
        "Physics",
        "Chemistry",
        "Maths",
        "Biology",
        "English",
        "Physical Education",
        "Computer",
      ],
      "Commerce with Maths": [
        "Accounts",
        "Maths",
        "Economics",
        "English",
        "Physical Education",
        "Computer",
      ],
      "Commerce without Maths": [
        "Accounts",
        "Economics",
        "English",
        "Physical Education",
        "Computer",
      ],
      "Arts with Maths": [
        "History",
        "Political Science",
        "Sociology",
        "Geography",
        "Psychology",
        "Economics",
        "English",
        "Maths",
        "Physical Education",
        "Computer",
      ],
      "Arts without Maths": [
        "History",
        "Political Science",
        "Sociology",
        "Geography",
        "Psychology",
        "Economics",
        "English",
        "Physical Education",
        "Computer",
      ],
    },
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }));
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  // Effect to update subjects when class or stream changes
  useEffect(() => {
    if (selectedClass === "Class 11" || selectedClass === "Class 12") {
      if (selectedStream) {
        setAvailableSubjects(subjectOptions[selectedClass][selectedStream]);
      } else {
        setAvailableSubjects([]);
      }
    } else if (selectedClass) {
      setAvailableSubjects(subjectOptions[selectedClass]);
    } else {
      setAvailableSubjects([]);
    }
  }, [selectedClass, selectedStream]);
  
  // Get subject color for UI
  const getSubjectColor = (subject) => {
    const colorMap = {
      'Physics': 'bg-blue-100 text-blue-800',
      'Chemistry': 'bg-green-100 text-green-800',
      'Biology': 'bg-emerald-100 text-emerald-800',
      'Maths': 'bg-purple-100 text-purple-800',
      'English': 'bg-yellow-100 text-yellow-800',
      'Hindi': 'bg-orange-100 text-orange-800',
      'History': 'bg-red-100 text-red-800',
      'Geography': 'bg-teal-100 text-teal-800',
      'Civics': 'bg-cyan-100 text-cyan-800',
      'Economics': 'bg-pink-100 text-pink-800',
      'Science': 'bg-indigo-100 text-indigo-800',
      'Computer': 'bg-gray-100 text-gray-800',
      'Accounts': 'bg-amber-100 text-amber-800',
      'Physical Education': 'bg-lime-100 text-lime-800',
      'Sanskrit': 'bg-rose-100 text-rose-800',
      'French': 'bg-fuchsia-100 text-fuchsia-800',
      'Political Science': 'bg-violet-100 text-violet-800',
      'Sociology': 'bg-sky-100 text-sky-800',
      'Psychology': 'bg-stone-100 text-stone-800',
    };
    
    return colorMap[subject] || 'bg-gray-100 text-gray-800';
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    // Validation
    if (!selectedClass || !selectedSection || !selectedSubject || !title) {
      alert("Please fill in all required fields");
      return;
    }
    
    // If class 11 or 12, stream is required
    if ((selectedClass === "Class 11" || selectedClass === "Class 12") && !selectedStream) {
      alert("Please select a stream");
      return;
    }
    
    // Create new upload object with subject info
    const newUpload = {
      id: recentUploads.length + 1,
      type: activeTab,
      title: title,
      class: selectedClass,
      section: selectedSection,
      subject: selectedSubject,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    
    setRecentUploads([newUpload, ...recentUploads]);
    
    // Reset form
    setTitle('');
    setDescription('');
    setFiles([]);
    setTextContent('');
    setSelectedSubject('');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upload Content</h2>
              
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                    <select 
                      className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedClass}
                      onChange={(e) => {
                        const newClass = e.target.value;
                        setSelectedClass(newClass);
                        setSelectedStream('');
                        setSelectedSubject('');
                        
                        // Update available subjects based on class selection
                        if (newClass === "Class 11" || newClass === "Class 12") {
                          setAvailableSubjects([]);
                        } else if (newClass) {
                          setAvailableSubjects(subjectOptions[newClass]);
                        } else {
                          setAvailableSubjects([]);
                        }
                      }}
                    >
                      <option value="">Select Class</option>
                      {classOptions.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                    <select 
                      className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                    >
                      <option value="">Select Section</option>
                      {sectionOptions.map(sec => (
                        <option key={sec} value={sec}>{sec}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {(selectedClass === "Class 11" || selectedClass === "Class 12") && (
                  <div className="mb-6 relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stream</label>
                    <select 
                      className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedStream}
                      onChange={(e) => {
                        const newStream = e.target.value;
                        setSelectedStream(newStream);
                        setSelectedSubject('');
                        
                        // Update available subjects based on stream selection
                        if (selectedClass && newStream) {
                          setAvailableSubjects(subjectOptions[selectedClass][newStream]);
                        } else {
                          setAvailableSubjects([]);
                        }
                      }}
                    >
                      <option value="">Select Stream</option>
                      {streamOptions[selectedClass]?.map(stream => (
                        <option key={stream} value={stream}>{stream}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                )}
                
                <div className="mb-6 relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <div className="relative">
                    <select 
                      className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      disabled={!selectedClass || ((selectedClass === "Class 11" || selectedClass === "Class 12") && !selectedStream)}
                    >
                      <option value="">Select Subject</option>
                      {availableSubjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a title for this content"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="2"
                    placeholder="Brief description of the content"
                  ></textarea>
                </div>
                
                {/* Content Type Tabs */}
                <div className="mb-6 border-b border-gray-200">
                  <div className="flex -mb-px">
                    <button
                      type="button"
                      className={`mr-1 py-2 px-4 flex items-center ${activeTab === 'pdf' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('pdf')}
                    >
                      <File size={18} className="mr-1" />
                      PDF Upload
                    </button>
                    <button
                      type="button"
                      className={`mr-1 py-2 px-4 flex items-center ${activeTab === 'image' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('image')}
                    >
                      <Image size={18} className="mr-1" />
                      Image Upload
                    </button>
                    <button
                      type="button"
                      className={`py-2 px-4 flex items-center ${activeTab === 'text' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('text')}
                    >
                      <Type size={18} className="mr-1" />
                      Text Notes
                    </button>
                  </div>
                </div>
                
                {/* PDF Upload Form */}
                {activeTab === 'pdf' && (
                  <div className="mb-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="pdf-upload"
                        className="hidden"
                        accept=".pdf"
                        onChange={handleFileChange}
                        multiple
                      />
                      <label htmlFor="pdf-upload" className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PDF (up to 10MB)</p>
                      </label>
                    </div>
                    
                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-blue-50 p-2 rounded">
                            <div className="flex items-center">
                              <File size={16} className="text-blue-500 mr-2" />
                              <span className="text-sm truncate max-w-xs">{file.name}</span>
                            </div>
                            <button 
                              type="button" 
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Image Upload Form */}
                {activeTab === 'image' && (
                  <div className="mb-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="image-upload"
                        className="hidden"
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={handleFileChange}
                        multiple
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Image className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG, JPEG (up to 5MB)</p>
                      </label>
                    </div>
                    
                    {files.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {files.map((file, index) => (
                          <div key={index} className="relative group">
                            <div className="h-24 bg-gray-100 rounded flex items-center justify-center">
                              <Image size={24} className="text-gray-400" />
                            </div>
                            <button 
                              type="button"
                              onClick={() => removeFile(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={14} />
                            </button>
                            <p className="text-xs truncate mt-1">{file.name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Text Notes Form */}
                {activeTab === 'text' && (
                  <div className="mb-6">
                    <textarea 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      rows="8"
                      placeholder="Enter your notes or content here..."
                    ></textarea>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md flex items-center"
                  >
                    <Upload size={18} className="mr-2" />
                    Upload Content
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Uploads */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Uploads</h2>
              
              <div className="space-y-4">
                {recentUploads.map(upload => (
                  <div key={upload.id} className="border border-gray-200 rounded-md p-3 hover:bg-gray-50">
                    <div className="flex items-start">
                      {upload.type === 'pdf' && <File size={18} className="text-red-500 mt-1 mr-2" />}
                      {upload.type === 'image' && <Image size={18} className="text-green-500 mt-1 mr-2" />}
                      {upload.type === 'text' && <Type size={18} className="text-blue-500 mt-1 mr-2" />}
                      
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-800">{upload.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <p className="text-xs text-gray-500">
                            {upload.class} - {upload.section}
                          </p>
                          {upload.subject && (
                            <span className={`px-2 py-0.5 text-xs rounded-full flex items-center ${getSubjectColor(upload.subject)}`}>
                              <BookOpen size={12} className="mr-1" />
                              {upload.subject}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center mt-2">
                          <span className="text-xs text-gray-500">{upload.date}</span>
                          <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
                            <Check size={12} className="mr-1" />
                            Uploaded
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center mt-2">
                  <Plus size={16} className="mr-1" />
                  View All Uploads
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherUploadInterface;