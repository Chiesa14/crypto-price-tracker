import React, { useEffect } from "react";

interface NotificationListProps {
  notifications: { message: string; timestamp: number }[];
  setNotification: React.Dispatch<
    React.SetStateAction<{ message: string; timestamp: number }[]>
  >;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  setNotification,
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      console.log(currentTime);
      
      setNotification((prevNotifications) =>
        prevNotifications.filter(
          (notif) => currentTime - notif.timestamp < 50000
        )
      );
    }, 25000);

    return () => clearInterval(interval);
  }, [setNotification]);

  return (
    <section className="flex-1 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Notifications
      </h2>
      <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
        <ul className="space-y-4">
          {notifications.map((notif, index) => {
            const bgColor = notif.message.includes("above")
              ? "bg-green-50"
              : notif.message.includes("below")
              ? "bg-red-50"
              : "bg-white";

            return (
              <li
                key={index}
                className={`${bgColor} text-gray-800 p-3 rounded-lg`}
              >
                {notif.message} "   "
                {notif.timestamp}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default NotificationList;
