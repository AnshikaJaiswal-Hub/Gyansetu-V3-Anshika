import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon } from 'lucide-react';

const EventsCard = ({ events }) => {
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
      custom={1}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-[#8b5cf6]" />
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
        </div>
        <button className="text-sm bg-[#8b5cf6] hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg transition-colors">
          Add Event
        </button>
      </div>
      <div className="space-y-3">
        {events.map((event, index) => (
          <motion.div 
            key={event.id} 
            className="flex items-start gap-3 p-3 bg-gray-50/70 hover:bg-purple-50/70 rounded-lg transition-colors duration-150"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <div className="bg-purple-100 rounded-lg p-2 text-center min-w-[4rem]">
              <p className="text-xs font-medium text-[#8b5cf6] mb-0.5">
                {event.date.split(',')[0]}
              </p>
              <p className="text-sm font-bold text-purple-800">
                {event.time.split(' ')[0]}
              </p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 mb-1">{event.title}</p>
              <p className="text-xs text-gray-500 mb-0.5">{event.location}</p>
              <p className="text-xs text-gray-500">{event.description}</p>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <button className="text-xs bg-purple-50 text-[#8b5cf6] px-3 py-1 rounded-lg hover:bg-purple-100 transition-colors font-medium">
                Details
              </button>
              <button className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors">
                RSVP
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EventsCard; 