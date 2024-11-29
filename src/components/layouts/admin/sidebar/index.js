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
  EmailsIcon,
  ReportIcon,
} from "@icons";
import UserDropdownMenu from "./UserDropdownMenu";

const Sidebar = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const [select, setSelect] = useState(1);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") setSelect(1);
    else if (location.pathname === "/flows") setSelect(2);
    else if (location.pathname === "/emails") setSelect(4);
    else if (location.pathname === "/embeddings") setSelect(5);
  }, [location]);

  return (
    user.isAuthenticated && (
      <div className="sm:left-0 z-30 h-screen min-h-screen max-h-screen transition-all max-w-14">
        <div className="h-full max-h-[1024px] flex flex-col justify-between p-2">
          <div className="flex flex-col items-center gap-2">
            <div className="transition-all rounded-lg ">
              <MarkIcon />
            </div>
            <div
              className={clsx(
                "cursor-pointer p-2.5 transition-all rounded-lg hover:bg-[#434343] gap-2  ",
                {
                  "bg-[#434343] border-1 border-[#242222]": select === 1,
                },
              )}
              onClick={() => {
                navigate("/");
                setSelect(1);
              }}
              data-tooltip-id="dashboardTooltip"
              data-tooltip-content="Dashboard"
            >
              <DashboardIcon color={true ? "white" : "#64748B"} />
              <Tooltip
                style={{
                  marginRight: "8px",
                  marginLeft: "8px",
                }}
                id="dashboardTooltip"
                place="right"
                effect="solid"
              />
            </div>
            <div
              className={clsx(
                "cursor-pointer p-2.5 transition-all rounded-lg hover:bg-[#434343]",
                {
                  "bg-[#434343] border-1 border-[#242222]": select === 2,
                },
              )}
              onClick={() => {
                navigate("/flow");
                setSelect(2);
              }}
              data-tooltip-id="intergrationTooltip"
              data-tooltip-content="Integrations"
            >
              <IntegrationIcon color={true ? "white" : "#64748B"} />
              <Tooltip
                style={{
                  marginRight: "8px",
                  marginLeft: "8px",
                }}
                id="intergrationTooltip"
                place="right"
                effect="solid"
              />
            </div>
            {/* <div
                className={clsx(
                  'cursor-pointer p-2.5 transition-all rounded-lg hover:bg-[#2B292940]',
                  {
                    'bg-[#2B2929] border-1 border-[#242222]': select === 3
                  }
                )} onClick={() => {
                  navigate('/chat');
                  setSelect(3);
                }}
              >
                <MessagesIcon color={false ? 'white' : '#64748B'} />
              </div> */}
            <div
              className={clsx(
                "cursor-pointer p-2.5 transition-all rounded-lg hover:bg-[#434343]",
                {
                  "bg-[#434343] border-1 border-[#242222]": select === 4,
                },
              )}
              onClick={() => {
                navigate("/emails");
                setSelect(4);
              }}
              data-tooltip-id="emailTooltip"
              data-tooltip-content="E-Mail"
            >
              <EmailsIcon color={true ? "white" : "#64748B"} />
              <Tooltip
                style={{
                  marginRight: "8px",
                  marginLeft: "8px",
                }}
                id="emailTooltip"
                place="right"
                effect="solid"
              />
            </div>
            <div
              className={clsx(
                "cursor-pointer p-2.5 transition-all rounded-lg hover:bg-[#434343]",
                {
                  "bg-[#434343] border-1 border-[#242222]": select === 5,
                },
              )}
              onClick={() => {
                navigate("/embeddings");
                setSelect(5);
              }}
              data-tooltip-id="reportTooltip"
              data-tooltip-content="Reports"
            >
              <ReportIcon color={true ? "white" : "#64748B"} />
              <Tooltip
                style={{
                  marginRight: "8px",
                  marginLeft: "8px",
                }}
                id="reportTooltip"
                place="right"
                effect="solid"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div
              className={clsx(
                "cursor-pointer p-2.5 transition-all rounded-lg hover:bg-[#2B292940]",
                {
                  "bg-[#2B2929] border-2 border-[#242222]": false,
                },
              )}
            >
              <UserDropdownMenu user={user} />
            </div>
          </div>
        </div>
        {/* <div className="absolute top-1/2 right-[-15px] cursor-pointer">
            <OpenSidebarIcon />
          </div> */}
      </div>
    )
  );
};

export default Sidebar;
