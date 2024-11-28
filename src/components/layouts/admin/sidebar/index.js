import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ListIcon } from "@icons/sidebar";
import clsx from "clsx";
import {
  MarkIcon,
  DashboardIcon,
  PartIcon,
  MessagesIcon,
  SupportIcon,
  OpenSidebarIcon,
  EmailsIcon,
} from "@icons";

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
  });

  return (
    user.isAuthenticated && (
      <div className="fixed top-0 left-[-74px] sm:left-0 z-30 w-[74px] h-screen min-h-screen max-h-screen border border-[#E2E8F0] bg-white transition-all">
        <div className="h-full max-h-[1024px] flex flex-col justify-between relative">
          <div>
            <div className="pt-7 pb-10 flex justify-center">
              <div className="cursor-pointer">
                <MarkIcon />
              </div>
            </div>
            <div className="pt-5 flex flex-col items-center gap-4">
              <div
                className={clsx(
                  "cursor-pointer p-3 transition-all rounded-lg hover:bg-[#2B292940]",
                  {
                    "bg-[#2B2929] border-2 border-[#242222]": select === 1,
                  },
                )}
                onClick={() => {
                  navigate("/");
                  setSelect(1);
                }}
              >
                <DashboardIcon color={false ? "white" : "#64748B"} />
              </div>
              <div
                className={clsx(
                  "cursor-pointer p-3 transition-all rounded-lg hover:bg-[#2B292940]",
                  {
                    "bg-[#2B2929] border-2 border-[#242222]": select === 2,
                  },
                )}
                onClick={() => {
                  navigate("/flow");
                  setSelect(2);
                }}
              >
                <PartIcon color={false ? "white" : "#64748B"} />
              </div>
              {/* <div
                className={clsx(
                  'cursor-pointer p-3 transition-all rounded-lg hover:bg-[#2B292940]',
                  {
                    'bg-[#2B2929] border-2 border-[#242222]': select === 3
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
                  "cursor-pointer p-3 transition-all rounded-lg hover:bg-[#2B292940]",
                  {
                    "bg-[#2B2929] border-2 border-[#242222]": select === 4,
                  },
                )}
                onClick={() => {
                  navigate("/emails");
                  setSelect(4);
                }}
              >
                <EmailsIcon color={false ? "white" : "#64748B"} />
              </div>
              <div
                className={clsx(
                  "cursor-pointer p-3 transition-all rounded-lg hover:bg-[#2B292940]",
                  {
                    "bg-[#2B2929] border-2 border-[#242222]": select === 5,
                  },
                )}
                onClick={() => {
                  navigate("/embeddings");
                  setSelect(5);
                }}
              >
                <ListIcon color={false ? "white" : "#64748B"} />
              </div>
            </div>
          </div>
          <div className="flex justify-center pb-10">
            <div
              className={clsx(
                "cursor-pointer p-3 transition-all rounded-lg hover:bg-[#2B292940]",
                {
                  "bg-[#2B2929] border-2 border-[#242222]": false,
                },
              )}
            >
              <SupportIcon color={false ? "white" : "#64748B"} />
            </div>
          </div>
          <div className="absolute top-1/2 right-[-15px] cursor-pointer">
            <OpenSidebarIcon />
          </div>
        </div>
      </div>
    )
  );
};

export default Sidebar;
