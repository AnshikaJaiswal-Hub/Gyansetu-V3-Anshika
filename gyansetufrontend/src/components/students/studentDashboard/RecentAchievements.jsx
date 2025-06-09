import React from 'react';
import { Flame, Crown, Users, Atom } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext'; // Import theme context

/**
 * RecentAchievements Component
 * 
 * Displays a 2x2 grid of achievement cards and stats information
 * 
 * @param {Object} props
 * @param {Array} props.achievements - Array of achievement objects
 * @param {Object} props.stats - Object containing stats information
 * @returns {JSX.Element}
 */
const RecentAchievements = ({ 
  achievements = [
    {
      id: 1,
      icon: 'flame',
      points: 100,
      title: 'Learning Streak',
      description: 'A month of consistent learning'
    },
    {
      id: 2,
      icon: 'crown',
      points: 500,
      title: 'Math Champion',
      description: 'Top scorer in Advanced Algebra'
    },
    {
      id: 3,
      icon: 'users',
      points: 250,
      title: 'Team Leader',
      description: 'Helped 10 peers this month'
    },
    {
      id: 4,
      icon: 'atom',
      points: 300,
      title: 'Science Whiz',
      description: 'Perfect score in Physics Quiz'
    }
  ],
  stats = {
    quizzesCompleted: 14,
    hoursSpent: 6
  }
}) => {
  // Use theme context
  const { darkMode } = useTheme();

  // Map icon names to Lucide React components
  const iconComponents = {
    flame: Flame,
    crown: Crown,
    users: Users,
    atom: Atom
  };

  return (
    <div className="max-w-3xl">
      {/* Recent Achievements Section */}
      <div className={`${darkMode ? 'bg-[#341b47]' : 'bg-gray-200'} rounded-2xl p-4 mb-8 transition-colors duration-300`}>
        <div className="grid grid-cols-2 gap-6 mt-5 mb-1 mx-1">
          {achievements.map((achievement) => {
            const IconComponent = iconComponents[achievement.icon];
            
            return ( 
              <div 
                key={achievement.id} 
                className={`${darkMode ? 'bg-[#231130] hover:bg-[#2a1a3d]' : 'bg-white'} rounded-xl p-4 relative transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:z-10 group`}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={`${darkMode ? 'bg-[#4a2f52] group-hover:bg-purple-600' : 'bg-gray-900 group-hover:bg-purple-500'} p-3 rounded-full transition-colors duration-300`}>
                    {IconComponent && <IconComponent className="text-white transition-colors duration-300 group-hover:text-violet-100" size={24} />}
                  </div>
                  <div className={`${darkMode ? 'bg-[#4a2f52] text-violet-200 group-hover:bg-violet-600 group-hover:text-white' : 'bg-gray-100 text-gray-800 group-hover:bg-violet-100 group-hover:text-violet-700'} px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300`}>
                    +{achievement.points} pts
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${darkMode ? 'text-violet-200 group-hover:text-violet-100' : 'group-hover:text-violet-700'}`}>{achievement.title}</h3>
                <p className={`${darkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-800'} transition-colors duration-300`}>{achievement.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Stats Section */}
    </div>
  );
};

export default RecentAchievements;