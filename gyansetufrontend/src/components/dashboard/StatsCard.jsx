import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ item, index }) => {
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
      key={item.name} 
      className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-4"
      variants={cardVariants}
      custom={index}
    >
      <div className="flex items-start gap-4">
        <div className="rounded-lg p-2.5 bg-gray-100/80">
          <item.icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 mb-1">{item.name}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-semibold text-gray-900 truncate">{item.value}</p>
            <span className={`text-xs font-medium ${
              item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              {item.change}
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-500 truncate">{item.description}</p>
          {item.options && (
            <div className="mt-2 flex gap-3">
              {item.options.map((option, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-gray-600">{option.label}:</span>
                  <span className="text-xs font-semibold text-gray-900">{option.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard; 