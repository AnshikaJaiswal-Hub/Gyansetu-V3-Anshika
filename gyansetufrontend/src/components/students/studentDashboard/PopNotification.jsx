import React, { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";

const PopNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  // Simulated default + backend notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      // Simulated fetch (replace with actual API call)
      const data = [
        {
          id: 1,
          title: "Welcome to Gyansetu",
          message: "You've successfully completed your onboarding!",
          time: "Today",
          avatar:
            "https://cdn-icons-png.flaticon.com/512/2202/2202112.png", // Default avatar
        },
        {
          id: 2,
          title: "Course Enrolled",
          message: "You’ve enrolled in the React Basics course.",
          time: "2 hours ago",
          avatar:
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // Another avatar
        },
      ];

      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="absolute right-4 top-16 bg-white shadow-xl rounded-lg w-80 z-50">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold text-lg">Notifications</h3>
        <MoreVertical className="w-5 h-5 text-gray-500 cursor-pointer" />
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No notifications</div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className="flex items-start gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b"
            >
              <img
                src={notif.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-grow">
                <h4 className="font-medium text-sm">{notif.title}</h4>
                <p className="text-sm text-gray-600 truncate">{notif.message}</p>
                <span className="text-xs text-gray-400">{notif.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PopNotifications;
