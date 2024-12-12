import React, { useEffect, useState } from "react";
import { InstagramIcon, MessengerIcon, WhatsappIcon, EmailIcon } from "@icons";
import { DropdownArrowIcon, StateLightIcon } from "@icons/other";
import clsx from "clsx";
import SocialChannel from "../../socialchannel";
import MapViwer from "../MapViwer";

const UserInfo = ({ selectedUser }) => {
  const [fetchUserInfo, setFetchUserInfo] = useState({});
  const [showVisitPagesDropdown, setShowVisitPagesDropdown] = useState(true);
  const [showAdditionalInfoDropdown, setShowAdditionalInfoDropdown] =
    useState(true);
  const [showTechnologyDropdown, setShowTechnologyDropdown] = useState(true);
  const [showSocialDropdown, setShowSocialDropdown] = useState(true);

  const renderSocialIcon = (type) => {
    if (!type) return null; // Check if type is undefined or null

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

  function formatLastUpdatedDate(updatedAt, type = false) {
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
      return type
        ? "Today"
        : date.toLocaleTimeString([], {
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

  const getTimeDurationFromSeconds = (seconds) => {
    const [hours, minutes, secs] = [
      Math.floor(seconds / 3600),
      Math.floor((seconds % 3600) / 60),
      seconds % 60,
    ];

    if (hours === 0 && minutes === 0) {
      return `${secs}s`;
    } else if (hours === 0) {
      return `${minutes}m ${secs}s`;
    }

    return `${hours}h ${minutes}m ${secs}s`;
  };

  useEffect(() => {
    setFetchUserInfo({
      name: selectedUser.name,
      contact_info: selectedUser.contact_info,
      avartar_url: selectedUser.avartar_url,
      ip_addr: "77.247.126.189",
      technology: {
        os_type: "windows",
        os_version: "11",
        browser_type: "firefox",
        browser_version: "133.0",
      },
      visited_pages: [
        {
          name: "Bars&Lounges",
          duration: 102, //this is the amount of seconds.
          state: true,
        },
        {
          name: "About us",
          duration: 123123123,
          state: false,
        },
      ],
      chat_duration: 2389,
      re_visitors: {
        visit: 2,
        chat: 1,
      },
      connected_socials: ["Email", "Instagram", "Whatsapp", "Messenger"],
      updated_at: selectedUser.updated_at,
    });
  }, [selectedUser]);

  return (
    selectedUser && (
      <div className="h-full">
        <div className="h-full flex flex-col justify-between gap-1">
          <div className="flex gap-2.5">
            <img
              src={`/avatars/${fetchUserInfo.avartar_url}`}
              alt="user avatar"
              className="w-[65px] h-[65px] min-w-9 rounded-lg border border-[#ACACAC]"
            />
            <div className="flex flex-col justify-center gap-[5px]">
              <div className="flex items-center gap-2">
                <div className="text-base font-semibold leading-none">
                  {fetchUserInfo.name}
                </div>
                {renderSocialIcon(fetchUserInfo.social)}
              </div>
              <div className="text-[14px] font-semibold leading-none">
                {fetchUserInfo.contact_info}
              </div>
              <div className="flex items-center">
                <div className="text-[12px] font-normal leading-none">
                  {`Last Active ${formatLastUpdatedDate(fetchUserInfo.updated_at)}`}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex-1 min-w-0">
            <MapViwer ipAddress={fetchUserInfo.ip_addr} />
          </div>
          <div className="w-full">
            <div
              className={clsx(
                "flex justify-between",
                "bg-white px-[15px] py-[10px]",
                "rounded-tl-lg rounded-tr-lg",
                "border border-b-[#D3D3D3]",
                "text-base leading-none font-semibold",
                "cursor-pointer",
              )}
              onClick={() => setShowVisitPagesDropdown(!showVisitPagesDropdown)}
            >
              <div>Visited Pages</div>
              <div>
                <DropdownArrowIcon rotate={!showVisitPagesDropdown ? 0 : 180} />
              </div>
            </div>
            <div
              className={clsx(
                "transition-all duration-10 ease-in-out overflow-hidden", // Added transition classes
                {
                  "h-0": !showVisitPagesDropdown, // Collapsed state
                  "h-auto": showVisitPagesDropdown, // Expanded state
                },
              )}
              style={{ maxHeight: showVisitPagesDropdown ? "1000px" : "0" }} // To smoothly animate height
            >
              <div
                className={clsx(
                  "flex flex-col gap-[15px] p-[15px] bg-white",
                  "rounded-bl-lg rounded-br-lg border border-b-[#D3D3D3]",
                  "text-sm leading-none font-semibold",
                )}
              >
                {fetchUserInfo && fetchUserInfo.visited_pages ? (
                  fetchUserInfo.visited_pages.map((item, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <StateLightIcon
                        color={item.state === true ? "#0066FF" : "#67676C"}
                      />
                      <div className="flex flex-col gap-[2px]">
                        <div className="underline">{item.name}</div>
                        <div className="text-xs font-normal">
                          {getTimeDurationFromSeconds(item.duration)}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No visited pages available.</div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full">
            <div
              className={clsx(
                "flex justify-between",
                "bg-white px-[15px] py-[10px]",
                "rounded-tl-lg rounded-tr-lg",
                "border border-b-[#D3D3D3]",
                "text-base leading-none font-semibold",
                "cursor-pointer",
              )}
              onClick={() =>
                setShowAdditionalInfoDropdown(!showAdditionalInfoDropdown)
              }
            >
              <div>Additional Info</div>
              <div>
                <DropdownArrowIcon
                  rotate={!showAdditionalInfoDropdown ? 0 : 180}
                />
              </div>
            </div>
            <div
              className={clsx(
                "transition-all duration-10 ease-in-out overflow-hidden", // Added transition classes
                {
                  "h-0": !showAdditionalInfoDropdown, // Collapsed state
                  "h-auto": showAdditionalInfoDropdown, // Expanded state
                },
              )}
              style={{ maxHeight: showAdditionalInfoDropdown ? "1000px" : "0" }} // To smoothly animate height
            >
              <div
                className={clsx(
                  "flex flex-col gap-[15px] p-[15px] bg-white",
                  "rounded-bl-lg rounded-br-lg border border-b-[#D3D3D3]",
                  "text-sm leading-none font-semibold",
                )}
              >
                {fetchUserInfo.re_visitors ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                      <div className="text-sm font-normal">Chat duration:</div>
                      <div className="text-sm font-medium">
                        {getTimeDurationFromSeconds(
                          fetchUserInfo.chat_duration,
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <div className="text-sm font-normal">
                        Returning visitors:
                      </div>
                      <div className="text-sm font-medium">
                        {`${fetchUserInfo.re_visitors.visit || 0} visit${fetchUserInfo.re_visitors.visit > 1 ? "s" : ""}, ${fetchUserInfo.re_visitors.chat || 0} chat${fetchUserInfo.re_visitors.chat > 1 ? "s" : ""}`}{" "}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <div className="text-sm font-normal">Last seen:</div>
                      <div className="text-sm font-medium">
                        {formatLastUpdatedDate(fetchUserInfo.updated_at, true)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>No additional info pages available.</div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full">
            <div
              className={clsx(
                "flex justify-between",
                "bg-white px-[15px] py-[10px]",
                "rounded-tl-lg rounded-tr-lg",
                "border border-b-[#D3D3D3]",
                "text-base leading-none font-semibold",
                "cursor-pointer",
              )}
              onClick={() => setShowTechnologyDropdown(!showTechnologyDropdown)}
            >
              <div>Technology</div>
              <div>
                <DropdownArrowIcon rotate={!showTechnologyDropdown ? 0 : 180} />
              </div>
            </div>
            <div
              className={clsx(
                "transition-all duration-10 ease-in-out overflow-hidden", // Added transition classes
                {
                  "h-0": !showTechnologyDropdown, // Collapsed state
                  "h-auto": showTechnologyDropdown, // Expanded state
                },
              )}
              style={{ maxHeight: showTechnologyDropdown ? "1000px" : "0" }} // To smoothly animate height
            >
              <div
                className={clsx(
                  "flex flex-col gap-[15px] p-[15px] bg-white",
                  "rounded-bl-lg rounded-br-lg border border-b-[#D3D3D3]",
                  "text-sm leading-none font-semibold",
                )}
              >
                {fetchUserInfo.technology ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                      <div className="text-sm font-normal">IP address:</div>
                      <div className="text-sm font-medium">
                        {fetchUserInfo.ip_addr}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <div className="text-sm font-normal">OS/Device:</div>
                      <div className="text-sm font-medium">
                        {`${fetchUserInfo.technology.os_type.charAt(0).toUpperCase() + fetchUserInfo.technology.os_type.slice(1)} (${fetchUserInfo.technology.os_version})`}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <div className="text-sm font-normal">Broswer:</div>
                      <div className="text-sm font-medium">
                        {`${fetchUserInfo.technology.browser_type.charAt(0).toUpperCase() + fetchUserInfo.technology.browser_type.slice(1)} (${fetchUserInfo.technology.browser_version})`}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>No technology pages available.</div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full">
            <div
              className={clsx(
                "flex justify-between",
                "bg-white px-[15px] py-[10px]",
                "rounded-tl-lg rounded-tr-lg",
                "border border-b-[#D3D3D3]",
                "text-base leading-none font-semibold",
                "cursor-pointer",
              )}
              onClick={() => setShowSocialDropdown(!showSocialDropdown)}
            >
              <div>Technology</div>
              <div>
                <DropdownArrowIcon rotate={!showSocialDropdown ? 0 : 180} />
              </div>
            </div>
            <div
              className={clsx(
                "transition-all duration-10 ease-in-out overflow-hidden", // Added transition classes
                {
                  "h-0": !showSocialDropdown, // Collapsed state
                  "h-auto": showSocialDropdown, // Expanded state
                },
              )}
              style={{ maxHeight: showSocialDropdown ? "1000px" : "0" }} // To smoothly animate height
            >
              <div
                className={clsx(
                  "flex flex-col gap-[15px] p-[15px] bg-white",
                  "rounded-bl-lg rounded-br-lg border border-b-[#D3D3D3]",
                  "text-sm leading-none font-semibold",
                )}
              >
                {fetchUserInfo.connected_socials ? (
                  <div className="flex gap-2 flex-wrap">
                    {fetchUserInfo.connected_socials.map((social, index) => (
                      <div key={index} className="flex">
                        <SocialChannel
                          socialName={social}
                          width={45}
                          height={45}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>No connected apps pages available.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserInfo;
