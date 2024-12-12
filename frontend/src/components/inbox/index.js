import React from "react";
import Slider from "react-slick";
import ChatPanel from "./chatpanel";
import {
  InstagramIcon,
  MessengerIcon,
  WhatsappIcon,
  EmailIcon,
  SearchIcon,
  TrashIcon,
} from "@icons";
import clsx from "clsx";
import { BackIcon } from "@icons/other";
import { useExpand } from "@contexts/ExpandContext";

const InboxMessages = ({
  selectedUser,
  messageHistory,
  setMessageHistory,
  setSelectedId,
}) => {
  const { expand } = useExpand();

  return (
    <div className="h-[100%] w-full">
      <div className="w-full h-[10%] bg-white flex items-center justify-between py-[10px] px-3 rounded-tr-xl overflow-hidden">
        <UserHeadItem
          selectedUser={selectedUser}
          messageHistory={messageHistory}
          setSelectedId={setSelectedId}
          expand={expand}
        />
      </div>
      <div className="w-full h-[90%] flex flex-col">
        <ChatPanel
          messageHistory={messageHistory}
          setMessageHistory={setMessageHistory}
        />
      </div>
    </div>
  );
};

export default InboxMessages;

export const UserHeadItem = ({
  selectedUser,
  messageHistory,
  setSelectedId,
  expand,
}) => {
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

  function formatDate(datetime) {
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
    const date = new Date(datetime);

    const hours24 = date.getHours();
    const hours12 = hours24 % 12 || 12; // Convert to 12-hour format, `0` becomes `12`
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours24 < 12 ? "AM" : "PM";

    const timeString = `${hours12}:${minutes} ${ampm}`;

    const day = String(date.getDate()).padStart(2, "0");
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();

    return `${timeString} ${day} ${month}, ${year}`;
  }

  const getOrdinalSuffix = (n) => {
    const j = n % 10,
      k = n % 100;
    if (j === 1 && k !== 11) {
      return `${n}st`;
    }
    if (j === 2 && k !== 12) {
      return `${n}nd`;
    }
    if (j === 3 && k !== 13) {
      return `${n}rd`;
    }
    return `${n}th`;
  };

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#EAEEF3",
          borderRadius: "20px",
        }}
        onClick={onClick}
      />
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#EAEEF3",
          borderRadius: "20px",
        }}
        onClick={onClick}
      />
    );
  };

  const messageHistorySettings = {
    infinite: false,
    dots: false,
    swipeToSlide: true,
    initialSlide: 0,
    slidesToShow: 8, // Default setting for large screens
    slidesToScroll: 1,
    variableWidth: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1920, // Tablets and small desktops
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          variableWidth: false,
        },
      },
      {
        breakpoint: 1440, // Tablets and small desktops
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: false,
        },
      },
      {
        breakpoint: 1024, // Mobile devices
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          variableWidth: false,
        },
      },
      {
        breakpoint: 768, // Mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
        },
      },
    ],
  };

  return (
    selectedUser && (
      <div className="flex items-center justify-between w-full gap-2">
        <div
          className="flex items-center justify-center cursor-pointer w-8 h-8 hover:bg-[#EAEEF3] rounded-[5px] flex lg:hidden"
          onClick={() => setSelectedId(null)}
        >
          <BackIcon />
        </div>
        <div className="flex gap-2.5">
          <img
            src={`/avatars/${selectedUser.avartar_url}`}
            alt="user avatar"
            className="w-[50px] h-[50px] min-w-9 rounded-lg"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <div className="text-base font-bold">{selectedUser.name}</div>
              {renderSocialIcon(selectedUser.social)}
            </div>
            <div className="flex items-center">
              <div className="text-[12px] font-normal">
                {`Last Active ${formatLastUpdatedDate(selectedUser.updated_at)}`}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-1 min-w-0 px-[25px]">
          <div className="w-full slider-container">
            <Slider {...messageHistorySettings}>
              {messageHistory.map((history, index) => (
                <div key={index} className="flex-shrink-0 w-full px-2 relative">
                  <hr className="absolute top-1/2 w-full border-[#eaeaf3]" />
                  <div
                    className={clsx(
                      "flex flex-col justify-center items-center",
                      "rounded-[3px]",
                      "bg-[#EAEEF3]",
                      "font-semibold text-sm",
                      "px-[10px] py-1",
                    )}
                  >
                    <div className="flex justify-center items-center">
                      {(() => {
                        if (history.in_out === "request") {
                          return "Request";
                        }
                        if (
                          history.in_out === "out" &&
                          history.label === "ai sent"
                        ) {
                          return "AI";
                        }
                        if (
                          history.in_out === "out" &&
                          history.label === "human sent"
                        ) {
                          return "Human";
                        }
                        if (history.in_out === "in") {
                          const nthEmail =
                            messageHistory
                              .filter((msg) => msg.in_out === "in")
                              .indexOf(history) + 1;
                          return getOrdinalSuffix(nthEmail);
                        }
                        return null; // Fallback in case no conditions are met
                      })()}
                    </div>
                    <div className="flex justify-center items-center">
                      {(() => {
                        if (history.in_out === "request") {
                          return "Sent";
                        }
                        if (history.in_out === "out") {
                          return "Responded";
                        }
                        if (history.in_out === "in") {
                          return "Email";
                        }
                        return null; // Fallback in case no conditions are met
                      })()}
                    </div>
                  </div>
                  <div className="flex flex-col text-xs font-normal flex justify-center items-center">
                    <div>
                      {
                        formatDate(history.datetime)
                          .split(/(\d{1,2}:\d{2} [APM]{2})\s(.+)/)
                          .slice(1)[0]
                      }
                    </div>
                    <div>
                      {
                        formatDate(history.datetime)
                          .split(/(\d{1,2}:\d{2} [APM]{2})\s(.+)/)
                          .slice(1)[1]
                      }
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-[45px] h-[45px] rounded-[5px] bg-[#E2E8F0] transition-all rounded-lg flex items-center justify-center gap-2.5 cursor-pointer">
            <SearchIcon
              width={20}
              height={20}
              color={true ? "black" : "#64748B"}
            />
          </div>
          <div className="w-[45px] h-[45px] rounded-[5px] bg-[#E2E8F0] transition-all rounded-lg flex items-center justify-center gap-2.5 cursor-pointer">
            <TrashIcon
              width={20}
              height={20}
              color={true ? "black" : "#64748B"}
            />
          </div>
        </div>
      </div>
    )
  );
};
