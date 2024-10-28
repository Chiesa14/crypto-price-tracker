import React from "react";

interface NotificationListProps {
  notifications: { message: string }[];
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
}) => {
  return (
    <section className="flex-1  rounded-lg p-6 bg-[#1e1e1e]">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Notifications
      </h2>
      <div className="overflow-y-auto scroll-m-0" style={{ maxHeight: "300px" }}>
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
                className={`${bgColor} text-gray-800 px-3 py-4 rounded-lg`}
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
