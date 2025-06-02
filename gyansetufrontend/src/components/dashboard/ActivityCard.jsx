import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';

const ActivityCard = ({ activities }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.4 }
    })
  };

  return (
    <motion.div 
      className="bg-white/70 backdrop-blur-lg rounded-xl shadow-md p-5"
      variants={cardVariants}
      custom={0}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-[#8b5cf6]" />
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <button className="text-sm text-[#8b5cf6] hover:text-purple-700 font-medium">
          View All
        </button>
      </div>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div 
            key={activity.id} 
            className="flex items-start gap-3 p-3 hover:bg-gray-50/70 rounded-lg transition-colors duration-150"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <div className="bg-purple-100 rounded-lg p-2 flex-shrink-0">
              <activity.icon className="h-4 w-4 text-[#8b5cf6]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 mb-0.5">{activity.title}</p>
              <p className="text-xs text-gray-500 mb-1">{activity.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">{activity.timestamp}</p>
                <button className="text-xs text-[#8b5cf6] hover:text-purple-700 font-medium">
                  {activity.action}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ActivityCard; 