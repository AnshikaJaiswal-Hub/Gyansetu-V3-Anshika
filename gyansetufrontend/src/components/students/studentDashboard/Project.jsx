import React, { useState } from 'react';
import { Calendar, Clock, Users, User, FileText, Target, BookOpen, AlertCircle, CheckCircle, Upload, Eye, ChevronRight, ChevronDown } from 'lucide-react';

const StudentProject = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState({});

  // Mock data for projects
  const upcomingProjects = [
    {
      id: 1,
      title: "Data Structures and Algorithms Final Project",
      subject: "Computer Science",
      description: "Implement a complete e-commerce system using advanced data structures including hash tables, binary search trees, and graphs for product recommendation system.",
      dueDate: "2025-06-15",
      startTime: "2025-05-26T09:00:00",
      endTime: "2025-06-15T23:59:00",
      hasTimeLimit: true,
      projectType: "group",
      learningObjectives: [
        "Understand and implement complex data structures",
        "Apply algorithms for real-world problem solving",
        "Work effectively in a team environment",
        "Create scalable software solutions"
      ],
      resources: [
        "Course textbook chapters 10-15",
        "Online algorithm visualization tools",
        "GitHub repository with starter code",
        "API documentation for payment integration"
      ],
      deliverables: [
        "Complete source code with documentation",
        "Technical report (10-15 pages)",
        "Live demonstration video (15 minutes)",
        "Unit tests with 90% coverage"
      ],
      milestones: [
        { date: "2025-06-01", task: "Project proposal and team formation" },
        { date: "2025-06-08", task: "Core implementation complete" },
        { date: "2025-06-12", task: "Testing and documentation" }
      ],
      questionOrder: "fixed",
      displayMode: "all_at_once",
      passingScore: 70,
      gradingType: "mixed",
      feedbackTiming: "after_submission",
      lateSubmissionPolicy: "10% penalty per day",
      finalSubmissionDate: "2025-06-17",
      status: "not_started"
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design Project",
      subject: "Design",
      description: "Design a complete mobile application interface for a fitness tracking app with user research, wireframes, and interactive prototypes.",
      dueDate: "2025-06-10",
      startTime: "2025-05-20T08:00:00",
      endTime: "2025-06-10T18:00:00",
      hasTimeLimit: false,
      projectType: "individual",
      learningObjectives: [
        "Apply user-centered design principles",
        "Create effective wireframes and prototypes",
        "Conduct user research and usability testing",
        "Develop design systems and style guides"
      ],
      resources: [
        "Figma design tool access",
        "Material Design guidelines",
        "iOS Human Interface Guidelines",
        "User research templates"
      ],
      deliverables: [
        "User research report",
        "Wireframes and user flows",
        "High-fidelity interactive prototype",
        "Design system documentation"
      ],
      milestones: [],
      questionOrder: "random",
      displayMode: "one_at_a_time",
      passingScore: 75,
      gradingType: "manual",
      feedbackTiming: "after_due_date",
      lateSubmissionPolicy: "No late submissions accepted",
      finalSubmissionDate: "2025-06-10",
      status: "in_progress"
    }
  ];

  const submittedProjects = [
    {
      id: 3,
      title: "Database Management System Project",
      subject: "Database Systems",
      submittedDate: "2025-05-20",
      score: 85,
      status: "graded",
      feedback: "Excellent implementation of normalization principles. Minor issues with query optimization."
    },
    {
      id: 4,
      title: "Machine Learning Classification Model",
      subject: "AI/ML",
      submittedDate: "2025-05-15",
      score: null,
      status: "pending",
      feedback: null
    }
  ];

  const toggleProjectExpansion = (projectId) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const ProjectCard = ({ project, isSubmitted = false }) => {
    const isExpanded = expandedProjects[project.id];
    const daysRemaining = !isSubmitted ? getDaysRemaining(project.dueDate) : null;

    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-4 overflow-hidden">
        {/* Card Header */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {project.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {project.subject}
                </span>
                {!isSubmitted && (
                  <>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Due: {formatDate(project.dueDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      {project.projectType === 'group' ? <Users className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      {project.projectType === 'group' ? 'Group Project' : 'Individual Project'}
                    </span>
                  </>
                )}
                {isSubmitted && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Submitted: {formatDate(project.submittedDate)}
                  </span>
                )}
              </div>
            </div>
            
            {!isSubmitted && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                {daysRemaining > 0 ? (
                  <span className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm font-medium">
                    {daysRemaining} days left
                  </span>
                ) : daysRemaining === 0 ? (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    Due Today
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    Overdue
                  </span>
                )}
                
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleProjectExpansion(project.id)}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Details
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  
                  {project.status !== 'not_started' && (
                    <button
                      onClick={() => setShowSubmissionModal(true)}
                      className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            )}

            {isSubmitted && (
              <div className="flex items-center gap-2">
                {project.score !== null ? (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Score: {project.score}/100
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    Pending Review
                  </span>
                )}
              </div>
            )}
          </div>

          {isSubmitted && project.feedback && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-700"><strong>Feedback:</strong> {project.feedback}</p>
            </div>
          )}
        </div>

        {/* Expanded Details */}
        {isExpanded && !isSubmitted && (
          <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Project Information */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Project Description</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Learning Objectives</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {project.learningObjectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Resources</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {project.resources.map((resource, index) => (
                      <li key={index}>{resource}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Deliverables and Timeline */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Deliverables</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {project.deliverables.map((deliverable, index) => (
                      <li key={index}>{deliverable}</li>
                    ))}
                  </ul>
                </div>

                {project.milestones.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Project Milestones</h4>
                    <div className="space-y-2">
                      {project.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 bg-violet-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <span className="font-medium text-gray-900">{formatDate(milestone.date)}</span>
                            <p className="text-gray-600">{milestone.task}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Time Limit:</span>
                    <p className="text-gray-600">{project.hasTimeLimit ? 'Yes' : 'No'}</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Passing Score:</span>
                    <p className="text-gray-600">{project.passingScore}%</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Grading Type:</span>
                    <p className="text-gray-600 capitalize">{project.gradingType}</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Late Policy:</span>
                    <p className="text-gray-600">{project.lateSubmissionPolicy}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-6 p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-gray-900 mb-3">Timeline</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Start Time:</span>
                  <p className="text-gray-600">{formatDateTime(project.startTime)}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Due Date:</span>
                  <p className="text-gray-600">{formatDateTime(project.endTime)}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Final Deadline:</span>
                  <p className="text-gray-600">{formatDate(project.finalSubmissionDate)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const SubmissionModal = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [submissionText, setSubmissionText] = useState('');

    const handleFileChange = (e) => {
      setSelectedFiles([...e.target.files]);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle submission logic here
      console.log('Submitting:', { files: selectedFiles, text: submissionText });
      setShowSubmissionModal(false);
      setSelectedFiles([]);
      setSubmissionText('');
    };

    if (!showSubmissionModal) return null;

    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Submit Project</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Files
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />
                {selectedFiles.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Selected files:</p>
                    <ul className="text-sm text-gray-500">
                      {Array.from(selectedFiles).map((file, index) => (
                        <li key={index}>• {file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Submission Notes (Optional)
                </label>
                <textarea
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Add any notes about your submission..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowSubmissionModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md font-medium transition-colors"
                >
                  Submit Project
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 pt-4 sm:pt-6 md:pt-8 px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 ">
       <div className="min-h-screen bg-gradient-to-br from-violet-200 via-gray-200 to-violet-400 rounded-[30px]">
      {/* Header */}
      <div className=" shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Projects</h1>
            <p className="text-gray-600 mt-1">Manage your project submissions and track progress</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 mb-6">
          <div className="border-b border-gray-200 w-full">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'upcoming'
                    ? 'border-violet-500 text-violet-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Upcoming Projects ({upcomingProjects.length})
              </button>
              <button
                onClick={() => setActiveTab('submitted')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'submitted'
                    ? 'border-violet-500 text-violet-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Submitted Projects ({submittedProjects.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            {upcomingProjects.length > 0 ? (
              upcomingProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming projects</h3>
                <p className="text-gray-600">You're all caught up! Check back later for new assignments.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'submitted' && (
          <div className="space-y-4">
            {submittedProjects.length > 0 ? (
              submittedProjects.map(project => (
                <ProjectCard key={project.id} project={project} isSubmitted={true} />
              ))
            ) : (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No submitted projects</h3>
                <p className="text-gray-600">Your submitted projects will appear here once you start completing assignments.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Submission Modal */}
      <SubmissionModal />
    </div>
    </div>
  );
};

export default StudentProject;