import React, { useState, useRef, useEffect } from 'react';
import { User, LayoutDashboard, KeyRound, LogOut, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const ProfilePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const studentName = "sadaf"; // You can replace this with dynamic data
  const navigate = useNavigate(); // Initialize the navigate function

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Lock body scroll when popup is open on mobile
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Adjust popup position or style based on window size if needed
      if (window.innerWidth >= 768 && isOpen) {
        // Reset any mobile-specific styles when returning to desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  // Handle navigation - Updated to use the navigate function
  const handleNavigation = (path) => {
    navigate(path); // Use the navigate function to change routes
    setIsOpen(false);
  };

  return (
    <div className="relative font-sans">
      {/* Profile Icon Button - Responsive sizing */}
      <button 
        className="flex items-center justify-center w-11 h-11 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-lime-200 border border-lime-600  transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open profile menu"
      >
        <img 
          src="/profile.png" 
          alt="Student" 
          className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-10 rounded-full object-cover"
        />
      </button>
      
      {/* Popup Menu - Different positioning based on screen size */}
      {isOpen && (
        <>
          {/* Mobile overlay - fullscreen on small devices */}
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" />
          
          <div 
            ref={popupRef}
            className={`
              bg-white rounded-2xl shadow-lg overflow-hidden z-50
              fixed md:absolute
              inset-x-0 bottom-0 md:bottom-auto
              md:right-0 md:left-auto
              md:top-12
              h-auto max-h-[85vh] md:max-h-none
              w-full md:w-64
              transition-all duration-300 ease-in-out
            `}
          >
            {/* Close button - only visible on mobile */}
            <button 
              className="md:hidden absolute top-3 right-3 p-1 rounded-full bg-gray-100" 
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} className="text-gray-600" />
            </button>
            
            {/* Header with profile image */}
            <div className="flex flex-col items-center justify-center py-8 md:py-6 px-4 bg-violet-100 rounded-2xl shadow-2xl">
              <div className="w-20 h-20 md:w-16 md:h-16 rounded-full bg-lime-300 border-2 border-lime-500 flex items-center justify-center mb-3 md:mb-2">
                <img 
                  src="/profile.png" 
                  alt="Student Profile" 
                  className="w-19 h-19 md:w-16 md:h-17 rounded-full object-cover"
                />
              </div>
            
            
            {/* Navigation Menu - Bigger touch targets on mobile */}
          
              {/* Profile */}
              <button 
                className="flex items-center px-6 md:px-4 py-4 md:py-3 w-full hover:bg-gray-200 rounded-2xl transition-colors text-left"
                onClick={() => handleNavigation('/profile')}
              >
                <User className="text-black mr-4 md:mr-3" size={24} />
                <span className="text-black text-lg md:text-base">Profile</span>
              </button>
              
              {/* Dashboard */}
              <button 
                className="flex items-center px-6 md:px-4 py-4 md:py-3 w-full hover:bg-gray-200 rounded-2xl transition-colors text-left"
                onClick={() => handleNavigation('/dashboard')}
              >
                <LayoutDashboard className="text-black mr-4 md:mr-3" size={24} />
                <span className="text-black text-lg md:text-base">Dashboard</span>
              </button>
              
              {/* Change Password */}
              <button 
                className="flex items-center px-6 md:px-4 py-4 md:py-3 w-full hover:bg-gray-200 rounded-2xl transition-colors text-left"
                onClick={() => handleNavigation('/change-password')}
              >
                <KeyRound className="text-black mr-4 md:mr-3" size={24} />
                <span className="text-black text-lg md:text-base">Change Password</span>
              </button>
              
              {/* Logout */}
              <button 
                className="flex items-center px-6 md:px-4 py-4 md:py-3 w-full hover:bg-gray-200 rounded-2xl transition-colors text-left"
                onClick={() => handleNavigation('/logout')}
              >
                <LogOut className="text-black mr-4 md:mr-3" size={24} />
                <span className="text-black text-lg md:text-base">Logout</span>
              </button>
           
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePopup;