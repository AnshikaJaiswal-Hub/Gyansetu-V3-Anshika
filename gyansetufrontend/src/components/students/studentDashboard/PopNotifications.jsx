import React, { useEffect, useRef } from 'react';
import { Bell, X } from 'lucide-react';

const PopNotifications = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: "New Assignment",
      message: "Math assignment due tomorrow",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      title: "Quiz Result",
      message: "You scored 95% in Physics Quiz",
      time: "5 hours ago",
      read: true
    },
    {
      id: 3,
      title: "Study Reminder",
      message: "Don't forget your Chemistry class at 2 PM",
      time: "1 day ago",
      read: false
    }
  ];

  return (
    <div ref={popupRef} className="absolute top-[110px] right-16 w-80 bg-white rounded-4xl shadow-2xl z-50">
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bell size={20} className="text-purple-600" />
          <h3 className="font-semibold">Notifications</h3>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
          <X size={18} />
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className={`p-4 hover:bg-gray-200 cursor-pointer transition-colors duration-200 ${
              !notification.read ? 'bg-purple-50' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-sm">{notification.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              </div>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </div>
            {!notification.read && (
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
            )}
          </div>
        ))}
      </div>
      
      <div className="p-3">
        <button className="w-full text-center text-sm text-purple-600 hover:text-purple-700">
          Mark all as read
        </button>
      </div>
    </div>
  );
};

export default PopNotifications; 