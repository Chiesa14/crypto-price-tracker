import React from "react";

interface NotificationListProps {
  notifications: { message: string }[];
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
}) => {
  return (
    <section>
      <section className="flex-1  rounded-lg p-6 bg-[#1e1a21]">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Notifications
        </h2>
        <div
          className="overflow-y-auto scroll-m-0"
          style={{ maxHeight: "300px" }}
        >
          <ul className="space-y-4">
            {notifications.map((notif, index) => {
              // const bgColor = notif.message.includes("above")
              //   ? "hover:bg-green-500"
              //   : notif.message.includes("below")
              //   ? "hover:bg-red-500"
              //   : "hover:bg-white";

              return (
                <li
                  key={index}
                  className={`bg-[#1e1e1e]  text-white px-3 py-4 rounded-lg border border-white border-opacity-10 transition-all duration-500`}
                >
                  {notif.message}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </section>
  );
};

export default NotificationList;
