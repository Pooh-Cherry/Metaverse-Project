import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import clsx from "clsx";
import {
  MarkIcon,
  DashboardIcon,
  IntegrationIcon,
  EmailIcon,
  ReportIcon,
  BellIcon,
  HelpIcon,
  ExpandIcon,
  InboxIcon,
} from "@icons";
import UserDropdownMenu from "./UserDropdownMenu";
import { useExpand } from "@contexts/ExpandContext";

const Sidebar = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const [select, setSelect] = useState(1);
  const { expand, setExpand } = useExpand(); // Retrieve expand state and setter
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") setSelect(1);
    else if (location.pathname === "/emails") setSelect(2);
    else if (location.pathname === "/embeddings") setSelect(3);
    else if (location.pathname === "/flow") setSelect(4);
    else if (location.pathname === "/chat") setSelect(5);
  }, [location]);

  return (
    user.isAuthenticated && (
      <div
        className={`z-30 h-screen min-h-screen max-h-screen transition-all ${
          expand ? "min-w-60" : "w-fit max-w-15"
        }`}
      >
        <div className="h-full flex flex-col justify-between p-[7px] text-white text-[17px] font-semibold">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`flex items-center gap-2 ${expand ? "w-full flex-row justify-between" : "flex-col"}`}
            >
              <div className="transition-all rounded-lg flex items-center gap-2">
                <MarkIcon />
                {expand && <p>WebBox</p>}
              </div>
              <div
                className={clsx(
                  "cursor-pointer p-2.5 transition-all rounded-lg bg-[#2F2F2F] hover:bg-[#434343] gap-2",
                  {
                    "bg-[#434343] border-1 border-[#242222]": select === 3,
                    "justify-center": expand === false,
                  },
                )}
                onClick={() => setExpand((expand) => !expand)}
                data-tooltip-id="expandTooltip"
                data-tooltip-content="Expand"
              >
                <ExpandIcon width={20} />
                {!expand && (
                  <Tooltip
                    style={{
                      marginRight: "8px",
                      marginLeft: "8px",
                      fontWeight: "200",
                    }}
                    id="expandTooltip"
                    place="right"
                    effect="solid"
                  />
                )}
              </div>
            </div>
            <div
              className={clsx(
                "cursor-pointer p-2.5 transition-all rounded-lg hover:bg-[#434343] flex items-center gap-5 w-full ",
                {
                  "bg-[#434343] border-1 border-[#242222]": select === 1,
                  "justify-center": expand === false,
                },
              )}
              onClick={() => {
                navigate("/");
                setSelect(1);
              }}
              data-tooltip-id="dashboardTooltip"
              data-tooltip-content="Dashboard"
            >
              <DashboardIcon />
              {expand ? (
                <p>Dashboard</p>
              ) : (
                <Tooltip
                  style={{
                    marginRight: "8px",
                    marginLeft: "8px",
                    fontWeight: "200",
                  }}
                  id="dashboardTooltip"
                  place="right"
                  effect="solid"
                />
              )}
            </div>
            <div
              className={clsx(
                "cursor-pointer p-2.5 transition-all rounded-lg hover:bg-[#434343] flex items-center gap-5 w-full ",
                {
                  "bg-[#434343] border-1 border-[#242222]": select === 2,
                  "justify-center": expand === false,
                },
              )}
              onClick={() => {
                navigate("/emails");
                setSelect(2);
              }}
              data-tooltip-id="emailTooltip"
              data-tooltip-content="E-Mail"
            >
              <EmailIcon color={"white"} />
              {expand ? (
                <p>E-Mail</p>
              ) : (
                <Tooltip
                  style={{
                    marginRight: "8px",
                    marginLeft: "8px",
                    fontWeight: "200",
                  }}
                  id="emailTooltip"
                  place="right"
                  effect="solid"
                />
              )}
            </div>
            <div
              className={clsx(
                "cursor-pointer p-2.5 transition-all rounded-lg hover:bg-[#434343] flex items-center gap-5 w-full ",
                {
                  "bg-[#434343] border-1 border-[#242222]": select === 3,
                  "justify-center": expand === false,
                },
              )}
              onClick={() => {
                navigate("/embeddings");
                setSelect(3);
              }}
              data-tooltip-id="reportTooltip"
              data-tooltip-content="Reports"
            >
              <ReportIcon />
              {expand ? (
                <p>Reports</p>
              ) : (
                <Tooltip
                  style={{
                    marginRight: "8px",
                    marginLeft: "8px",
                    fontWeight: "200",
                  }}
                  id="reportTooltip"
                  place="right"
                  effect="solid"
                />
              )}
            </div>
            <div
              className={clsx(
                "cursor-pointer p-2.5 transition-all rounded-lg hover:bg-[#434343] flex items-center gap-5 w-full",
                {
                  "bg-[#434343] border-1 border-[#242222]": select === 4,
                  "justify-center": expand === false,
                },
              )}
              onClick={() => {
                navigate("/flow");
                setSelect(4);
              }}
              data-tooltip-id="intergrationTooltip"
              data-tooltip-content="Integrations"
            >
              <IntegrationIcon />
              {expand ? (
                <p>Integrations</p>
              ) : (
                <Tooltip
                  style={{
                    marginRight: "8px",
                    marginLeft: "8px",
                    fontWeight: "200",
                  }}
                  id="intergrationTooltip"
                  place="right"
                  effect="solid"
                />
              )}
            </div>
            <div
              className={clsx(
                "cursor-pointer p-2.5 transition-all rounded-lg hover:bg-[#434343] flex items-center gap-5 w-full ",
                {
                  "bg-[#434343] border-1 border-[#242222]": select === 5,
                  "justify-center": expand === false,
                },
              )}
              onClick={() => {
                navigate("/chat");
                setSelect(5);
              }}
              data-tooltip-id="inboxTooltip"
              data-tooltip-content="Inbox"
            >
              <InboxIcon />
              {expand ? (
                <p>Inbox</p>
              ) : (
                <Tooltip
                  style={{
                    marginRight: "8px",
                    marginLeft: "8px",
                    fontWeight: "200",
                  }}
                  id="inboxTooltip"
                  place="right"
                  effect="solid"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className={clsx(
                "cursor-pointer p-2.5 transition-all rounded-lg hover:bg-[#434343] flex items-center gap-5 w-full ",
                {
                  "bg-[#434343] border-1 border-[#242222]": select === 3,
                  "justify-center": expand === false,
                },
              )}
              onClick={() => {
                navigate("/embeddings");
                setSelect(3);
              }}
              data-tooltip-id="helpTooltip"
              data-tooltip-content="Help"
            >
              <HelpIcon />
              {expand ? (
                <p>Help</p>
              ) : (
                <Tooltip
                  style={{
                    marginRight: "8px",
                    marginLeft: "8px",
                    fontWeight: "200",
                  }}
                  id="helpTooltip"
                  place="right"
                  effect="solid"
                />
              )}
            </div>
            <div
              className={clsx(
                "cursor-pointer p-2.5 transition-all rounded-lg hover:bg-[#434343] flex items-center gap-5 w-full ",
                {
                  "bg-[#434343] border-1 border-[#242222]": select === 3,
                  "justify-center": expand === false,
                },
              )}
              onClick={() => {
                navigate("/embeddings");
                setSelect(3);
              }}
              data-tooltip-id="notificationTooltip"
              data-tooltip-content="Notifications"
            >
              <BellIcon />
              {expand ? (
                <p>Notifications</p>
              ) : (
                <Tooltip
                  style={{
                    marginRight: "8px",
                    marginLeft: "8px",
                    fontWeight: "200",
                  }}
                  id="notificationTooltip"
                  place="right"
                  effect="solid"
                />
              )}
            </div>
            <div
              className={clsx(
                "cursor-pointer transition-all rounded-lg hover:bg-[#2B292940] flex items-center gap-2 w-full",
                {
                  "bg-[#2B2929] border-2 border-[#242222]": false,
                  "justify-center": expand === false,
                },
              )}
            >
              <UserDropdownMenu user={user} />
              {expand && <p>{user.name}</p>}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Sidebar;
