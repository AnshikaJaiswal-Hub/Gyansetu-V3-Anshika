import React, { useState, useEffect } from 'react';

const LevelsPage = () => {
  // State for levels data
  const [levels, setLevels] = useState([]);
  const [subject, setSubject] = useState('Chemistry'); // Default subject
  const [loading, setLoading] = useState(true);
  
  // Navigation state
  const [activePage, setActivePage] = useState('levels');
  
  // State for image zoom
  const [imageZoomed, setImageZoomed] = useState(false);
  
  // Navigation handler function
  const handleNavigation = (page) => {
    console.log(`Navigating to ${page} page`);
    setActivePage(page);
    
    // Navigation logic - in a real app you'd use router here
    switch(page) {
      case 'home':
        window.location.href = '/home';
        break;
      case 'quiz':
        window.location.href = '/quiz';
        break;
      case 'chat':
        window.location.href = '/chat';
        break;
      case 'chatHistory':
        window.location.href = '/chat-history';
        break;
      default:
        window.location.href = '/';
    }
  };
  
  // Get subject from URL parameters (without router hooks)
  useEffect(() => {
    // Parse URL to get subject
    const url = new URL(window.location.href);
    const subjectId = url.pathname.split('/').pop();
    const subjectFromQuery = url.searchParams.get('subject');
    
    // Set subject name based on ID (this would come from your data in a real app)
    const subjectMap = {
      '1': 'Physics',
      '2': 'Chemistry',
      '3': 'Maths',
      '4': 'Biology',
      '5': 'History'
    };
    
    if (subjectId && subjectMap[subjectId]) {
      setSubject(subjectMap[subjectId]);
    } else if (subjectFromQuery && subjectMap[subjectFromQuery]) {
      setSubject(subjectMap[subjectFromQuery]);
    }
    
    // Fetch levels
    fetchLevels(subjectId || subjectFromQuery);
  }, []);
  
  // Default levels data (matching the image)
  const defaultLevels = [
    {
      id: 1,
      name: 'Some Basic Concepts of Chemistry',
      starsEarned: 0,
      totalStars: 3,
      isSelected: false,
      isLocked: false
    },
    {
      id: 2,
      name: 'Structure of Atom',
      starsEarned: 0,
      totalStars: 3,
      isSelected: false,
      isLocked: false
    },
    {
      id: 3,
      name: 'Classification of Elements ',
      starsEarned: 0,
      totalStars: 3,
      isSelected: true,
      isLocked: false
    },
    {
      id: 4,
      name: 'Biology',
      starsEarned: 0,
      totalStars: 3,
      isSelected: false,
      isLocked: false
    },
    {
      id: 5,
      name: 'History',
      starsEarned: 0,
      totalStars: 3,
      isSelected: false,
      isLocked: false
    }
  ];

  // Mock function to fetch levels from backend
  const fetchLevels = async (subjectId) => {
    setLoading(true);
    try {
      // This would be replaced with an actual API call
      console.log(`Fetching levels for subject: ${subjectId}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For now, just use the default levels
      setLevels(defaultLevels);
    } catch (error) {
      console.error('Error fetching levels:', error);
      // Fallback to default levels on error
      setLevels(defaultLevels);
    } finally {
      setLoading(false);
    }
  };
  
  // Function to handle level selection
  const handleLevelSelect = (levelId) => {
    console.log(`Selected level: ${levelId}`);
    // Here you would navigate to the actual quiz for this level
    
    // Update selected level in state
    setLevels(levels.map(level => ({
      ...level,
      isSelected: level.id === levelId
    })));
  };
  
  // Function to toggle image zoom
  const toggleImageZoom = () => {
    setImageZoomed(!imageZoomed);
  };
  
  // Render stars based on earned/total
  const renderStars = (earned, total) => {
    return Array(total).fill(0).map((_, index) => (
      <svg 
        key={index}
        className={`w-10 h-10 ${index < earned ? 'text-yellow-400' : 'text-white'} stroke-white`}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen text-white p-4 flex flex-col relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/Background.png" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <header className="flex justify-center items-center p-4 border-b border-indigo-800">
          <nav className="flex space-x-8">
            <button 
              onClick={() => handleNavigation('quiz')}
              className={`text-base font-medium transition-all duration-300 ${activePage === 'quiz' ? 'text-white font-bold' : 'text-indigo-300 hover:text-indigo-100'}`}
            >
              Quiz
            </button>
            <button 
              onClick={() => handleNavigation('home')}
              className={`text-base font-medium transition-all duration-300 ${activePage === 'home' ? 'text-white font-bold' : 'text-indigo-300 hover:text-indigo-100'}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('chat')}
              className={`text-base font-medium transition-all duration-300 ${activePage === 'chat' ? 'text-white font-bold' : 'text-indigo-300 hover:text-indigo-100'}`}
            >
              Chat
            </button>
            <button 
              onClick={() => handleNavigation('chatHistory')}
              className={`text-base font-medium transition-all duration-300 ${activePage === 'chatHistory' ? 'text-white font-bold' : 'text-indigo-300 hover:text-indigo-100'}`}
            >
              Chat History
            </button>
          </nav>
        </header>
        
        <div className="flex-grow flex flex-col md:flex-row mt-8">
          {/* Left side - Levels list */}
          <div className="w-full md:w-1/2 space-y-8">
            <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white animate-pulse">
              Gear up, brave learner! Your {subject} quest awaits!
            </h1>
            
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : (
              <div className="space-y-12">
                {levels.map((level) => (
                  <div 
                    key={level.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-grow flex items-center">
                      <div className="mr-6 text-2xl font-semibold">
                        Level - {level.id}
                      </div>
                      
                      {level.isSelected ? (
                        // Selected level with highlighted border
                        <button
                          className="relative px-8 py-3 text-xl text-white bg-indigo-900/60 backdrop-blur-sm rounded-lg cursor-pointer overflow-hidden"
                          onClick={() => handleLevelSelect(level.id)}
                        >
                          {/* Highlighted border with geometric corners */}
                          <div className="absolute -inset-0.5 border-2 border-blue-400 rounded-lg"></div>
                          
                          {/* Diagonal corner accents */}
                          <div className="absolute top-0 left-0 w-12 h-12">
                            <div className="absolute transform rotate-45 -top-1 -left-1 w-4 h-8 border-2 border-blue-400"></div>
                          </div>
                          <div className="absolute top-0 right-0 w-12 h-12">
                            <div className="absolute transform rotate-45 -top-1 -right-1 w-4 h-8 border-2 border-blue-400"></div>
                          </div>
                          <div className="absolute bottom-0 left-0 w-12 h-12">
                            <div className="absolute transform rotate-45 -bottom-1 -left-1 w-4 h-8 border-2 border-blue-400"></div>
                          </div>
                          <div className="absolute bottom-0 right-0 w-12 h-12">
                            <div className="absolute transform rotate-45 -bottom-1 -right-1 w-4 h-8 border-2 border-blue-400"></div>
                          </div>
                          
                          {/* Content */}
                          <span className="relative z-10">{level.name}</span>
                        </button>
                      ) : (
                        // Normal level button
                        <button
                          className="px-8 py-3 text-xl text-white bg-indigo-900/60 backdrop-blur-sm rounded-lg cursor-pointer hover:bg-indigo-800/60 transition-all duration-300"
                          onClick={() => handleLevelSelect(level.id)}
                          disabled={level.isLocked}
                        >
                          {level.name}
                        </button>
                      )}
                    </div>
                    
                    {/* Stars */}
                    <div className="flex space-x-4 ml-4">
                      {renderStars(level.starsEarned, level.totalStars)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Right side - Image */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-6">
            <div 
              className={`
                relative cursor-pointer transition-transform duration-500
                ${imageZoomed ? 'scale-125' : 'scale-100'}
              `}
              onClick={toggleImageZoom}
            >
              {/* Designer border around image */}
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-lg opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              
              {/* Image container */}
              <div className="relative rounded-lg overflow-hidden z-10 border border-indigo-300/30">
                <img 
                  src="/quiz1.png" 
                  alt="Subject visualization"
                  className="w-64 h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelsPage;