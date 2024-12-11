import React from "react";
import InboxLabel from "../label/label";
import { InstagramIcon, MessengerIcon, WhatsappIcon, EmailIcon } from "@icons";

const User = ({ user, setSelectedId, selectedId }) => {
  const renderSocialIcon = (type) => {
    switch (type.toLowerCase()) {
      case "email":
        return <EmailIcon width={"16px"} height={"16px"} />;
      case "whatsapp":
        return <WhatsappIcon width={"16px"} height={"16px"} />;
      case "instagram":
        return <InstagramIcon width={"16px"} height={"16px"} />;
      case "messenger":
        return <MessengerIcon width={"16px"} height={"16px"} />;
      default:
        return null;
    }
  };

  function formatLastUpdatedDate(updatedAt) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(updatedAt);
    const today = new Date();
    const dayDifference = Math.floor((today - date) / (1000 * 60 * 60 * 24));

    if (dayDifference === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (dayDifference < 7 && today.getDay() >= date.getDay()) {
      return daysOfWeek[date.getDay()];
    } else {
      const day = String(date.getDate()).padStart(2, "0");
      const month = monthsOfYear[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month}, ${year}`;
    }
  }

  const handleSelectUser = () => {
    setSelectedId(user.id);
  };

  return (
    <div
      className={`flex w-full items-center justify-between flex-wrap text-lg font-semibold p-[5px] rounded-[5px] cursor-pointer ${
        selectedId === user.id ? "bg-[#E2E8F0]" : "hover:bg-[#E2E8F0]"
      }`}
      onClick={handleSelectUser}
    >
      <div className="flex justify-between w-full flex-wrap">
        <div className="flex justify-center items-center gap-2.5">
          <img
            src={`/avatars/${user.avartar_url}`}
            alt="user avatar"
            className="w-[50px] h-[50px] min-w-9 rounded-lg"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <div className="text-base font-bold">{user.name}</div>
              {user.cnt_new_msg !== 0 && (
                <div>
                  <InboxLabel
                    content={user.cnt_new_msg > 99 ? "99+" : user.cnt_new_msg}
                  />
                </div>
              )}
            </div>
            <div className="flex gap-2.5 items-center">
              <div className="text-sm font-normal">{user.last_message}</div>
              <div>
                {user.label.toLowerCase() === "ai sent" ? (
                  <InboxLabel content="AI Sent" />
                ) : user.label.toLowerCase() === "human sent" ? (
                  <InboxLabel backgroundColor="#EC7E11" content="Human Sent" />
                ) : user.label.toLowerCase() === "replied" ? (
                  <InboxLabel backgroundColor="#20AE36" content="Replied" />
                ) : user.label.toLowerCase() === "scheduled" ? (
                  <InboxLabel backgroundColor="#43435A" content="Scheduled" />
                ) : user.label.toLowerCase() === "sold" ? (
                  <InboxLabel backgroundColor="#9747FF" content="Sold" />
                ) : (
                  <InboxLabel backgroundColor="#F43033" content="Cancelled" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <div className="text-[12px] font-normal flex justify-end">
            {formatLastUpdatedDate(user.updated_at)}
          </div>
          <div className="flex justify-end">
            {renderSocialIcon(user.social)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
