import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Calendar, ChevronLeft, ChevronRight, Edit2, Grid, Home, Menu, MessageSquare, Moon, MoreHorizontal, Plus, Search, Send, Settings, Sliders, Sun, Zap } from 'lucide-react';

const IntellectaDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [statusEnabled, setStatusEnabled] = useState(true);

  // Apply dark mode class to document when darkMode state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        {/* Header */}
      <header className={`px-6 py-4 flex justify-between items-center ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-sm`}>
  <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-purple-600 text-white'}`}> 
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
              <path d="M20 10C23.866 10 27 13.134 27 17C27 20.866 23.866 24 20 24C16.134 24 13 20.866 13 17C13 13.134 16.134 10 20 10ZM20 28C26.627 28 32 30.686 32 34V36H8V34C8 30.686 13.373 28 20 28Z" fill="white"/>
            </svg>
          </div>
          <h1 className="text-xl font-semibold">Gyansetu</h1>
        </div>
        <div className={`flex items-center ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-full py-2 px-3 shadow-md`}>
          <button className={`p-1 rounded-full ${!darkMode ? 'text-purple-600' : 'text-gray-400'}`} onClick={() => setDarkMode(false)}>
            <Sun size={18} />
      </button>
          <button className={`p-1 rounded-full ${darkMode ? 'text-purple-600' : 'text-gray-400'}`} onClick={() => setDarkMode(true)}>
            <Moon size={18} />
      </button>
    </div>
        <div className="flex items-center gap-4">
          <button className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'}`}> <Search size={18} /> </button>
    <div className="w-10 h-10 rounded-full overflow-hidden shadow-md">
            <img src="/api/placeholder/40/40" alt="User Avatar" className="w-full h-full object-cover" />
    </div>
  </div>
</header>

      {/* Main Container */}
      <div className="flex px-6 mt-2">
        {/* Sidebar */}
        <div className={`w-16 mr-6 min-h-[90vh] ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl py-4 flex flex-col items-center`}>
          <button className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md mb-6 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'}`}> <Menu size={20} /> </button>
          <div className="flex flex-col gap-4">
            <button className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${activeTab === "home" ? 'bg-purple-600 text-white' : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'}`} onClick={() => setActiveTab("home")}> <Home size={20} /> </button>
            <button className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${activeTab === "apps" ? 'bg-purple-600 text-white' : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'}`} onClick={() => setActiveTab("apps")}> <Grid size={20} /> </button>
            <button className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${activeTab === "zap" ? 'bg-purple-600 text-white' : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'}`} onClick={() => setActiveTab("zap")}> <Zap size={20} /> </button>
            <button className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${activeTab === "chat" ? 'bg-purple-600 text-white' : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'}`} onClick={() => setActiveTab("chat")}> <MessageSquare size={20} /> </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Greeting Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-1">Good morning, Mike!</h1>
            <p className="text-gray-600 dark:text-gray-400">Let's make this day productive.</p>
          </div>

          {/* Stats */}
          <div className="flex gap-5 mb-8">
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-200">
              <div className="text-gray-600 dark:text-gray-300 text-sm mb-2">Tasks done</div>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-semibold text-gray-900 dark:text-white">2,543</div>
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-gray-700 flex items-center justify-center transition-colors duration-200">
                  <ArrowUpRight size={16} className="text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-200">
              <div className="text-gray-600 dark:text-gray-300 text-sm mb-2">Hours saved</div>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-semibold text-gray-900 dark:text-white">82%</div>
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-gray-700 flex items-center justify-center transition-colors duration-200">
                  <ArrowUpRight size={16} className="text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
          </div>

  {/* Profile Section */}
          <div className="mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-200">
              <div className="p-5 flex items-center relative transition-colors duration-200 bg-white dark:bg-gray-800">
        <div className="relative mr-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-lime-300 bg-white dark:bg-gray-800">
            <img src="/profile.png" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
        <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">sadaf</h3>
                  <p className="text-gray-600 dark:text-gray-300">Class 06</p>
        </div>
                <button className="absolute right-4 top-4 text-gray-500 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
          <Edit2 size={18} />
        </button>
      </div>
              <div className="p-4 bg-white dark:bg-gray-800 transition-colors duration-200">
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">Status</span>
          <div className="relative inline-block w-12 align-middle select-none">
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white dark:bg-gray-900 border-4 border-gray-300 dark:border-gray-700 appearance-none cursor-pointer transition-all duration-200"
              checked={statusEnabled}
              onChange={() => setStatusEnabled(!statusEnabled)}
            />
            <label
              htmlFor="toggle"
                      className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ${statusEnabled ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-700'}`}
                    ></label>
          </div>
        </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">Chat History</span>
                  <span className="text-gray-900 dark:text-white">0</span>
        </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">Saved Chat</span>
                  <span className="text-gray-900 dark:text-white">0</span>
        </div>
        <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 dark:text-gray-300">Profile Completed</span>
                  <span className="text-purple-600 dark:text-purple-400 font-medium">100%</span>
        </div>
      </div>
    </div>
  </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Chat Assistant */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transition-colors duration-200">
              <div className="flex gap-2 p-4 bg-white dark:bg-gray-800 transition-colors duration-200">
                <button className="w-10 h-10 rounded-full bg-purple-100 dark:bg-gray-700 flex items-center justify-center transition-colors duration-200">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600 dark:text-purple-400">
                    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V21M12 3V8M7.05 19.5L9.5 16.4M14.5 7.6L16.95 4.5M4.5 7.05L7.6 9.5M16.4 14.5L19.5 16.95M4.5 16.95L7.6 14.5M16.4 9.5L19.5 7.05" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-purple-100 dark:bg-gray-700 flex items-center justify-center transition-colors duration-200">
                  <MessageSquare size={18} className="text-purple-600 dark:text-purple-400" />
                </button>
                <button className="w-10 h-10 rounded-full bg-purple-100 dark:bg-gray-700 flex items-center justify-center transition-colors duration-200">
                  <Settings size={18} className="text-purple-600 dark:text-purple-400" />
                </button>
              </div>
              <div className="p-4 relative min-h-[220px] bg-white dark:bg-gray-800 transition-colors duration-200">
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full overflow-hidden">
                  <img src="/api/placeholder/48/48" alt="Assistant" className="w-full h-full object-cover" />
                </div>
                <div className="max-w-[80%] bg-white dark:bg-gray-800 p-4 rounded-xl mb-2 transition-colors duration-200">
                  <p className="text-gray-900 dark:text-white">Hi there! I'm a virtual assistant. How can I help you today?</p>
                </div>
                <div className="text-right text-gray-600 dark:text-gray-300 text-xs">9:32</div>
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-200">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Write a message" 
                    className="w-full rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 dark:text-gray-300">
                      <path d="M21.44 11.05L12.25 2.54C12.17 2.46 12.08 2.4 11.97 2.36C11.86 2.33 11.75 2.32 11.64 2.33C11.53 2.34 11.42 2.38 11.33 2.44C11.23 2.5 11.15 2.58 11.09 2.68L2.59 16.76C2.52 16.88 2.5 17.02 2.5 17.17C2.51 17.31 2.56 17.45 2.64 17.56C2.72 17.68 2.82 17.77 2.95 17.83C3.07 17.89 3.21 17.91 3.34 17.89L9.73 16.96L12.46 21.26C12.52 21.36 12.61 21.44 12.71 21.5C12.81 21.56 12.92 21.59 13.04 21.59C13.16 21.6 13.28 21.57 13.39 21.52C13.5 21.47 13.59 21.39 13.66 21.29L21.43 11.89C21.5 11.8 21.56 11.7 21.59 11.58C21.62 11.47 21.62 11.35 21.59 11.24C21.56 11.12 21.51 11.01 21.43 10.92C21.35 10.83 21.25 10.76 21.14 10.71L21.44 11.05Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 dark:text-gray-300">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14M9 9H9.01M15 9H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 dark:text-gray-300">
                      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11 4C11 4 13 4 16 4C19 4 20 6 20 9C20 12 19 14 19 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 19C16 19 14 19 11 19C8 19 7 17 7 14C7 11 8 9 8 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 9C5 9 7 5 12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 14C20 14 18 18 13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Calendar */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden p-5">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">My activity</h3>
                <div className="flex">
                  <button className="w-7 h-7 rounded-full bg-purple-50 dark:bg-gray-700 flex items-center justify-center">
                    <Calendar size={16} />
                  </button>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">What is waiting for you today</p>
              
              <div className="flex justify-between text-gray-500 dark:text-gray-400 text-xs mb-4">
                <span>07:00</span>
                <span>08:00</span>
                <span>09:00</span>
                <span>10:00</span>
                <span>11:00</span>
                <span>12:00</span>
                <span>01:00</span>
                <span>02:00</span>
              </div>
              
              <div className="relative h-[180px]">
                {/* Time indicator */}
                <div className="absolute top-[44%] right-0 left-0 h-0.5 bg-gray-400"></div>
                
                {/* Events */}
                <div className="absolute left-0 top-[5%] w-[30%] bg-green-200 dark:bg-green-800 p-2 rounded-md">
                  <p className="font-medium text-sm">Project onboarding</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Google Meeting</p>
                  <div className="flex items-center mt-1">
                    <div className="w-5 h-5 rounded-full overflow-hidden">
                      <img src="/api/placeholder/20/20" alt="Person" className="w-full h-full object-cover" />
                    </div>
                    <span className="ml-1 text-xs bg-white dark:bg-gray-700 bg-opacity-50 dark:bg-opacity-50 px-1 rounded">+2</span>
                  </div>
                </div>
                
                <div className="absolute left-[45%] top-[40%] w-[30%] bg-gray-200 dark:bg-gray-700 p-2 rounded-md">
                  <p className="font-medium text-sm">Design research</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Figma file</p>
                  <div className="flex items-center mt-1">
                    <div className="w-5 h-5 rounded-full overflow-hidden">
                      <img src="/api/placeholder/20/20" alt="Person" className="w-full h-full object-cover" />
                    </div>
                    <span className="ml-1 text-xs bg-white dark:bg-gray-700 bg-opacity-50 dark:bg-opacity-50 px-1 rounded">+5</span>
                  </div>
                </div>
                
                <div className="absolute right-0 top-[75%] w-[25%] bg-purple-200 dark:bg-purple-800 p-2 rounded-md">
                  <p className="font-medium text-sm">Coffee break</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">CoCo Café</p>
                </div>
              </div>
            </div>

            {/* To-do List */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden p-5">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-semibold text-lg">To-do list</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Wednesday, 11 May</p>
                </div>
                <button className="w-7 h-7 rounded-full bg-purple-50 dark:bg-gray-700 flex items-center justify-center">
                  <ArrowUpRight size={16} />
                </button>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center mr-3 bg-green-400 text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1 line-through text-gray-400">Client Review & Feedback</div>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden">
                      <img src="/api/placeholder/32/32" alt="Person" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden">
                      <img src="/api/placeholder/32/32" alt="Person" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">Summary</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Track your performance</p>
                </div>
                <div className="flex gap-2">
                  <button className="w-7 h-7 rounded-full bg-purple-50 dark:bg-gray-700 flex items-center justify-center">
                    <Sliders size={16} />
                  </button>
                  <button className="w-7 h-7 rounded-full bg-purple-50 dark:bg-gray-700 flex items-center justify-center">
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
              
              <div className="mt-6 relative h-[130px]">
                <div className="absolute left-0 top-0 text-gray-500 dark:text-gray-400 text-xs">400</div>
                <div className="absolute left-0 top-[50%] text-gray-500 dark:text-gray-400 text-xs">300</div>
                <div className="absolute left-0 top-[100%] text-gray-500 dark:text-gray-400 text-xs">200</div>
                
                <div className="ml-8 h-full relative">
                  {/* Chart lines */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gray-200 dark:bg-gray-700"></div>
                  <div className="absolute top-[50%] left-0 right-0 h-px bg-gray-200 dark:bg-gray-700"></div>
                  <div className="absolute top-[100%] left-0 right-0 h-px bg-gray-200 dark:bg-gray-700"></div>
                  
                  {/* Chart */}
                  <svg width="100%" height="100%" viewBox="0 0 600 140" fill="none" preserveAspectRatio="none">
                    <path d="M0,120 C50,100 100,130 150,90 C200,50 250,70 300,60 C350,50 400,80 450,30 C500,50 550,90 600,20" stroke="#8b5cf6" strokeWidth="3" fill="none" />
                  </svg>
                  
                  {/* Data point with value */}
                  <div className="absolute right-[25%] top-[20%]">
                    <div className="w-6 h-6 rounded-full bg-gray-900 dark:bg-purple-600 text-white flex items-center justify-center text-xs">
                      202
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chat Bot from Image 1 */}
          <div className="mt-8 bg-white dark:bg-red-800 rounded-2xl shadow-md overflow-hidden p-5">
            <div className="flex justify-between mb-4">
              <div className="flex items-center">
                <img 
                  src="/api/placeholder/60/60" 
                  alt="Robot" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <button className="w-7 h-7 rounded-full bg-purple-50 dark:bg-gray-700 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 3H21M21 3V9M21 3L14 10M9 21H3M3 21V15M3 21L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center relative mb-8">
                <div className="absolute inset-0 rounded-full bg-purple-400 opacity-30 animate-pulse"></div>
                <span className="text-white text-2xl font-bold">g</span>
              </div>
              
              <h2 className="text-2xl font-semibold text-center mb-8">Hi, How can I help you today?</h2>
              
              <div className="relative w-full max-w-lg">
                <input 
                  type="text" 
                  placeholder="Type your question" 
                  className="w-full rounded-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 py-3 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Button */}
      <button className="fixed bottom-6 right-6 bg-gray-900 text-white px-5 py-3 rounded-full flex items-center gap-2 shadow-lg">
        <Plus size={18} />
        <span>Add task</span>
      </button>

      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          transform: translateX(100%);
          border-color: #7e3af2;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #7e3af2;
        }
        .toggle-checkbox {
          right: 0;
          transition: all 0.3s;
        }
        .toggle-label {
          transition: background-color 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default IntellectaDashboard;
