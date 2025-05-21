// components/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ pages, currentPage, navigateToPage }) => {
  return (
    <div className="w-full px-8 py-4 relative">
      <h2 className="text-4xl py-3 text-center font-bold text-violet-700 mb-4">Your Profile</h2>
      <div className="flex justify-between items-center relative mt-10">
        <div className="absolute top-0 left-0 right-0 h-1 bg-violet-300 z-0"></div>
        <div
          className="absolute top-0 left-0 h-1 bg-violet-400 z-0"
          style={{ width: `${Math.min(100, (currentPage + 1) * (100 / pages.length))}%` }}
        ></div>
        <div className="w-full flex justify-between">
          {pages.map((page, index) => {
            const isActive = index <= currentPage;
            const isCurrent = index === currentPage;
            let icon;
            if (index === 0) icon = "👤";
            else if (index === 1) icon = "🏠";
            else if (index === 2) icon = "🎨";
            else if (index === 3) icon = "📚";
            else if (index === 4) icon = "📱";
            else if (index === 5) icon = "📝";
            return (
              <div key={index} className="flex flex-col items-center">
                <button
                  onClick={() => navigateToPage(index)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center relative z-10 -mt-5 ${
                    isCurrent ? 'bg-violet-400 text-white' : isActive ? 'bg-violet-400' : 'bg-violet-200'
                  }`}
                >
                  <span className="text-xl">{icon}</span>
                </button>
                <span className="text-xs font-medium text-violet-500 mt-2 whitespace-nowrap text-center">
                  {page}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;