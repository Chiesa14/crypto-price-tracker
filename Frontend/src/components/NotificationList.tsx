import React from "react";

interface NotificationListProps {
  notifications: { message: string }[];
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
}) => {
  return (
    <section className="flex-1 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Notifications
      </h2>
      <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
        <ul className="space-y-4">
        {notifications.map((notif, index) => {
            // Conditional background color
            const bgColor =
              notif.message.includes("above")
                ? "bg-green-50"
                : notif.message.includes("below")
                ? "bg-red-50"
                : "bg-white";

            return (
              <li
                key={index}
                className={`${bgColor} text-gray-800 p-3 rounded-lg`}
              >
                {notif.message}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default NotificationList;
