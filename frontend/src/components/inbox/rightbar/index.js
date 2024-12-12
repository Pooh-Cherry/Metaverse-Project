import React, { useState } from "react";
import ChatPanel from "./chatpanel";
import UserInfo from "./userinfo";
import { MarkIcon, ExitIcon } from "@icons";

const RightBar = ({ selectedUser, onClose }) => {
  const [selectedTab, setSelectedTab] = useState(1);
  return (
    selectedUser && (
      <div className="h-[100%] w-full bg-[#EAEEF3] rounded-xl">
        <div className="w-full rounded-tr-xl rounded-tl-xl flex items-center justify-between px-[15px] h-[7%]">
          <UserHeadItem
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            onClose={onClose}
          />
        </div>
        <div className="w-full h-[93%] flex flex-col p-[15px]">
          {selectedTab === 1 ? (
            <UserInfo selectedUser={selectedUser} />
          ) : (
            <ChatPanel />
          )}
        </div>
      </div>
    )
  );
};

export default RightBar;

export const UserHeadItem = ({ selectedTab, setSelectedTab, onClose }) => {
  return (
    <div className="flex items-center justify-between w-full border-b border-[#D3D3D3]">
      <div className="flex gap-[5px] text-black font-bold">
        <div
          className={`p-[15px] cursor-pointer hover:border-[#0066FF] border-b-2 ${selectedTab === 1 && "border-[#0066FF] border-b-2"}`}
          onClick={() => setSelectedTab(1)}
        >
          Traking
        </div>
        <div
          className={`p-[15px] cursor-pointer hover:border-[#0066FF] border-b-2 ${selectedTab === 2 && "border-[#0066FF] border-b-2"}`}
          onClick={() => setSelectedTab(2)}
        >
          AI
        </div>
      </div>
      <div className="flex">
        <div
          className="transition-all rounded-lg flex items-center gap-2 cursor-pointer"
          onClick={onClose}
        >
          <ExitIcon color={true ? "black" : "#64748B"} />
        </div>
      </div>
    </div>
  );
};

export const UserAvatar = () => {
  return (
    <div>
      <div className="transition-all rounded-lg flex items-center gap-2">
        <MarkIcon />
      </div>
    </div>
  );
};
